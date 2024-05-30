import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  setShippingMethod,
} from "../../Redux/CartSlice";
import { Link } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-PUUdoGz-9cLzYr1JcTc_qZS-',
  clientKey: 'SB-Mid-client-jEtvZoEqwphlbnRo'
});

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState(cart.shippingMethod || "JNE");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [imgCheck, setImgCheck] = useState(null);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

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
    dispatch(clearCart());
  };

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
    dispatch(setShippingMethod(event.target.value));
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      console.error("No file selected");
      return null;
    }
    console.log("Uploading file:", file);
    const uploadPhoto = await uploadFile(file);
    console.log("Uploaded file URL:", uploadPhoto?.url);
    setImgCheck(uploadPhoto?.url);
    return uploadPhoto?.url;
  };

  const createMidtransTransaction = async (orderData) => {
    const parameters = {
      transaction_details: {
        order_id: orderData.transaction_details.Order_id,
        gross_amount: orderData.transaction_details.gross_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: orderData.customer_details.name,
        email: orderData.customer_details.email,
        address: orderData.customer_details.alamat,
      },
      item_details: orderData.item_details,
    };

    try {
      const transaction = await snap.createTransaction(parameters);
      return transaction;
    } catch (error) {
      console.error("Error creating Midtrans transaction:", error);
      throw error;
    }
  };

  const handleCheckout = async () => {
    let imgUrl = null;
    if (file) {
      imgUrl = await handleUploadPhoto();
    }

    const orderData = {
      transaction_details: {
        Order_id: generateTransactionID(),
        gross_amount: cart.cartTotalAmount,
        payment_status: "Pending",
        order_Status: "Pending",
        shipping_method: shipping,
        resi: "",
      },
      item_details: cart.cartItems.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.cartQuantity,
        name: item.name,
      })),
      customer_details: {
        name: name,
        email: email,
        alamat: address,
        imgCheck: imgUrl,
      },
    };

    console.log("Order data before sending:", orderData);

    try {
      const midtransTransaction = await createMidtransTransaction(orderData);
      console.log("Midtrans transaction:", midtransTransaction);

      // Clear cart if Midtrans transaction is successful
      dispatch(clearCart());

      // Redirect user to the payment page
      window.location.href = midtransTransaction.redirect_url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

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
            <Link
              to="/DashboardStore"
              className="flex items-center text-gray-500"
            >
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
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
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
                      <Link to={`/DashboardStore/product/${cartItem.id}`}>
                        <h3 className="font-medium text-[#F0B608]">
                          {cartItem.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className="text-red-500"
                      >
                        Hapus
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
              <div className="mb-4 flex flex-col">
                <label htmlFor="name" className="mb-2 font-medium">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="address" className="mb-2 font-medium">
                  Alamat
                </label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
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
                    onChange={handleShippingChange}
                  />
                  JNE (+Rp. 20000)
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    name="shipping"
                    value="JNT"
                    checked={shipping === "JNT"}
                    onChange={handleShippingChange}
                  />
                  JNT (+Rp. 25000)
                </label>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span className="font-medium">Rp. {cart.cartTotalAmount - (shipping === 'JNE' ? 20000 : 25000)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Shipping</span>
                  <span className="font-medium">Rp. {shipping === 'JNE' ? 20000 : 25000}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span className="font-medium">Rp. {cart.cartTotalAmount}</span>
                </div>
                <p className="mt-1 text-gray-600">
                  Pajak dan pengiriman dihitung di checkout
                </p>
                <button onClick={handleCheckout} className="mt-4 w-full bg-blue-500 text-white font-medium rounded py-2">
                  Check out
                </button>
                <div className="mt-4">
                  <Link
                    to="/DashboardStore"
                    className="flex items-center text-gray-500"
                  >
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
