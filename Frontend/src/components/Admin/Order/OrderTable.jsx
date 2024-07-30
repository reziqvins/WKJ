import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_LOCAL = 'http://localhost:3000';
   const BASE_PROD = 'https://wkj.vercel.app';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_LOCAL}/orders`); 
                const sortedOrders = response.data.data.sort((a, b) => new Date(b.transaction_details.createdAt) - new Date(a.transaction_details.createdAt));
                setOrders(response.data.data);
                console.log(response.data.data)
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
            await axios.delete(`${BASE_LOCAL}/orders/${orderId}`);
            setOrders(orders.filter(order => order.id !== orderId));
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
            </div>
            <div className="overflow-x-auto bg-white p-4">
                <table className="table w-full">
                    <thead>
                        <tr className="text-blue-500 text-[14px]">
                            <th className="px-4 py-2">Customer Name</th>
                            <th className="px-4 py-2">Produk</th>
                            <th className="px-4 py-2">Gross Amount</th>
                            <th className="px-4 py-2">Payment Status</th>
                            <th className="px-4 py-2">Order Status</th>
                            <th className="px-4 py-2">Shipping Method</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100 cursor-pointer">
                                <td className="px-4 py-2">{order?.transaction_details?.customer_details?.first_name}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.item_details[0]?.name}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.gross_amount}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.transaction_status}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.order_Status}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.shipping_method}</td>
                                <td className="px-4 py-2">
                                    <Link to={`/admin/orders/${order.id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md">View</Link>
                                    <button onClick={() => handleDeleteOrder(order.id)} className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">Delete</button>
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
