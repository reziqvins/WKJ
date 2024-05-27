import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../Redux/CartSlice";

import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
  return (
    <div className="p-8">
      <h2 className="font-medium text-2xl text-center">Keranjang Belanja</h2>
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
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="grid grid-cols-4 gap-2 items-center mt-5  border-t-2" key={cartItem.id}>
                  <div className="flex items-center">
                    <img src={cartItem.img} alt={cartItem.name} className="w-16 h-16 object-cover mr-2 hidden md:block" />
                    <div>
                      <Link to={`/DashboardStore/product/${cartItem.id}`}>
                        <h3 className="font-medium text-[#F0B608]">{cartItem.name}</h3>
                      </Link>
                      <button onClick={() => handleRemoveFromCart(cartItem)} className="text-red-500">Hapus</button>
                    </div>
                  </div>
                  <div className="text-sm">Rp. {cartItem.price}</div>
                  <div className="flex items-center">
                    <button onClick={() => handleDecreaseCart(cartItem)} className="text-gray-500">-</button>
                    <div className="mx-2">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)} className="text-gray-500">+</button>
                  </div>
                  <div className="text-sm">Rp. {cartItem.price * cartItem.cartQuantity}</div>
                </div>
              ))}
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-8">
            <button onClick={handleClearCart} className=" bg-gray-200 text-gray-700 font-medium rounded">Bersihkan Keranjang</button>
            <div className="text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">Rp. {cart.cartTotalAmount}</span>
              </div>
              <p className="mt-1">Pajak dan pengiriman dihitung di checkout</p>
              <button className="mt-4 w-full bg-blue-500 text-white font-medium rounded py-2">Check out</button>
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
      )}
    </div>
  );
};

export default Cart;
