import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Setelah beberapa waktu, atur loading menjadi false untuk menampilkan data aktual
    }, 3000); // Contoh: Menunggu 2 detik sebelum menampilkan data aktual

    return () => clearTimeout(timer); // Membersihkan timer setelah komponen dibongkar
  }, []);

  return (
    <div className="grid align-middle grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {loading ? (
        // Tampilkan skeleton loading jika loading adalah true
        <>
          <SkeletonProductCard />
          <SkeletonProductCard />
          <SkeletonProductCard />
        </>
      ) : (
        // Tampilkan data aktual jika loading adalah false
        products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              img={product.img}
            />
        ))
      )}
    </div>
  );
}

function SkeletonProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 mx-auto my-4 md:mx-2 md:my-2 rounded overflow-hidden shadow-lg bg-white"
    >
      {/* Skeleton for image */}
      <div className="h-52 bg-gray-300"></div>

      {/* Skeleton for product info */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 bg-gray-300 h-6 w-4/5"></div>
        <p className="text-gray-700 text-base bg-gray-300 h-4 w-2/4"></p>
      </div>

      {/* Skeleton for price */}
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base bg-gray-300 h-4 w-1/4"></p>
      </div>
    </motion.div>
  );
}

export default ProductList;
