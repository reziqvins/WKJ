import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import Navbar from '../../LandingPage/Navbar';

const DetailPemesanan = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:3000/orders/${id}`)
        .then(response => {
          setTransaction(response.data);
        })
        .catch(error => {
          console.error('Error fetching transaction:', error);
        });
    }
  }, [currentUser, id]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  const { transaction_details } = transaction;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
          <p>Name: {transaction_details.customer_details.first_name}</p>
          <p>Email: {transaction_details.customer_details.email}</p>
          <p>Address: {transaction_details.customer_details.alamat}</p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Transaction Details</h2>
          <p>Gross Amount: {transaction_details.gross_amount}</p>
          <p>Payment Status: {transaction_details.payment_status}</p>
          <p>Order Status: {transaction_details.order_Status}</p>
          <p>Shipping Method: {transaction_details.shipping_method}</p>
          <p>Resi: {transaction_details.resi}</p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Item Details</h2>
          <ul>
            {transaction_details.item_details.map(item => (
              <li key={item.id} className="mb-2">
                <p>Item Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <img src={item.img} alt={item.name} width="100" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPemesanan;
