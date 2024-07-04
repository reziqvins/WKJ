import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../LandingPage/Navbar';
import { AuthContext } from '../../../Context/AuthContext';
import formatDate from '../../helpers/utils';
const TransactionDetail = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (currentUser) {
      axios.get(`https://wkj.vercel.app/orders/${id}`)
        .then(response => {
          setTransaction(response.data.data);
          console.log(response.data.data);
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
    <div className="min-h-screen bg-gray-100 text-[14px] md-text-[16px] lg:text-[16px]">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <div className="left">
            <h2 className="text-xl font-bold mb-4">Transaction ID: {transaction._id}</h2>
          <p><strong>Nama Pembeli:</strong> {transaction.transaction_details.customer_details.first_name} {transaction.transaction_details.customer_details.last_name}</p>
          <p><strong>Status Pembayaran:</strong> {transaction.transaction_details.payment_status}</p>
          <p><strong>Order Status:</strong> {transaction.transaction_details.order_Status}</p>
            </div>
            <div className="right text-[11px] font-semibold">
              <p>{formatDate(transaction.transaction_details.createdAt)}</p>
            </div>
          </div>
          <h3 className="text-[14px] md-text-[16px] lg:text-[16px] font-bold mt-4">Items:</h3>
          <table className="table w-full ">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Produk</th>
                <th>Jumlah</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              
          {transaction.transaction_details.item_details.map(item => (
            <tr key={item.id} className="mt-2">
              <td><img className="w-20 h-20 object-cover rounded-md" src={item.img} alt="" /></td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              
              </tr>
              ))}
                
              
            </tbody>
          </table>
          <div className="flex justify-between p-5 lg:mr-40 md: mr-20 mr-0">
<div className="kiri mt-5 ">
  <p>Resi Pengiriman</p>
  {transaction.transaction_details.resi}
</div>
<div className="kanan">
  Total : {transaction.transaction_details.gross_amount}
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
