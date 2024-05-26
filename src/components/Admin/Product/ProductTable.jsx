import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase"; // Sesuaikan path jika diperlukan
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Search from "../Search"; // Sesuaikan path jika diperlukan
import { TbReload } from "react-icons/tb";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fungsi untuk mengambil data produk dari Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    } catch (error) {
      setError(error.message);
    }
  };

  // Ambil data produk saat komponen dimuat pertama kali
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle pencarian produk
  const handleSearch = async (searchTerm) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const filteredProducts = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setProducts(filteredProducts);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle delete produk
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      // Hapus produk dari state setelah dihapus dari database
      setProducts(products.filter(product => product.id !== productId));
      
      Swal.fire({
        icon: 'success',
        title: 'Produk Berhasil Terhapus!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 rounded-md bg-white">
      <div className="flex justify-between">
        <Search onSearch={handleSearch} />
        <div className="action flex gap-8">
         <button onClick={fetchProducts} className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-md  md:mt-0">
            <TbReload className="text-lg mt-1" />
            Reload
          </button>
          <Link to="/addProduct">
            <button className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-lg  md:mt-0">
              <TbReload className="text-lg mt-1" />
              Create
            </button>
          </Link>
        </div>
      </div>
      {error && <span className="text-red-500">{error}</span>}
      <div className="overflow-x-auto bg-white p-4">
        <table className="table w-full">
          <thead>
            <tr className="text-blue-500 text-[14px]">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">
                  <img src={product.img} alt={product.name} className="h-16" />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2 ">{product.desc}</td>
                <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link to={`/editProduct/${product.id}`}><button className="bg-blue-500 text-white px-2 py-1 rounded-md"><MdEdit /></button></Link>
                      <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded-md"><MdDelete /></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
