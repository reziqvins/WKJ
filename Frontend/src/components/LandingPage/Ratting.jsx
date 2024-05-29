import React from "react";
import { FaStar } from "react-icons/fa";
import { companyLogo1 } from "../../assets";

const Rating = () => {
  return (
    <div className="w-full bg-blue-100 py-[50px]">
      <div className="md:max-w-[1480px] m-auto max-w-[600px] md:px-0">
        <div className="flex justify-center py-8 md:gap-8 ">
          <div className="flex justify-center h-14">
            <img src={companyLogo1} />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-[#536E96]">
          Kepercayaan dan Kepuasan Pelanggan: Diukur oleh Rating Tinggi Kami di
          Google Maps.
        </h1>
        <p className="text-center  text-[#536E96] text-xl">
          Yang mendapatkan rating{" "}
        </p>
        <p className="flex justify-center text-yellow-400 text-[40px]">
          <FaStar className="mt-2" /> 4.3
        </p>
      </div>
    </div>
  );
};

export default Rating;
