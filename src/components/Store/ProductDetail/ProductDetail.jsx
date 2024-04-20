import React from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import HeaderBottom from "../DashboardStore/HeaderBottom";
import Navbar from "../../LandingPage/Navbar";
import Footer from "../../LandingPage/Footer";

function ProductDetail({ products }) {
  const { id } = useParams();
  let product = null;

  // Loop melalui daftar produk untuk mencari produk dengan ID yang sesuai
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === parseInt(id)) {
      product = products[i];
      break; // Hentikan loop jika produk ditemukan
    }
  }

  // Jika produk tidak ditemukan, tampilkan pesan
  if (!product) {
    return (
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2>Product not found</h2>
        </div>
      </div>
    );
  }

  // Jika produk ditemukan, tampilkan detail produk
  return (
    <div className="">
      <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
        <Navbar />
        <HeaderBottom />
        <div className="max-w-container mx-auto lg:mt-10 p-4">
          {/* <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div> */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
            <div className="h-full xl:col-span-2">
              <img
                className="w-full h-96 object-cover"
                src={product.linkImg}
                alt={product.linkImg}
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
