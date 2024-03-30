import { useState } from "react";
import "./App.css";
import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import Rating from "./components/LandingPage/Ratting";
import ProdukInovasi from "./components/LandingPage/ProdukInovasi";
import Layanan from "./components/LandingPage/Layanan";
import Layanan2 from "./components/LandingPage/Layanan2";
import Galeri from "./components/LandingPage/Galeri";
import IklanRegister from "./components/LandingPage/IklanRegister";
import Footer from "./components/LandingPage/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Rating />
      <ProdukInovasi />
      <Layanan />
      <Layanan2 />
      <Galeri />
      <IklanRegister />
      <Footer />
    </div>
  );
}

export default App;
