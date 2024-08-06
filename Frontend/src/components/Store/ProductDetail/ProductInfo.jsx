import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice";
import { AuthContext } from "../../../Context/AuthContext"; 
import Swal from "sweetalert2";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Diperlukan',
        text: 'Silahkan Login Untuk menambah ke keranjang',
      });
      return;
    }

    const { createdAt, updatedAt, ...productWithoutTimestamps } = product;
  
    if (productWithoutTimestamps.stock > 0) {
      dispatch(addToCart(productWithoutTimestamps));
    } else {
      alert("Produk telah habis");
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
        onClick={() => handleAddToCart(productInfo)}
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
      >
        Tambah Ke keranjang
      </button>
    </div>
  );
};

export default ProductInfo;
