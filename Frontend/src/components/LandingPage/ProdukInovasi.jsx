import React, { useEffect, useState } from "react";
import Card from "./Card";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase"; // Sesuaikan path jika perlu

const ProdukInovasi = () => {
  const [produkInovasi, setProdukInovasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProdukInovasi(productsArray);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <div className="w-full bg-[#E9F8F3B2] md:px-32">
      <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <div className="py-4">
          <h1 className="py-3 text-3xl font-bold">
            Produk <span className="text-[#20B486]">Inovasi</span>
          </h1>
          <p className="text-[#6D737A]">
          Solusi terbaru yang dikembangkan untuk mengatasi berbagai masalah kesehatan secara efektif dan praktis
          </p>
        </div>

        <Slider {...settings} className="px-5">
          {produkInovasi.map((produk) => (
            <div key={produk.id}>
              <Card produk={produk} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <a className="py-3 flex" href="/DashboardStore">
          Lihat Selengkatnya..
        </a>
      </div>
    </div>
  );
};

export default ProdukInovasi;
