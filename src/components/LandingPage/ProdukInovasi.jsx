import React from "react";
import Card from "./Card";
import Slider from "react-slick";
import { produkInovasi } from "../../data/ProdukInovasi.js";

const ProdukInovasi = () => {
  var settings = {
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
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <div className="w-full bg-[#E9F8F3B2] md:px-32">
      <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0">
        <div className="py-4">
          <h1 className="py-3 text-3xl font-bold">
            Produk <span className="text-[#20B486]">Inovasi</span>
          </h1>
          <p className="text-[#6D737A]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <Slider {...settings} className="px-5">
          {produkInovasi.map((produk, i) => (
            <div key={i}>
              <Card produk={produk} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0">
        <a className="py-3  flex" href="">
          Lihat Selengkatnya..
        </a>
      </div>
    </div>
  );
};

export default ProdukInovasi;
