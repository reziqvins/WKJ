import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiMessageFill } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { MdCall } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const BASE_LOCAL = 'http://localhost:3000';
const BASE_PROD = 'https://wkj.vercel.app';

const UserInformation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const response = await axios.get(`${BASE_PROD}/orders/${id}`);
        const data = response.data.data;
        if (data && data.transaction_details) {
          setOrder(data.transaction_details);
        } else {
          console.error('Unexpected data structure:', data);
          setOrder(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details.');
        setLoading(false);
      }
    };

    fetchOrderById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = async () => {

    try {
      await axios.put(`${BASE_PROD}/transactionStatus/${id}`, {
        transaction_details: {
          order_id: order?.order_id,
          gross_amount: order?.gross_amount,
          transaction_status: order?.transaction_status,
          order_Status: order?.order_Status,
          shipping_method: order?.shipping_method,
          resi: order?.resi,
          item_details: order?.item_details,
          customer_details: {
            id: order?.customer_details?.id,
            first_name: shippingInfo.name,
            noHp: shippingInfo.phoneNumber,
            alamat: shippingInfo.address,
            province: shippingInfo.state,
            imgCheck: order?.customer_details?.imgCheck,
            city: shippingInfo.city,
            postalCode: shippingInfo.zipCode,
            photoURL: order?.customer_details?.photoURL,
            email: shippingInfo.email,
          },
        },
      });

      // Fetch the updated order details
      const response = await axios.get(`${BASE_PROD}/orders/${id}`);
      setOrder(response.data.data.transaction_details);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating order details:', error);
      setError('Failed to update order details.');
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openEditModal = () => {
    setShippingInfo({
      name: order.customer_details.first_name || '',
      phoneNumber: order.customer_details.noHp || '',
      email: order.customer_details.email || '',
      address: order.customer_details.alamat || '',
      city: order.customer_details.city || '',
      state: order.customer_details.province || '',
      zipCode: order.customer_details.postalCode || '',
    });
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('') : '';
  };

  return (
    <div className="bg-white rounded-md p-4 h-fit w-full md:w-[450px] shadow-lg">
      <div key={order.id}>
        <div className="customer border-b-[1px] border-slate-200 p-4">
          <div className="flex justify-center items-center">
            <img
              className="h-10 w-10"
              src={order?.customer_details?.photoURL}
              alt=""
            />
            <p className="font-bold">{order?.customer_details?.first_name}</p>
          </div>
          <div className="detailOrders flex gap-3 p-4">
            <RiMessageFill className="mt-1" />
            <p>8 Orders</p>
          </div>
          <p>{order.customer_details?.email}</p>
        </div>

        {/* Shipping address section */}
        <div className="shippingAddress p-4">
          <div className="header flex justify-between">
            <p className="font-bold">Shipping Address</p>
            <BsPencil onClick={openEditModal} className="cursor-pointer" />
          </div>
          <div className="shipping-info">
            <p>{order.customer_details?.first_name}</p>
            <div className="call flex gap-3 hover:text-yellow-300">
              <MdCall className="mt-1 hover:text-yellow-300" />
              <p className="hover:text-yellow-300 cursor-pointer">
                {order.customer_details?.noHp}
              </p>
            </div>
            <p>
              {order.customer_details?.alamat}
              <br />
              {order.customer_details?.city}
              <br />
              {order.customer_details?.province}
              <br />
              {order.customer_details?.postalCode}
            </p>
            {/* <a className="hover:text-yellow-300" href="">
              See on Maps
            </a> */}
          </div>
        </div>

        {/* Modal for editing shipping information */}
        {isEditModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-[#e9e9e9] p-4 rounded-md w-[90%] md:w-[60%]">
              <div className="header">
                <h2 className="text-lg font-semibold mb-4">Update Address</h2>
              </div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                className="w-full mb-2 bg-slate-300 p-2 rounded-md border-2"
              />
              <label htmlFor="phoneNumber">Nomor Hp</label>
              <input
                type="text"
                name="phoneNumber"
                value={shippingInfo.phoneNumber}
                onChange={handleInputChange}
                className="w-full mb-2 bg-slate-300 p-2 rounded-md"
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                className="w-full mb-2 bg-slate-300 p-2 rounded-md"
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="w-full mb-2 bg-slate-300 p-2 rounded-md"
              />
              <label htmlFor="city">Kota</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="w-full mb-2 bg-slate-300 p-2 rounded-md"
              />
              <label htmlFor="state">Provinsi</label>
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                className="w-full mb-2 bg-slate-300 p-2 rounded-md"
              />
              <label htmlFor="zipCode">Kode Pos</label>
              <input
                type="text"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                className="w-full mb-2 bg-slate-300 p-2 rounded-md"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#0DCAF0] hover:bg-[#29D4F7] text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={closeEditModal}
                className="bg-[#FFC107] hover:bg-[#efdba0] text-white px-4 py-2 rounded-lg ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInformation;
