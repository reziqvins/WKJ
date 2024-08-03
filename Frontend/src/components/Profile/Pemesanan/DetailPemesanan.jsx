  import React, { useEffect, useState, useContext } from "react";
  import axios from "axios";
  import { useParams, useSearchParams } from "react-router-dom";
  import Navbar from "../../LandingPage/Navbar";
  import { AuthContext } from "../../../Context/AuthContext";
  import formatDate from "../../helpers/utils";
  import { getPaymentStatus, getStatus } from "../../../data/Utils";

  const TransactionDetail = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentUser } = useContext(AuthContext);
    const [transaction, setTransaction] = useState(null);
    const [imgChek, setImgChek] = useState(null);
  const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    const BASE_LOCAL = import.meta.env.VITE_BASE_LOCAL;
    const BASE_PROD = import.meta.env.VITE_BASE_PROD;

    useEffect(() => {
      if (searchParams.get("transaction_status") === "settlement") {
        const orderId = searchParams.get("order_id");
        axios
          .put(`${BASE_PROD}/transactionStatus/${orderId}`, {
            "transaction_details.transaction_status": "settlement",
          })
          .then((response) => console.log("------------------------" + response.data))
          .catch((error) => console.error(error.response));
      }
    }, [searchParams]);

    useEffect(() => {
      const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      const myMidtransClientKey = `${CLIENT_KEY}`;
      const script = document.createElement("script");
      script.src = snapSrcUrl;
      script.setAttribute("data-client-key", myMidtransClientKey);
      script.async = true;

      script.onload = () => {
        console.log("Snap script loaded successfully");
      };

      script.onerror = () => {
        console.error("Failed to load Snap script");
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }, []);

    useEffect(() => {
      if (currentUser) {
        axios
          .get(`${BASE_PROD}/orders/${id}`)
          .then((response) => {
            setTransaction(response.data.data);
            console.log(response.data.data);
            setImgChek(response.data.data.transaction_details.customer_details.imgCheck);
          })
          .catch((error) => {
            console.error("Error fetching transaction details:", error);
          });
      }
    }, [currentUser, id]);

    if (!currentUser) {
      return <div>Loading...</div>;
    }

    if (!transaction) {
      return <div>Loading transaction details...</div>;
    }

    const handleContinue = () => {
      window.snap.pay(transaction.transaction_details.token);
    };

    const handleMarkAsDelivered = async () => {
      try {
        const response = await axios.put(`${BASE_LOCAL}/orders/${id}/deliver`);
        alert(response.data.message);
        setTransaction({
          ...transaction,
          transaction_details: {
            ...transaction.transaction_details,
            order_Status: 'delivered',
          },
        });
      } catch (error) {
        console.error("Error updating order status:", error);
        alert(error.response.data.message);
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 text-[14px] md:text-[16px] lg:text-[16px]">
        <Navbar />
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between">
              <div className="left">
                <h2 className="text-xl font-bold mb-4">
                  Transaction ID: {transaction.transaction_details.order_id}
                </h2>
                <div className="flex gap-6">
                  <div className="kiri p">
                    <h3 className="font-bold">Nama Pembeli</h3>
                    <h3 className="font-bold">Nomor Hp</h3>
                    <h3 className="font-bold">Alamat</h3>
                    <h3 className="font-bold">Status Pembayaran</h3>
                    <h3 className="font-bold">Order Status</h3>
                  </div>
                  <div className="kanan">
                    <p>: {transaction.transaction_details.customer_details.first_name}</p>
                    <p>: {transaction.transaction_details.customer_details.noHp}</p>
                    <p>: {transaction.transaction_details.customer_details.alamat}</p>
                    <p className="flex">: <span className="mt-1 ml-1">{getPaymentStatus(transaction.transaction_details.transaction_status)}</span></p>
                    <p className="flex">: <span className="mt-1 ml-1">{getStatus(transaction.transaction_details.order_Status)}</span></p>
                  </div>
                </div>
              </div>
              <div className="right text-[11px] font-semibold">
                <p>{formatDate(transaction.transaction_details.createdAt)}</p>
              </div>
            </div>
            <h3 className="text-[14px] md:text-[16px] lg:text-[16px] font-bold mt-4">
              Items:
            </h3>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Produk</th>
                  <th>Jumlah</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                {transaction.transaction_details.item_details.map((item) => (
                  <tr key={item.id} className="mt-2">
                    <td>
                      <img
                        className="w-20 h-20 object-cover rounded-md"
                        src={item.img}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between p-5 lg:mr-40 md:mr-20 mr-0">
              <div className="kiri mt-5">
                <p>Resi Pengiriman</p>
                {transaction.transaction_details.resi}
              </div>
              <div className="kanan">
                Total : {transaction.transaction_details.gross_amount}
              </div>
            </div>
            <div className="flex justify-end mr-5">
              {transaction.transaction_details.transaction_status === "pending" && (
                <button
                  onClick={handleContinue}
                  className="bg-blue-500 hover:bg-blue-600 p-4 rounded-md text-white"
                >
                  Lanjut Pembayaran
                </button>
              )}
              {transaction.transaction_details.transaction_status !== "pending" && 
                transaction.transaction_details.order_Status !== 'delivered' && (
                <button
                  onClick={handleMarkAsDelivered}
                  className="bg-green-500 hover:bg-green-600 p-4 rounded-md text-white ml-4"
                >
                  Pesanan Telah Sampai
                </button>
              )}
            </div>
          </div>
          
          <div className="kanan">
            <div className="mt-5">
              {imgChek && (
                <div className="flex container mt-5 mx-auto py-8 bg-white p-6 rounded-lg shadow-md">
                  <h1 className="text-2xl font-bold mb-6">Pemeriksaan Digital</h1>
                  <img
                    className="flex items-center justify-center"
                    src={imgChek}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TransactionDetail;
