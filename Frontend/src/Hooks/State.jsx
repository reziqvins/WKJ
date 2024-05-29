import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase"; // Sesuaikan path jika diperlukan
import Swal from "sweetalert2";

const State = () => {
    //Get Produk
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProduct = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleSearch = async (searchTerm) => {
    setLoading(true); // Set loading to true when searching starts
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
    } finally {
      setLoading(false); // Set loading to false when searching ends
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
        timer: 1500,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  add

  return { products, loading, error, fetchProducts, handleSearch, handleDeleteProduct };
};

export default State;
