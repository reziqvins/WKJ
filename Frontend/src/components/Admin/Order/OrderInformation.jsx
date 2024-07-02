import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GrCompliance } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import UpdateOrderStatus from "./UpdateOrderStatus"; // Assuming the file is named UpdateOrderStatus.jsx
import { PropagateLoader } from "react-spinners";

const OrderInformation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const response = await axios.get(`https://wkj.vercel.app/orders/${id}`);
        setOrder(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderById();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    <div className="card bg-white rounded-lg text-[12px]">
      <p className="font-semibold p-4">
        Order information {order?.transaction_details?.Order_id}
      </p>
      <div className="status flex p-4 gap-2 border-b-[1px] border-slate-200">
        <GrCompliance />
        <p className="font-bold text-[12px]">
          {order?.transaction_details?.order_Status}
        </p>
      </div>
      <div className="orders flex  gap-3 p-4">
        {order?.item_details.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img className="h-10 w-10 border" src={item.img} alt={item.name} />
            <div className="detail">
              <p>{item.name}</p>
              <p>
                Rp. {parseInt(item.price)} x {item.quantity}
              </p>
              <p>Subtotal: Rp. {parseInt(item.price) * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rincian-harga flex justify-end gap-10 p-4">
        <div className="kolomKiri">
          <p>Sub amount </p>
          <p>Discount</p>
          <div className="totalPayment">
            <p>Total Amount</p>
            <p className="text-[10px]">
              {order?.transaction_details?.payment_status}
            </p>
          </div>
        </div>
        <div className="kolomKanan">
          <p>Rp. {parseInt(order?.transaction_details?.gross_amount)}</p>
          <p>Rp. 0</p> {/* Assuming no discount */}
          <p className="mt-5">
            Rp. {parseInt(order?.transaction_details?.gross_amount)}
          </p>
        </div>
      </div>
      <div className="paidAmount flex justify-end gap-10 p-4 border-t-[1px] border-slate-200">
        <p>Paid Amount</p>
        <p>Rp. {parseInt(order?.transaction_details?.gross_amount)}</p>
      </div>
      <div className="invoice flex justify-end px-4">
        <button className="bg-[#0DCAF0] w-[150px] h-[30px] rounded-lg text-white">
          Download Invoice
        </button>
      </div>
      <div className="bg-[#e6e5e5] p-2">
        <button
          className="bg-[#0DCAF0] ml-2 text-white px-4 py-2 rounded flex gap-3"
          onClick={openModal}
        >
          <FaShippingFast className="text-white mt-1" />
          Update Order Status
        </button>

        <UpdateOrderStatus isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default OrderInformation;
