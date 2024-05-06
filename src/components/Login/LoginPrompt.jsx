import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";

const LoginPrompt = () => {
  return (
    <div 
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}>
        <Navbar/>
        <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold mb-4">Anda belum masuk</h2>
      <p className="text-gray-600 mb-8">Silakan masuk untuk melanjutkan.</p>
      <Link to="/SignIn" className="bg-[#20B486] text-white px-4 py-2 rounded-md shadow hover:bg-[#429379]">
        Masuk
      </Link>
    </div>
    </div>
  );
};

export default LoginPrompt;
