import React from "react";
import { adRegister } from "../../assets";
import { Link } from "react-router-dom";

const IklanRegister = () => {
  return (
    <div className="w-full bg-[#E9F8F3] py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] items-center  px-4 md:px-0">
        <img src={adRegister} className="w-[350px] mx-auto" />

        <div>
          <h1 className="py-2  text-3xl font-semibold">
            Beli Produk{" "}
            <span className="text-[#20B486]">Wisata Kesehatan Jamu</span> dengan
            mudah{" "}
          </h1>
          <p className="py-2 text-lg text-gray-600">
            Mulai dengan Mendaftar dengan gratis
          </p>
          <Link to="/SignUp"><button  className="max-[780px]:w-full my-4 px-8 py-5 rounded-md bg-[#20B486] text-white font-bold">
            Daftar Disini
          </button></Link>
          
        </div>
      </div>
    </div>
  );
};

export default IklanRegister;
