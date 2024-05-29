import React from "react";
import Sidebar from "../components/Konsultasi/Sidebar";
import Chat from "../components/Konsultasi/Chat";
import Navbar from "../components/LandingPage/Navbar";

function KonsultasiPage() {
  return (
    <div
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}
    >
      <Navbar />
      <div className="home h-screen flex items-center justify-center mt-[-30px]">
        <div className="container border border-white rounded-lg w-[65%] h-[80%] flex overflow-hidden">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default KonsultasiPage;
