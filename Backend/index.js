const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // Change this to your front-end URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://reziqvins:Rez1qdarusman@wkj.esjs1kv.mongodb.net/?retryWrites=true&w=majority&appName=Wkj', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Koneksi ke database MongoDB berhasil');
    })
    .catch((error) => {
        console.error('Koneksi ke database MongoDB gagal:', error.message);
    });

// Order Schema
const orderSchema = new mongoose.Schema({
    transaction_details: {
        Order_id: { type: String },
        gross_amount: { type: Number },
        payment_status: { type: String },
        order_Status: { type: String },
        shipping_method: { type: String },
        resi: { type: String }
    },
    item_details: [
        {
            id: { type: String },
            img: { type: String },
            isCheck: { type: Number },
            totalAmount: { type: Number },
            price: { type: Number },
            quantity: { type: Number },
            name: { type: String }
        }
    ],
    customer_details: {
        name: { type: String },
        email: { type: String },
        alamat: { type: String },
        imgCheck: { type: String }
    }
});

const Order = mongoose.model('Order', orderSchema);

// Create an order
app.post('/orders', async (req, res) => {
    const order = new Order({
        transaction_details: req.body.transaction_details,
        item_details: req.body.item_details,
        customer_details: req.body.customer_details
    });
    try {
        try {
            const requestPaymentToken = await axios({
                // Below is the API URL endpoint
                url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        "Basic " +
                        Buffer.from(`SB-Mid-server-PUUdoGz-9cLzYr1JcTc_qZS-`).toString("base64"),
                    // Above is API server key for the Midtrans account, encoded to base64
                },
                data: req.body,
            });

            if (requestPaymentToken) {
                if (requestPaymentToken.status ===  201) {
                    await order.save()
                }
                return res.status(200).json({
                    status: "ok",
                    token: requestPaymentToken.data.token,
                });
            }
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.response,
            });
            console.log(error.response);
        }
        // res.status(201).json({
        //     message: 'Order berhasil dibuat',
        //     data: savedOrder
        // });
    } catch (error) {
        res.status(400).json({
            message: 'Gagal membuat order',
            error: error.message
        });
    }
});



// Read all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({
            message: 'Berhasil mengambil semua order',
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil semua order',
            error: error.message
        });
    }
});

// Read a single order by ID
app.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: 'Order tidak ditemukan'
            });
        }
        res.json({
            message: 'Berhasil mengambil order',
            data: order
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil order',
            error: error.message
        });
    }
});

// Update an order by ID
app.put('/orders/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({
                message: 'Order tidak ditemukan'
            });
        }
        res.json({
            message: 'Berhasil memperbarui order',
            data: updatedOrder
        });
    } catch (error) {
        res.status(400).json({
            message: 'Gagal memperbarui order',
            error: error.message
        });
    }
});

// Delete an order by ID
app.delete('/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({
                message: 'Order tidak ditemukan'
            });
        }
        res.status(204).json({
            message: 'Berhasil menghapus order'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal menghapus order',
            error: error.message
        });
    }
});

app.post('/midtrans-notification', async (req, res) => {
    try {
        let statusResponse = await snap.transaction.notification(req.body);
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}, Transaction Status: ${transactionStatus}, Fraud Status: ${fraudStatus}`);

        // Find order by ID and update its status
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: 'Order tidak ditemukan'
            });
        }

        if (transactionStatus === 'capture') {
            if (fraudStatus === 'challenge') {
                order.transaction_details.payment_status = 'challenge';
            } else if (fraudStatus === 'accept') {
                order.transaction_details.payment_status = 'success';
            }
        } else if (transactionStatus === 'settlement') {
            order.transaction_details.payment_status = 'success';
        } else if (transactionStatus === 'deny') {
            order.transaction_details.payment_status = 'denied';
        } else if (transactionStatus === 'cancel' || transactionStatus === 'expire') {
            order.transaction_details.payment_status = 'failed';
        } else if (transactionStatus === 'pending') {
            order.transaction_details.payment_status = 'pending';
        }

        await order.save();

        res.status(200).json({
            message: 'Notification handled successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to handle notification',
            error: error.message
        });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
