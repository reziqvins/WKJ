import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const RecentOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://wkj.vercel.app/orders');
                const sortedOrders = response.data.data.sort((a, b) => new Date(b.transaction_details.createdAt) - new Date(a.transaction_details.createdAt));
                setOrders(sortedOrders);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`https://wkj.vercel.app/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
            Swal.fire({
              icon: 'success',
              title: 'Data Berhasil Terhapus!',
              showConfirmButton: false,
              timer: 1500
            });
        } catch (error) {
            alert('Failed to delete order');
        }
    };


    return (
        <div className="container p-4 rounded-md bg-white">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Order Table</h1>
            </div>
            <div className="overflow-x-auto bg-white p-4">
                <table className="table w-full">
                    <thead>
                        <tr className="text-blue-500 text-[14px]">
                            <th className="px-4 py-2">Customer Name</th>
                            <th className="px-4 py-2">Produk</th>
                            <th className="px-4 py-2">Gross Amount</th>
                            <th className="px-4 py-2">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-100 cursor-pointer">
                                <td className="px-4 py-2">{order?.transaction_details?.customer_details?.first_name}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.item_details[0]?.name}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.gross_amount}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.transaction_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrder;
