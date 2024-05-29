// DashboardStore.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/LandingPage/Navbar";
import HeaderBottom from "../components/Store/DashboardStore/HeaderBottom";
import ProductList from "../components/Store/DashboardStore/ProductList";
import Footer from "../components/LandingPage/Footer";
import TabNavigation from "../components/Store/DashboardStore/TabNavigation";
import Hero from "../components/Store/DashboardStore/Hero";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase"; // Sesuaikan path jika perlu

function DashboardStore() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua"); // Default category is "Semua"

  // Ambil data produk dari Firestore
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

  // Dapatkan daftar kategori unik dari produk
  const uniqueCategories = [
    "Semua",
    ...new Set(products.map((product) => product.categ)),
  ];

  // Filter produk berdasarkan kategori yang aktif
  const filteredProducts =
    activeCategory === "Semua"
      ? products
      : products.filter((product) => product.categ === activeCategory);

  return (
    <div>
      <Navbar />
      <HeaderBottom />
      <Hero />
      <div className="mx-auto max-w-4xl">
        {/* Navigasi Tab */}
        <TabNavigation
          categories={uniqueCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Daftar Produk */}
        <ProductList products={filteredProducts} />
      </div>
      <Footer />
    </div>
  );
}

export default DashboardStore;
