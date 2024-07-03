import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TbReload } from 'react-icons/tb';
import { IoMdCreate } from "react-icons/io";
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { PropagateLoader } from 'react-spinners';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        // const response = await axios.get('https://wkj.vercel.app/orders');
        setOrders(response.data.data);
        console.log(orders)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <PropagateLoader color="#2dd4bf" loading={loading} size={15} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }
  return (
    <div className="container mx-auto p-4 rounded-md bg-white">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Order Table</h1>
        <div className="action flex gap-8">
          <button onClick={() => window.location.reload()} className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-md md:mt-0">
            <span className="text-lg mt-1"><TbReload/></span>
            Reload
          </button>
          <button className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-lg md:mt-0">
            <span className="text-lg mt-1"><MdOutlineCreateNewFolder /> </span>
            Create
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white p-4">
        <table className="table w-full">
          <thead>
            <tr className="text-blue-500 text-[14px]">
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Gross Amount</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Shipping Method</th>
              <th className="px-4 py-2">Resi</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-4 py-2">{order?.customer_details?.name}</td>
                <td className="px-4 py-2">{order?.transaction_details?.gross_amount}</td>
                <td className="px-4 py-2">{order?.transaction_details?.payment_status}</td>
                <td className="px-4 py-2">{order?.transaction_details?.order_Status}</td>
                <td className="px-4 py-2">{order?.transaction_details?.shipping_method}</td>
                <td className="px-4 py-2">{order?.transaction_details?.resi}</td>
                <td className="px-4 py-2">
                  <Link to={`/admin/orders/${order._id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
