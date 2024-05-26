import React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { HiOutlineDatabase } from "react-icons/hi";

const Statistic = () => {
  const cardData = [
    {
      title: "Produk Terjual",
      image:
        "https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png",
      description: "123",
      icon: <BiShoppingBag size={40} className="text-[#FFC107]" />,
    },
    {
      title: "Total Penjualan",
      image:
        "https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png",
      description: "Rp. 1.500.000",
      icon: <AiOutlineDollarCircle size={40} className="text-[#FFC107]" />,
    },
    {
      title: "Produk",
      image:
        "https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png",
      description: "13",
      icon: <HiOutlineDatabase size={40} className="text-[#FFC107]" />,
    },
    {
      title: "Customer",
      image:
        "https://res.cloudinary.com/dap6ohre8/image/upload/v1691563240/Frame_323_un4udh.png",
      description: "30",
      icon: <HiOutlineDatabase size={40} className="text-[#FFC107]" />,
    },
  ];

  return (
    <div className="lg:grid-cols-4 sm:grid grid-cols-1   justify-items-center">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`card-green max-w-xs rounded overflow-hidden mb-5 drop-shadow-md`}
          style={{ padding: "20px", width: "500px" }} // padding dan lebar yang sama
        >
          <div className="shadow-lg bg-[#f0f5e7] rounded overflow-hidden flex p-5">
            <div className="icon mr-5 bg-[#f9f9f9] rounded-md p-2">
              {card.icon}
            </div>
            <div className="px-2 py-2">
              <div className="font-semibold text-[16px] mb-2 text-green-500">
                {card.title}
              </div>
              <p className="text-gray-700 text-xl font-semibold">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistic;
