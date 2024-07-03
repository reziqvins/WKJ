import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase"; // Sesuaikan path jika diperlukan
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Search from "../Search"; // Sesuaikan path jika diperlukan
import { TbReload } from "react-icons/tb";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Swal from "sweetalert2";
import { PropagateLoader } from "react-spinners";

function RecentProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data produk dari Firestore
  const fetchProducts = async () => {
    try {
      const productsQuery = query(
        collection(db, "products"),
        limit(5)
      );
      const querySnapshot = await getDocs(productsQuery);
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
      setLoading(false);
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
        )
        .slice(0, 5); // Limit to 5 search results
      setProducts(filteredProducts);
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
          <Link to="/admin/addProduct">
            <button className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-lg  md:mt-0">
              <MdOutlineCreateNewFolder className="text-lg mt-1" />
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
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">
                  <img src={product.img} alt={product.name} className="h-16 w-16 object-cover" />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentProduct;
