import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase"; // Sesuaikan path jika diperlukan
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Search from "../Search"; // Sesuaikan path jika diperlukan
import { TbReload } from "react-icons/tb";
import { MdDelete, MdEdit, MdOutlineCreateNewFolder } from "react-icons/md";
import Swal from "sweetalert2";
import { PropagateLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import "tailwindcss/tailwind.css";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(5);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
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

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts(products.filter((product) => product.id !== productId));

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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleProductsPerPageChange = (event) => {
    setProductsPerPage(Number(event.target.value));
    setCurrentPage(0); // Reset to the first page
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

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container mx-auto p-4 rounded-md bg-white">
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} />
        <div className="action flex gap-4">
          <button onClick={fetchProducts} className="bg-[#2dd4bf] flex items-center p-2 rounded-md hover:bg-[#26c2ac]">
            <TbReload className="text-lg" />
            <span className="ml-1">Reload</span>
          </button>
          <Link to="/admin/addProduct">
            <button className="bg-[#2dd4bf] flex items-center p-2 rounded-md hover:bg-[#26c2ac]">
              <MdOutlineCreateNewFolder className="text-lg" />
              <span className="ml-1">Create</span>
            </button>
          </Link>
        </div>
      </div>
      {error && <span className="text-red-500">{error}</span>}
      <div className="overflow-x-auto bg-white p-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-blue-500 text-sm">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">
                  <img src={product.img} alt={product.name} className="h-16" />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2 max-w-xs truncate">{product.desc}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Link to={`/admin/editProduct/${product.id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                        <MdEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination flex justify-center items-center gap-1 mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center"}
          pageClassName={"page-item mx-1"}
          pageLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link px-3 py-1 rounded-md border border-gray-300"}
          activeClassName={"active"}
          activeLinkClassName={"bg-[#2dd4bf] text-white"}
        />
        <select
          value={productsPerPage}
          onChange={handleProductsPerPageChange}
          className="page-link px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-200"
        >
          {[5, 10, 15, 20, 25].map((count) => (
            <option key={count} value={count}>
              {count} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ProductTable;
