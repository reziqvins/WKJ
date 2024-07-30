require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const admin = require('firebase-admin');
const { Snap } = require('midtrans-client');

// Firebase Admin SDK configuration
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const messaging = admin.messaging();
const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());

// Create an order
app.post('/orders', async (req, res) => {
  const { transaction_details } = req.body;

  try {
    const requestPaymentToken = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        transaction_details: {
          order_id: transaction_details.order_id,
          gross_amount: transaction_details.gross_amount,
        },
        customer_details: transaction_details.customer_details,
        item_details: transaction_details.item_details,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from(`SB-Mid-server-${process.env.MIDTRANS_SERVER_KEY}`).toString("base64")}`,
        },
      }
    );

    if (requestPaymentToken.status === 201) {
      const orderData = {
        transaction_details: {
          order_id: transaction_details.order_id,
          gross_amount: transaction_details.gross_amount,
          transaction_status: transaction_details.transaction_status,
          order_Status: transaction_details.order_Status,
          shipping_method: transaction_details.shipping_method,
          resi: transaction_details.resi,
          createdAt: new Date(),
          token: requestPaymentToken.data.token,
          redirect_url: requestPaymentToken.data.redirect_url,
          item_details: transaction_details.item_details,
          customer_details: transaction_details.customer_details
        },
      };

      const orderRef = db.collection('orders').doc(transaction_details.order_id);
      await orderRef.set(orderData);

      return res.status(200).json({
        status: "ok",
        token: requestPaymentToken.data.token,
        redirect_url: requestPaymentToken.data.redirect_url
      });
    }
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({
      status: "failed",
      message: error.response ? error.response.data : error.message,
    });
  }
});

// Read all orders
app.get('/orders', async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').get();
    const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({
      message: 'Berhasil mengambil semua order',
      data: orders
    });
  } catch (error) {
    console.error('Error retrieving orders:', error.message);
    res.status(500).json({
      message: 'Gagal mengambil semua order',
      error: error.message
    });
  }
});

// Read a single order by ID
app.get('/orders/:id', async (req, res) => {
  try {
    const orderRef = db.collection('orders').doc(req.params.id);
    const doc = await orderRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        message: 'Order tidak ditemukan'
      });
    }
    res.json({
      message: 'Berhasil mengambil order',
      data: doc.data()
    });
  } catch (error) {
    console.error('Error retrieving order:', error.message);
    res.status(500).json({
      message: 'Gagal mengambil order',
      error: error.message
    });
  }
});

// Update an order by ID
app.put('/transactionStatus/:id', async (req, res) => {
  try {
    const orderRef = db.collection('orders').doc(req.params.id);
    const doc = await orderRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        message: 'Order tidak ditemukan'
      });
    }
    await orderRef.update(req.body);
    res.json({
      message: 'Berhasil memperbarui order',
      data: req.body
    });
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(400).json({
      message: 'Gagal memperbarui order',
      error: error.message
    });
  }
});

// Delete an order by ID
app.delete('/orders/:id', async (req, res) => {
  try {
    const orderRef = db.collection('orders').doc(req.params.id);
    await orderRef.delete();
    res.status(204).json({
      message: 'Berhasil menghapus order'
    });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({
      message: 'Gagal menghapus order',
      error: error.message
    });
  }
});

// Handle Midtrans notifications
app.post('/midtrans-notification', async (req, res) => {
  try {
    const snap = new Snap({ serverKey: process.env.MIDTRANS_SERVER_KEY, environment: process.env.MIDTRANS_ENVIRONMENT });
    const statusResponse = await snap.transaction.notification(req.body);
    const { order_id, transaction_status, fraud_status } = statusResponse;

    console.log(`Transaction notification received. Order ID: ${order_id}, Transaction Status: ${transaction_status}, Fraud Status: ${fraud_status}`);

    const orderRef = db.collection('orders').doc(order_id);
    const doc = await orderRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        message: 'Order tidak ditemukan'
      });
    }

    const orderData = doc.data();
    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        orderData.transaction_details.payment_status = 'challenge';
      } else if (fraud_status === 'accept') {
        orderData.transaction_details.payment_status = 'success';
      }
    } else if (transaction_status === 'settlement') {
      orderData.transaction_details.payment_status = 'success';
    } else if (transaction_status === 'deny') {
      orderData.transaction_details.payment_status = 'denied';
    } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
      orderData.transaction_details.payment_status = 'failed';
    } else if (transaction_status === 'pending') {
      orderData.transaction_details.payment_status = 'pending';
    }

    await orderRef.update(orderData);

    res.status(200).json({
      message: 'Notification handled successfully'
    });
  } catch (error) {
    console.error('Error handling notification:', error.message);
    res.status(500).json({
      message: 'Failed to handle notification',
      error: error.message
    });
  }
});

// Save FCM Token
app.post('/store-token', async (req, res) => {
  const { fcmToken } = req.body;

  if (!fcmToken) {
    return res.status(400).json({ error: 'FCM token is required' });
  }

  try {
    await db.collection('tokens').doc(fcmToken).set({ token: fcmToken });
    res.status(200).json({ message: 'Token stored successfully' });
  } catch (error) {
    console.error('Error storing token:', error.message);
    res.status(500).json({ error: 'Failed to store token', details: error.message });
  }
});

// Send Notification
app.post('/send-notification', async (req, res) => {
    const { fcmToken, title, body } = req.body;
  
    const message = {
      to: fcmToken,
      notification: {
        title,
        body,
      },
    };
  
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Authorization': 'key=YOUR_SERVER_KEY', // Replace with your server key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
  
      res.status(200).send({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to send notification' });
    }
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
