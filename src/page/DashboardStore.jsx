import React, { useState } from "react";
import Navbar from "../components/LandingPage/Navbar";
import HeaderBottom from "../components/Store/DashboardStore/HeaderBottom";
import ProductList from "../components/Store/DashboardStore/ProductList";
import { produkInovasi } from ".././data/ProdukInovasi";
import Footer from "../components/LandingPage/Footer";
import TabNavigation from "../components/Store/DashboardStore/TabNavigation";
import Hero from "../components/Store/DashboardStore/Hero";

function DashboardStore() {
  const [activeCategory, setActiveCategory] = useState("Semua"); // Default category is "Semua"

  // Dapatkan daftar kategori unik dari produk inovasi
  const uniqueCategories = [
    "Semua",
    ...new Set(produkInovasi.map((product) => product.category)),
  ];

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "Semua"
      ? produkInovasi
      : produkInovasi.filter((product) => product.category === activeCategory);

  return (
    <div>
      <Navbar />
      <HeaderBottom />
      <Hero/>
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
