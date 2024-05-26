import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import GaleriCard from "./GaleriCard";
import { db } from "../../Firebase"; // Sesuaikan path jika perlu
import { collection, getDocs } from "firebase/firestore";

const Galeri = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGalleryItems(items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full bg-white md:px-32 p-4">
      <div className="md:max-w-[1480px] m-auto max-w-[800px] md:px-0">
        <div className="py-4">
          <h1 className="py-3 text-3xl font-bold">
            Galeri <span className="text-[#20B486]">WKJ</span>
          </h1>
          <p className="text-[#6D737A]">
            Kegiatan yang telah dilakukan di Wisata Kesehatan Jamu
          </p>
        </div>

        <Slider {...settings}>
          {galleryItems.map(item => (
            <GaleriCard key={item.id} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Galeri;
