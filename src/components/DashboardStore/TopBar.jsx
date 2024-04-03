import React from "react";
import { Link } from "react-router-dom";

function TopBar() {
  const confirmLogout = () => {
    Swal.fire({
      title: "Anda yakin ingin keluar?",
      text: "Anda akan keluar dari akun Anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Keluar",
      cancelButtonText: "Tidak",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil fungsi logoutUser di sini jika pengguna menekan "Ya, Keluar"
        logoutUser();
        // Kemudian, arahkan pengguna ke halaman login atau tindakan logout lainnya
        // Misalnya:
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="responsive md:block hidden">
      <div className="flex justify-between items-center p-2 bg-gray-100 text-black text-sm border-b border-gray-300">
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-blue-600">
            Tentang Kami
          </Link>
          <span className="border-l border-gray-400 h-3 my-1 mx-2"></span>
        </div>
        <div className="space-x-4 flex items-center">
          <Link to="/login" className="hover:text-blue-600">
            Masuk
          </Link>
          <span className="border-l border-gray-400 h-3 my-1 mx-2"></span>
          <Link to="/register" className="hover:text-blue-600">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
