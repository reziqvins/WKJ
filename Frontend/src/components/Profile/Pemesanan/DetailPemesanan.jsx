import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../LandingPage/Navbar';
import { AuthContext } from '../../../Context/AuthContext';

const TransactionDetail = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (currentUser) {
      axios.get(`https://wkj.vercel.app/orders/${id}`)
        .then(response => {
          setTransaction(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching transaction details:', error);
        });
    }
  }, [currentUser, id]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (!transaction) {
    return <div>Loading transaction details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Transaction ID: {transaction._id}</h2>
          <p><strong>Customer Name:</strong> {transaction.transaction_details.customer_details.first_name} {transaction.transaction_details.customer_details.last_name}</p>
          <p><strong>Payment Status:</strong> {transaction.transaction_details.payment_status}</p>
          <p><strong>Order Status:</strong> {transaction.transaction_details.order_Status}</p>
          <h3 className="text-lg font-bold mt-4">Items:</h3>
          {transaction.transaction_details.item_details.map(item => (
            <div key={item.id} className="mt-2">
              <p><strong>Product Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> {item.price}</p>
              {item.img && <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-md" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
