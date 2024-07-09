import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../../LandingPage/Navbar';
import { AuthContext } from '../../../Context/AuthContext';
import formatDate from '../../helpers/utils';
import { CLIENT_KEY } from '../../Chekout/Cart';

const TransactionDetail = () => {
  const { id } = useParams();
  const [searchParams, setsetSearchParams] = useSearchParams();
  const { currentUser } = useContext(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const BASE_LOCAL = "http://localhost:3000";
  const BASE_PROD = "https://wkj.vercel.app";

  useEffect(() => {
    if (searchParams.get('transaction_status') === "settlement") {
      const orderId = searchParams.get('order_id');
      axios.put(`${BASE_PROD}/transactionStatus/${orderId}`, {
        "transaction_details.transaction_status": "settlement",
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error.response))
    }
  }, []);

  useEffect(() => {
    const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidtransClientKey = `${CLIENT_KEY}`;
    const script = document.createElement('script');
    script.src = snapSrcUrl;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.async = true;

    script.onload = () => {
      console.log("Snap script loaded successfully");
    };

    script.onerror = () => {
      console.error("Failed to load Snap script");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      axios.get(`${BASE_PROD}/orders/${id}`)
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

  const handleContinue = () => {
    window.snap.pay(transaction.transaction_details.token)
  };

  return (
    <div className="min-h-screen bg-gray-100 text-[14px] md-text-[16px] lg:text-[16px]">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <div className="left">
              <h2 className="text-xl font-bold mb-4">Transaction ID: {transaction.transaction_details.order_id}</h2>
              <p><strong>Nama Pembeli:</strong> {transaction.transaction_details.customer_details.first_name} {transaction.transaction_details.customer_details.last_name}</p>
              <p><strong>Status Pembayaran:</strong> {transaction.transaction_details.transaction_status}</p>
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
                  <td><img className="w-20 h-20 object-cover rounded-md" src={item.img} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between p-5 lg:mr-40 md:mr-20 mr-0">
            <div className="kiri mt-5 ">
              <p>Resi Pengiriman</p>
              {transaction.transaction_details.resi}
            </div>
            <div className="kanan">
              Total : {transaction.transaction_details.gross_amount}
            </div>
            {transaction.transaction_details.transaction_status === "pending" && (
              <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-600 p-4 rounded-md text-white">Lanjut Pembayaran</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
