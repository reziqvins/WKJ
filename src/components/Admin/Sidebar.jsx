import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { VscSignOut } from "react-icons/vsc";
import { MdStorefront, MdClose } from "react-icons/md";
import { RiProductHuntLine, RiCoupon2Fill } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import {
  BiHome,
  BiDollarCircle,
  BiMoneyWithdraw,
  BiStar,
} from "react-icons/bi";
import { BsChatDots, BsHandbag, BsBagX, BsBagPlus } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const confirmLogout = () => {
    Swal.fire({
      title: "Anda yakin ingin keluar?",
      text: "Anda akan keluar dari akun Anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Keluar",
      cancelButtonText: "Tidak",
      cancelButtonColor: "#FFC107",
      confirmButtonColor: "#0DCAF0",
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil fungsi logoutUser di sini jika pengguna menekan "Ya, Keluar"
        // logoutUser();
        // Kemudian, arahkan pengguna ke halaman login atau tindakan logout lainnya
        // Misalnya:
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="sidebar-container flex flex-col bg-[#166534] text-white h-screen">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0  z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        className={`BG-[#14532d] text-gray z-[999] w-[16rem] 
        overflow-hidden md:relative fixed `}
        style={{
          height: "calc(100vh - 3.5rem)", // mengatur tinggi agar mencapai ketinggian penuh layar, dikurangi dengan tinggi header jika ada
        }}
      >
        <div className="flex items-center gap-2.5 font-medium  py-3  mx-3">
          <img
            className="lg:h-[50px] md:h-[50px] sm:hidden"
            src="https://res.cloudinary.com/dap6ohre8/image/upload/v1711775648/WKJ/icons1_zxidth.png"
            alt=""
          />
          <h1>WKJ Shop</h1>
        </div>
        {/* <div className="profile flex p-3 mb-5">
          <img
            className="w-[20%] h-[20%] "
            src="https://res.cloudinary.com/dap6ohre8/image/upload/v1692042539/roady/download_uqwfbi.png"
            alt=""
          />
          <div className="identitas ml-3">
            <p className="text-[14px] text-white">{`Hello, andre`}</p>
            <p className="text-[12px] text-white">{`Joined on March`}</p>
          </div>
          <VscSignOut
            className="cursor-pointer hover:text-[#FFC107]"
            size={25}
            onClick={confirmLogout}
          />
        </div> */}

        <div className="earnings border-b border-slate-300 mb-5 p-3">
          <p className="font-semibold text-[#FFC107] text-[16px]">Earnings</p>
          <p className="font-bold text-[15px]">{`Rp.0`}</p>
        </div>

        <div className="flex flex-col text-[16px]">
          <ul className="whitespace-pre px-2.5 ml-1 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink
                to={"/Dashboard"}
                className={`link flex gap-4 p-4 hover:text-[#FFC107] no-underline ${
                  pathname === "/Dashboard"
                    ? "text-[#F0B608] border-r-[2px] border-[#F0B608]"
                    : ""
                }`}
              >
                <BiHome size={18} className="no-underline min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/Products "}
                className={`link flex gap-4 p-4 hover:text-[#FFC107] no-underline ${
                  pathname === "/Products"
                    ? "text-[#F0B608] border-r-[2px] border-[#F0B608]"
                    : ""
                }`}
              >
                <RiProductHuntLine size={18} className="min-w-max" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/Chats"}
                className={`link flex gap-4 p-4 hover:text-[#FFC107] no-underline ${
                  pathname === "/Chat"
                    ? "text-[#F0B608] border-r-[2px] border-[#F0B608]"
                    : ""
                }`}
              >
                <BsChatDots size={18} className="min-w-max" />
                Chats
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/orders"}
                className={`link flex gap-4 p-4 hover:text-[#FFC107] no-underline ${
                  pathname === "/VenOrders"
                    ? "text-[#F0B608] border-r-[2px] border-[#F0B608]"
                    : ""
                }`}
              >
                <BsBagPlus size={18} className="min-w-max" />
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/Gallery"}
                className={`link flex gap-4 p-4 hover:text-[#FFC107] no-underline ${
                  pathname === "/Gallery"
                    ? "text-[#F0B608] border-r-[2px] border-[#F0B608]"
                    : ""
                }`}
              >
                <MdStorefront size={18} className="min-w-max" />
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/User"}
                className={`link flex gap-4 p-4 hover:text-[#FFC107] no-underline ${
                  pathname === "/USer"
                    ? "text-[#F0B608] border-r-[2px] border-[#F0B608]"
                    : ""
                }`}
              >
                <SlSettings size={18} className="min-w-max" />
                Pengguna
              </NavLink>
            </li>
          </ul>
          <div className="border-t flex p-3 align-bottom  sm:hidden ">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <FiMoreVertical size={20} />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        onClick={() => {
          setOpen(!open);
        }}
        animate={
          open
            ? {
                x: 0,
                y: 0,
                rotate: 0,
              }
            : {
                x: -10,
                y: -200,
                rotate: 180,
              }
        }
        transition={{ duration: 0 }}
        className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer py-4"
      >
        <MdClose size={25} />
      </motion.div>

      <div className="m-3 md:hidden my-auto" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
