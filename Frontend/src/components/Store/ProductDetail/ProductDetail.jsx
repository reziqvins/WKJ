import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import HeaderBottom from "../DashboardStore/HeaderBottom";
import Navbar from "../../LandingPage/Navbar";
import Footer from "../../LandingPage/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { PropagateLoader } from "react-spinners";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Menambahkan state loading

  // Ambil detail produk dari Firebase saat komponen dimuat pertama kali
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          setProduct(null);
        }
        setLoading(false); // Setelah fetch selesai, loading diubah menjadi false
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
        setLoading(false); // Setelah fetch selesai, loading diubah menjadi false
      }
    };

    fetchProduct();
  }, [id]);

  // Tampilkan pesan "Product not found" jika loading selesai dan produk tidak ditemukan
  if (!loading && !product) {
    return (
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2>Product not found</h2>
        </div>
      </div>
    );
  }

  // Tampilkan loading spinner atau pesan selama data sedang dimuat
  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="max-w-4xl min-h-screen flex justify-center items-center mx-auto px-4 py-8">
        <PropagateLoader color="#36d7b7" />
        </div>
      </div>
    );
  }

  // Jika produk ditemukan, tampilkan detail produk
  return (
    <div>
      <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
        <Navbar />
        <HeaderBottom />
        <div className="max-w-container mx-auto lg:mt-10 p-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
            <div className="h-full xl:col-span-2">
              <img
                className="w-full h-96 object-cover"
                src={product.img}
                alt={product.img}
              />
            </div>
            <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
              <ProductInfo productInfo={product} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
