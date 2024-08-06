import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import ReactPaginate from "react-paginate";
import "tailwindcss/tailwind.css";
import { getPaymentStatus, getStatus } from '../../../data/Utils';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [ordersPerPage, setOrdersPerPage] = useState(5);
    const BASE_LOCAL = 'http://localhost:3000';
   const BASE_PROD = 'https://wkj.vercel.app';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_PROD}/orders`); 
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

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
      };
    
      const handleProductsPerPageChange = (event) => {
        setOrdersPerPage(Number(event.target.value));
        setCurrentPage(0); // Reset to the first page
      };

      const offset = currentPage * ordersPerPage;
      const currentProducts = orders.slice(offset, offset + ordersPerPage);
      const pageCount = Math.ceil(orders.length / ordersPerPage);
    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`${BASE_PROD}/orders/${orderId}`);
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
            <div className="overflow-x-auto bg-white p-4">
                <table className="table w-full">
                    <thead>
                        <tr className="text-blue-500 text-[14px]">
                            <th className="px-4 py-2">Nama Pembeli</th>
                            <th className="px-4 py-2">Produk</th>
                            <th className="px-4 py-2">Total Harga</th>
                            <th className="px-4 py-2">Status Pembayaran</th>
                            <th className="px-4 py-2">Status Order</th>
                            <th className="px-4 py-2">Pengiriman</th>
                            <th className="px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100 cursor-pointer">
                                <td className="px-4 py-2">{order?.transaction_details?.customer_details?.first_name}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.item_details[0]?.name}</td>
                                <td className="px-4 py-2">{order?.transaction_details?.gross_amount}</td>
                                <td className="px-4 py-2 ">{getPaymentStatus(order?.transaction_details?.transaction_status)}</td>
                                <td className="px-4 py-2">{getStatus(order?.transaction_details?.order_Status)}</td>
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
            <div className="pagination flex justify-center items-center gap-1 mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center"}
          pageClassName={"page-item mx-1"}
          pageLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300"}
          activeClassName={"active"}
          activeLinkClassName={"bg-[#2dd4bf] text-white"}
        />
        <select
          value={ordersPerPage}
          onChange={handleProductsPerPageChange}
          className="page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"
        >
          {[5, 10, 15, 20, 25].map((count) => (
            <option key={count} value={count}>
              {count} per page
            </option>
          ))}
        </select>
      </div>
        </div>
    );
};

export default OrderTable;
