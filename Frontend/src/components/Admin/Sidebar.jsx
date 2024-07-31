import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdInbox,
  MdAccountCircle,
  MdSettings,
} from "react-icons/md";
import { IoIosArrowDropleftCircle, IoMdArrowDropdown } from "react-icons/io";
import { FaBox, FaCartArrowDown } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { MdHomeRepairService } from "react-icons/md";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [landingPageOpen, setLandingPageOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex bg-">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
      >
        <button
          className={`absolute cursor-pointer -right-3 top-9 w-7 text-3xl text-white border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >
          <IoIosArrowDropleftCircle />
        </button>
        <div className="flex gap-x-4 items-center">
          <img
            src="https://res.cloudinary.com/dap6ohre8/image/upload/v1711775648/WKJ/icons1_zxidth.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            } w-[20%]`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            WKJ Admin
          </h1>
        </div>
        <ul className="pt-6">
          <Link
            to="/admin"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-gray-300 text-sm items-center gap-x-4 mt-2"
          >
            <li
              className={`flex items-center gap-x-4 ${
                pathname === "/admin"
                  ? "text-[#F0B608] border-r-[2px]"
                  : ""
              }`}
            >
              <MdDashboard className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </span>
            </li>
          </Link>
          <Link
            to="/admin/konsultasi"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-gray-300 text-sm items-center gap-x-4 mt-2"
          >
            <li
              className={`flex items-center gap-x-4 ${
                pathname === "/admin/konsultasi" ? "text-[#F0B608]" : ""
              }`}
            >
              <MdInbox className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Inbox
              </span>
            </li>
          </Link>
          <Link
            to="/admin/products"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-gray-300 text-sm items-center gap-x-4 mt-9"
          >
            <li
              className={`flex items-center gap-x-4 ${
                pathname === "/admin/products" ? "text-[#F0B608]" : ""
              }`}
            >
              <FaBox className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Produk
              </span>
            </li>
          </Link>
          <Link
            to="/admin/orders"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-gray-300 text-sm items-center gap-x-4 mt-2"
          >
            <li
              className={`flex items-center gap-x-4 ${
                pathname === "/admin/orders" ? "text-[#F0B608]" : ""
              }`}
            >
              <FaCartArrowDown className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Orders
              </span>
            </li>
          </Link>

          <div className="flex flex-col">
            
                <Link
                  to="/admin/landingPage/gallery"
                  className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-gray-300 text-sm items-center gap-x-4 mt-2"
                >
                  <li
                    className={`flex items-center gap-x-4 ${
                      pathname === "/admin/landingPage/gallery" ? "text-[#F0B608]" : ""
                    }`}
                  >
                    <GrGallery className="text-2xl" />
                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                      Gallery
                    </span>
                  </li>
                </Link>
          </div>

          <Link
            to="/admin/user"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-gray-300 text-sm items-center gap-x-4 mt-9"
          >
            <li
              className={`flex items-center gap-x-4 ${
                pathname === "/admin/user" ? "text-[#F0B608]" : ""
              }`}
            >
              <MdAccountCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Pengguna
              </span>
            </li>
          </Link>
          <Link
            to="/admin/setting"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-gray-300 text-sm items-center gap-x-4 mt-2"
          >
            <li
              className={`flex items-center gap-x-4 ${
                pathname === "/admin/setting" ? "text-[#F0B608]" : ""
              }`}
            >
              <MdSettings className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Setting
              </span>
            </li>
          </Link>
          <Link
            to="/admin/toKonsul"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white hover:text-[#F0B608] text-[#166534] text-sm items-center gap-x-4 mt-2"
          >
            <li
              className={`flex items-center gap-x-4 ${
                pathname === "/admin/toKonsul" ? "text-[#F0B608]" : ""
              }`}
            >
              <MdSettings className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Setting
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
