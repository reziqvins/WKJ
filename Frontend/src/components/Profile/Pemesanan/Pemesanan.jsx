import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TabNavigation from '../../Store/DashboardStore/TabNavigation';
import { AuthContext } from '../../../Context/AuthContext';
import Navbar from '../../LandingPage/Navbar';
import { getPaymentStatus } from '../../../data/Utils';

const Pemesanan = () => {
  const [orders, setOrders] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Belum Bayar');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  
  const BASE_LOCAL = 'http://localhost:3000';
  const BASE_PROD = 'https://wkj.vercel.app';


  useEffect(() => {
    if (currentUser) {
      setLoading(true); // Start loading
      axios.get(`${BASE_PROD}/orders`)
        .then(response => {
          console.log(response.data);
          setOrders(response.data.data);
          setLoading(false); // Stop loading

        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          setLoading(false); // Stop loading
        });
    }
  }, [currentUser]);

  const filteredOrders = orders.filter(order => {
    if (!order.transaction_details || !order.transaction_details.customer_details) {
      return false;
      
    }
    
    if (activeCategory === 'Belum Bayar') {
      return order.transaction_details.transaction_status === 'pending';
    } else if (activeCategory === 'Sudah Bayar') {
      return order.transaction_details.transaction_status === 'settlement';
    }
    return false;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Please log in to view orders.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>
        <TabNavigation
          categories={['Belum Bayar', 'Sudah Bayar']}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {filteredOrders.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Gambar</th>
                <th className="py-2 px-4 bg-gray-200">Nama produk</th>
                <th className="py-2 px-4 bg-gray-200">Harga</th>
                <th className="py-2 px-4 bg-gray-200">Pembayaran</th>
                <th className="py-2 px-4 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                order.transaction_details.customer_details.id === currentUser.uid && (
                  <tr key={order.id}>
                    <td className="py-2 px-4">
                      {order.transaction_details.item_details[0]?.img ? (
                        <img
                          src={order.transaction_details.item_details[0].img}
                          alt={order.transaction_details.item_details[0].name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {order.transaction_details.item_details[0]?.name || 'No Name'}
                    </td>
                    <td className="py-2 px-4">
                      Rp. {order.transaction_details.item_details[0]?.price || 'No Price'}
                    </td>
                    <td className="py-2 px-4 flex mt-7 justify-center">
                      {getPaymentStatus(order.transaction_details.transaction_status) || 'No Status'}
                    </td>
                    <td className="py-2 px-4">
                      <Link to={`/transaction/${order.id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Pemesanan;
