// ProductInfo.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice"; // Perubahan di sini

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();


  const handleAddToCart = (product) => {
    const { createdAt, updatedAt, ...productWithoutTimestamps } = product; // Menghapus properti `createdAt` dan `updatedAt` sebelum menambahkan produk ke keranjang
  
    if (productWithoutTimestamps.stock > 0) { // Pastikan produk tersedia
      dispatch(addToCart(productWithoutTimestamps));
    } else {
      alert("Product is out of stock");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-2xl font-semibold">Rp. {productInfo.price}</p>
      <hr />
      <p className="text-base text-gray-600">{productInfo.desc}</p>
      <p className="text-base text-green-600 font-medium">Stok: {productInfo.stock}</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Kategori:</span> {productInfo.categ}
      </p>
      <button
        onClick={() => handleAddToCart(productInfo)} // Aktifkan onClick handler
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
