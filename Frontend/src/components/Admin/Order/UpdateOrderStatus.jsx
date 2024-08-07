import React, { useState } from "react";
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import Swal from "sweetalert2";

const UpdateOrderStatus = ({ isOpen, onClose, orderId }) => {
  const [status, setStatus] = useState("");
  const BASE_LOCAL = 'http://localhost:3000';
  const BASE_PROD = 'https://wkj.vercel.app';

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleSave = () => {
    const updatedData = {
      "transaction_details.order_Status": status,
    };

    axios.put(`${BASE_PROD}/transactionStatus/${orderId}`, updatedData)
      .then((response) => {
        console.log("Order status updated successfully:", response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order status updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        onClose();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          error,
        });
        console.error("Failed to update order status", error);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="w-[500px] rounded-lg shadow-md z-20 bg-[#f9f9f9]">
        <div className="header bg-[#0DCAF0] p-2 flex gap-3 rounded-t-lg">
          <RxUpdate className="text-white mt-2 font-bold" />
          <h2 className="text-white font-semibold mb-4">Update Order Status</h2>
        </div>
        <div className="body bg-white p-4 rounded-b-lg">
          <label className="block mb-2 bg-white">Select Status:</label>
          <select
            className="border rounded px-3 py-2 w-full bg-white"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="" disabled>
              Pilih status
            </option>
            <option value="Delivered">Terkirim</option>
            <option value="package">Dikemas</option>
            <option value="Arrange-Shipment">Sedang Dalam Pengiriman</option>
          </select>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-[#0DCAF0] text-white rounded"
              onClick={handleSave}
            >
              Update
            </button>
            <button
              className="px-4 py-2 ml-2 bg-[#FFC107] rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
