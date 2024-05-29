const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
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
        Order_id: String,
        gross_amount: Number,
        payment_status: String,
        order_Status: String,
        shipping_method: String,
        resi: String
    },
    item_details: [
        {
            id: String,
            price: Number,
            quantity: Number,
            name: String
        }
    ],
    customer_details: {
        name: String,
        email: String,
        alamat: String
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
        const savedOrder = await order.save();
        res.status(201).json({
            message: 'Order berhasil dibuat',
            data: savedOrder
        });
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

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});