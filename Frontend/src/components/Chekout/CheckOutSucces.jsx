import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useParams } from "react-router-dom";

const CheckOutSucces = () => {
  const { order_id, transaction_status } = useParams();
  
  useEffect(() => {
    if (order_id === undefined || transaction_status === undefined) {
      console.log(order_id, transaction_status);
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="text-center">
          <FaCheckCircle className="mx-auto h-24 w-24 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Pembayaran Berhasil!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Terima Kasih Atas Pembelian Anda. Transaksi Anda telah berhasil diselesaikan.
          </p>
          <div className="mt-6">
            <Link to="/" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Beranda</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutSucces;
