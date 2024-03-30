import React, { useState } from "react";
import { icons, hamburgerMenu, close } from "../../assets";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  return (
    <div className="w-full h-[80px] bg-[#E9F8F3B2] border-b py-6">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img src={icons} className="h-[60px]" />

        <div className="hidden md:flex">
          <ul className="flex gap-4">
            <li>Beranda</li>
            <li>Toko</li>
          </ul>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <li className="p-4 hover:bg-gray-100">Home</li>
          <li className="p-4 hover:bg-gray-100">About</li>
          <li className="p-4 hover:bg-gray-100">Support</li>
          <li className="p-4 hover:bg-gray-100">Platform</li>
          <li className="p-4 hover:bg-gray-100">Pricing</li>
          {/* <div className="flex flex-col my-4 gap-4">
            <button className="border border-[20B486] flex justify-center items-center  bg-transparent  px-6 gap-2 py-4">
              <img src={lock} />
              Login
            </button>
            <button className="px-8 py-5 rounded-md bg-[#20B486] text-white font-bold">
              Sign Up For Free
            </button>
          </div> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
