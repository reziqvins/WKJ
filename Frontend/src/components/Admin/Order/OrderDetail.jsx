import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://wkj.vercel.app/orders/${id}`);
        setOrder(response.data.data);
        console.log(order);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <span className="text-red-500">{error}</span>;

  return (
    <div className="container mx-auto p-4 rounded-md bg-white">
      <h1 className="text-2xl font-semibold">Order Detail</h1>
      <div className="overflow-x-auto bg-white p-4">
        {order ? (
          <div>
            <p><strong>Gross Amount:</strong> {order.transaction_details.gross_amount}</p>
            <p><strong>Payment Status:</strong> {order.transaction_details.payment_status}</p>
            <p><strong>Order Status:</strong> {order.transaction_details.order_Status}</p>
            <p><strong>Shipping Method:</strong> {order.transaction_details.shipping_method}</p>
            <p><strong>Resi:</strong> {order.transaction_details.resi}</p>
            <p><strong>Customer Name:</strong> {order.customer_details.name}</p>
          </div>
        ) : (
          <p>No order found</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
