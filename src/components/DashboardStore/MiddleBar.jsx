import React from "react";
import {
  FiBell,
  FiHeart,
  FiShoppingCart,
  FiSearch,
  FiMenu,
} from "react-icons/fi"; // Impor ikon pencarian
import { Link } from "react-router-dom";
import { icons } from "../../assets";

function MiddleBar() {
  return (
    <div className="bg-white text-black text-sm border-b border-gray-300 ">
      <div className="responsif-notif lg:hidden">
        <div className="icon-notif py-2 mt-1 border-b border-gray-300 flex justify-end ">
          <div className="icon group relative mr-4">
            <button className="hover:text-blue-600 relative">
              <FiBell className="w-7 h-7 mx-2" />
              <span className="ml-auto bg-blue-600 text-white px-2 py-0.5 rounded-sm absolute -top-2 -right-2">
                3
              </span>
            </button>
            <div className="hidden group-hover:block absolute right-0 mt-1.5 border border-gray-300 rounded p-2 w-72 shadow-md bg-white z-10">
              {/* Data yang ingin ditampilkan saat hover pada ikon Bell */}
              <p className="text-sm font-semibold mb-1">
                Notifikasi Baru Diterima
              </p>
              <p className="text-xs">Notifikasi 1</p>
              <p className="text-xs">Notifikasi 2</p>
              <Link
                to="/notif"
                className="hover:text-blue-600 text-center mt-2"
              >
                Lihat Semuanya
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="responsiv lg:block hidden p-8 ">
        <div className="header-wrapper flex justify-between ">
          <div className="header-items-left flex items-center">
            <Link to="/">
              <img
                src={icons}
                alt="wkj Logo"
                className="w-20 h-15 md:block hidden"
              />
            </Link>
            {/* Ubah ukuran sesuai kebutuhan */}
            <div className="md:block hidden">
              {/* Konten bagian tengah, termasuk input pencarian dan ikon */}
              <div className="relative border border-gray-500">
                <div className="search">
                  {/* Tambahkan kelas "md:hidden" agar elemen ini disembunyikan di bawah lebar 1024px */}
                  <select className="bg-gray-300 p-2 text-black hover:text-blue-600">
                    <option value="all">Semua Kategori</option>
                    <option value="rumahtangga">Rumah Tangga</option>
                    <option value="fwanita">Fashion Wanita</option>
                    <option value="ibudananak">Ibu dan Anak</option>
                  </select>

                  {/* Tambahkan kelas "md:hidden" agar elemen ini disembunyikan di bawah lebar 1024px */}
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="bg-gray-300 py-2 px-2 pr-10 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="icon-search">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <button className="hover:text-blue-600">
                      <FiSearch className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="icon md:block hidden">
            <div className="flex items-center space-x-2 headr-items-right justify-end  ">
              <div className="icon group relative">
                <button className="hover:text-blue-600 relative">
                  <FiShoppingCart className="w-7 h-7 mx-4" />
                  <span className="ml-auto bg-blue-600 text-white px-2 py-0.5 rounded-sm absolute -top-2 -right-2 mr-2">
                    2
                  </span>
                </button>
                <div className="hidden group-hover:block absolute right-0 mt-1.5 bg-white border border-gray-300 rounded p-2 w-72 shadow-md z-10">
                  <div className="flex flex-col">
                    {/* Data yang ingin ditampilkan saat hover pada ikon Shopping Cart */}
                    <p className="text-sm font-semibold mb-1">
                      Barang Baru Ditambahkan ke Keranjang
                    </p>
                    <p className="text-xs">Barang di Keranjang 1</p>
                    <p className="text-xs">Barang di Keranjang 2</p>
                    <div className="flex justify-center mt-2">
                      <Link
                        to="/shop"
                        className="hover:text-blue-600 text-center "
                      >
                        Lihat Semuanya
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hide-mobile lg:hidden ">
        <div className="header-wrapper flex justify-between  py-4">
          <div className="header-items-left flex items-center">
            <div className="flex items-center space-x-2 headr-items-right justify-end ">
              <div className="burger w-1/4 bg-transparent rounded-sm flex items-center justify-center">
                <div className="drawer">
                  <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label
                      htmlFor="my-drawer"
                      className="btn btn-primary drawer-button bg-transparent border-transparent hover:bg-transparent"
                    >
                      <FiMenu className="w-6 h-6 text-black " />
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                      {/* Sidebar content here */}
                      <li>
                        <a>Sidebar Item 1</a>
                      </li>
                      <li>
                        <a>Sidebar Item 2</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <button className="hover:text-blue-600">
                                    <FiMenu className="w-6 h-6 text-black hover:text-blue-600" />
                                </button> */}
              </div>
            </div>
          </div>
          <div className="midle">
            <img src={icons} alt="WKJ Logo" className="w-20 h-10" />{" "}
            {/* Ubah ukuran sesuai kebutuhan */}
          </div>
          <div className="relative borde pt-2 mt-2">
            <div className="icon-search ">
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button className="hover:text-blue-600">
                  <FiSearch className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleBar;
