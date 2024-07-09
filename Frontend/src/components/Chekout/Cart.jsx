import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../Redux/CartSlice";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import uploadFile from "../helpers/uploadFile";
import { AuthContext } from "../../Context/AuthContext";

export const CLIENT_KEY = 'SB-Mid-client-jEtvZoEqwphlbnRo';
export const BASE_LOCAL = 'http://localhost:3000';
export const BASE_PROD = 'https://wkj.vercel.app';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState(currentUser?.displayName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [shipping, setShipping] = useState("JNE");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    dispatch(getTotals());

    if (currentUser) {
      setName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
      setAddress(currentUser.address || "");
    }
  }, [cart, dispatch, currentUser]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Anda yakin ingin mengosongkan keranjang?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, kosongkan',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          icon: 'success',
          title: 'Keranjang berhasil dikosongkan',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      console.error("No file selected");
      return null;
    }

    try {
      const uploadPhoto = await uploadFile(file);
      setImgUrl(uploadPhoto?.url);
      return uploadPhoto?.url;
    } catch (error) {
      console.error("Error uploading photo:", error);
      return null;
    }
  };

  const generateTransactionID = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const prefix = "WKJ";
    const length = 10;
    let transactionID = prefix;
    for (let i = 0; i < length - prefix.length; i++) {
      transactionID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return transactionID;
  };

  const sendOrderToApi = async (orderData) => {
    try {
      const response = await axios.post(`${BASE_PROD}/orders`, orderData);
      const data = response.data;

      if (data.status === "ok" && data.token) {
        dispatch(clearCart());
        Swal.fire({
          icon: 'success',
          title: 'Pesanan berhasil dibuat',
          showConfirmButton: false,
          timer: 1500
        });
        return data.token;
      } else {
        console.error("API Error:", data);
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Error sending order to API:", error);
      throw error;
    }
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      Swal.fire({
        icon: "warning",
        title: "Login Diperlukan",
        text: "Silahkan Login untuk melakukan Checkout.",
      });
      return;
    }

    let imgUrl = null;
    if (file) {
      imgUrl = await handleUploadPhoto();
    }

    const itemData = cart.cartItems.map((item) => ({
      id: item.id,
      price: item.price,
      img: item.img,
      quantity: item.cartQuantity,
      name: item.name,
    }));

    const orderData = {
      transaction_details: {
        order_id: generateTransactionID(),
        gross_amount: cart.cartTotalAmount,
        transaction_status: "pending",
        order_Status: "Package",
        shipping_method: shipping,
        resi: "",
        item_details: itemData,
        customer_details: {
          id: currentUser.uid,
          first_name: name,
          email: email,
          alamat: address,
          imgCheck: imgUrl,
        },
      },
    };
    
    try {
      const token = await sendOrderToApi(orderData);
      if (token) {
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log('Payment Success:', result);
          },
          onPending: function (result) {
            console.log('Payment Pending:', result);
          },
          onError: function (result) {
            console.log('Payment Error:', result);
          },
          onClose: function () {
            console.log('Payment popup closed');
          }
        });
      } else {
        console.error("Token not received");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get('transaction_status') === "settlement") {
      const orderId = searchParams.get('order_id');

      axios.put(`https://wkj.vercel.app/transactionStatus/${orderId}`, {
        "transaction_details.transaction_status": "settlement",
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error.response))
    }
    if (searchParams.get('transaction_status') === "pending") {
      const orderId = searchParams.get('order_id');
      
      axios.put(`https://wkj.vercel.app/transactionStatus/${orderId}`, {
        "transaction_details.transaction_status": "pending",
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error.response))
    }
  }, []);

  useEffect(() => {
    const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidtransClientKey = `${CLIENT_KEY}`;
    const script = document.createElement('script');
    script.src = snapSrcUrl;
    script.setAttribute('data-client-key', myMidtransClientKey);
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

  return (
    <div className="p-8">
      <h2 className="font-medium text-2xl text-center">Keranjang Belanja</h2>
      <button
        onClick={handleClearCart}
        className="bg-gray-200 flex text-right text-gray-700 font-medium rounded p-2 mt-4"
      >
        Bersihkan Keranjang
      </button>
      {cart.cartItems.length === 0 ? (
        <div className="text-center mt-8">
          <p>Your cart is currently empty</p>
          <div className="mt-4">
            <Link to="/DashboardStore" className="flex items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left mr-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Mulai Belanja</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 text-blue-500 gap-2 items-center mt-4">
            <h3 className="text-sm font-bold">Produk</h3>
            <h3 className="text-sm font-bold">Harga</h3>
            <h3 className="text-sm font-bold">Jumlah</h3>
            <h3 className="text-sm font-bold">Total</h3>
          </div>
          <div className="mt-4">
            {cart.cartItems.map((cartItem) => (
              <div
                className="grid grid-cols-4 gap-2 items-center mt-5 border-t-2"
                key={cartItem.id}
              >
                <div className="flex items-center">
                  <img
                    src={cartItem.img}
                    alt={cartItem.name}
                    className="w-16 h-16 object-cover mr-2 hidden md:block"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{cartItem.name}</h3>
                    <button
                      onClick={() => handleRemoveFromCart(cartItem)}
                      className="text-gray-500 text-xs"
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className="text-sm">Rp. {cartItem.price}</div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseCart(cartItem)}
                    className="text-gray-500"
                  >
                    -
                  </button>
                  <div className="mx-2">{cartItem.cartQuantity}</div>
                  <button
                    onClick={() => handleAddToCart(cartItem)}
                    className="text-gray-500"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm">
                  Rp. {cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between border-t border-gray-200 pt-8">
            <form className="w-full md:w-1/2 md:pr-4">
              <h1 className="font-bold text-xl mb-4">Detail Pelanggan</h1>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nama:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Alamat:
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {cart.cartItems.some((item) => item.isCheck === "1") && (
                <div className="mb-4 flex flex-col">
                  <label htmlFor="image" className="mb-2 font-medium">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </form>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <h1 className="font-bold text-xl mb-4">Metode Pengiriman</h1>
              <div className="mb-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="shipping"
                    value="JNE"
                    checked={shipping === "JNE"}
                    onChange={() => setShipping("JNE")}
                  />
                  JNE
                </label>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span className="font-medium">Rp. {cart.cartTotalAmount}</span>
                </div>
                <p className="mt-1 text-gray-600">
                  Pajak dan pengiriman dihitung di checkout
                </p>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-blue-500 text-white font-medium rounded py-2"
                >
                  Checkout
                </button>
                <div className="mt-4">
                  <Link to="/DashboardStore" className="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left mr-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Lanjutkan Belanja</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
