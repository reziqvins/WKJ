import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GrCompliance } from "react-icons/gr";
import { FaShippingFast } from "react-icons/fa";
import UpdateOrderStatus from "../UpdateOrderStatus";
import { PropagateLoader } from "react-spinners";
import Swal from "sweetalert2";
import formatDate from "../../../helpers/utils";

const OrderInformation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resi, setResi] = useState("");

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const response = await axios.get(`https://wkj.vercel.app/orders/${id}`);
        setOrder(response.data.data);
        console.log(response.data.data);
        setResi(response.data.data?.transaction_details?.resi);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch order details.");
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

  const handleResiChange = (e) => {
    setResi(e.target.value);
  };

  const handleImageClick = (imageUrl) => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "image";
    a.target = "_blank";
    a.click();
  };

  const saveResi = async () => {
    try {
      const updatedData = {
        "transaction_details.resi": resi,
      };
      const response = await axios.put(
        `http://localhost:3000/orders/${id}`,
        // `https://wkj.vercel.app/orders/${id}`,
        updatedData
      );
      console.log("Resi updated successfully:", response);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Resi updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update resi",
        error,
      });
      console.error("Failed to update resi", error);
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
    <div className="card bg-white rounded-lg text-sm md:text-base lg:text-base">
      <div className="flex justify-between">
        <p className="font-bold p-4">Order information {order?.transaction_details.order_id}</p>
        <p className="text-[12px] p-4">
          {formatDate(order?.transaction_details?.createdAt)}
        </p>
      </div>
      <div className="status flex p-4 gap-2 border-b-[1px] border-slate-200">
        <GrCompliance />
        <p className="font-bold">{order?.transaction_details?.order_Status}</p>
      </div>
      <div className="orders p-4">
        {order?.transaction_details.item_details.map((item) => (
          <div key={item.id} className="flex justify-between gap-3 mb-5">
            <div className="produk flex gap-4">
              <img
                className="h-10 w-10 border"
                src={item.img}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
            <div className="detail flex gap-8">
              <p>
                Rp. {parseInt(item.price)} x {item.quantity}
              </p>
              <p>= Rp. {parseInt(item.price) * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rincian-harga flex justify-end gap-10 p-4">
        <div className="kolomKiri">
          <div className="totalPayment">
            <p>Total Amount</p>
            <p>Payment Status</p>
          </div>
        </div>
        <div className="kolomKanan">
          <p>Rp. {parseInt(order?.transaction_details?.gross_amount)}</p>
          <p>{order?.transaction_details?.transaction_status}</p>
        </div>
      </div>
      <div className="paidAmount flex justify-end gap-10 p-4 border-t-[1px] border-slate-200">
        <p>Paid Amount</p>
        <p>Rp. {parseInt(order?.transaction_details?.gross_amount)}</p>
      </div>
      <div className="invoice flex justify-end px-4 mb-7">
        <button className="bg-[#0DCAF0] w-[150px] h-[30px] rounded-lg text-white">
          Download Invoice
        </button>
      </div>
      <div className="bg-[#e6e5e5] p-2 flex justify-center gap-6">
        <button
          className="bg-[#0DCAF0] ml-2 text-white px-4 py-2 rounded flex gap-3"
          onClick={openModal}
        >
          <FaShippingFast className="text-white mt-1" />
          Update Order Status
        </button>
        <UpdateOrderStatus isOpen={isModalOpen} onClose={closeModal} orderId={id} />
        <div className="flex gap-3">
          <p>Resi Pengiriman</p>
          <input
            type="text"
            className="outline-none border border-gray-300 px-2 py-1 rounded-lg"
            value={resi}
            onChange={handleResiChange}
          />
          <button
            className="px-4 py-2 bg-[#0DCAF0] text-white rounded"
            onClick={saveResi}
          >
            Save Resi
          </button>
        </div>
      </div>
      {order?.transaction_details?.customer_details?.imgCheck && (
        <div className="imgCheck p-4 rounded-md">
          <p>Hasil Konsultasi</p>
          <div className="flex justify-center items-center mt-4">
            <img
              className="h-80"
              src={order?.transaction_details.customer_details.imgCheck}
              alt="Customer Check Image"
              onClick={() => handleImageClick(order?.transaction_details.customer_details.imgCheck)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderInformation;
