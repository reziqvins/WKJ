const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow only the frontend origin
    methods: 'GET,POST,PUT,DELETE', // Allow specific methods
    allowedHeaders: 'Content-Type,Authorization' // Allow specific headers
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
        Order_id: { type: String, required: true },
        gross_amount: { type: Number },
        payment_status: { type: String },
        order_Status: { type: String },
        shipping_method: { type: String },
        resi: { type: String }
    },
    item_details: [
        {
            id: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ],
    customer_details: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        alamat: { type: String, required: true }
    }
});

const Order = mongoose.model('Order', orderSchema);

// Create an order
app.post('/orders', async (req, res) => {
    console.log('Received payload:', req.body);  // Logging the payload for debugging purposes

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
