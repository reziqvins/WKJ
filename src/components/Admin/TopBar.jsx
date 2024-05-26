import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { VscSignOut } from "react-icons/vsc";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";

const TopBar = ({ title }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleLanguage = () => {
    setLanguageOpen(!languageOpen);
  };

  return (
    <div className="">
      <div className="flex md:hidden justify-around">
        <img
          src="https://res.cloudinary.com/dap6ohre8/image/upload/v1711775648/WKJ/icons1_zxidth.png"
          className="h-[50px] ml-12"
          alt=""
        />
        <button>
          <VscSignOut className="hover:text-yellow-400" size={25} />
        </button>
      </div>
      <div className="sm:flex items-center justify-between p-3 hidden sm:block text-base-300">
        <h1 className="text-[20px] font-bold text-black">{title}</h1>
        <Link
          className="flex justify-between text-black text-[14px] font-semibold px-4 py-2 rounded-lg hover:text-yellow-400"
          to={"/DashboardStore"}
        >
          View Your Store <RxExit className="mt-1 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
