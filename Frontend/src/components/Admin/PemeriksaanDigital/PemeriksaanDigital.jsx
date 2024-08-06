import React, { useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import logo from "../../../../public/logo.png"; // Adjust the path
import "./StylePemeriksaanDigital.css";

const PemeriksaanDigital = ({ data }) => {
  const PemeriksaanDigitalRef = useRef();

  const handleDownload = () => {
    const element = PemeriksaanDigitalRef.current;

    toPng(element)
      .then((dataUrl) => {
        // Reset the transform after capturing the image
        element.style.transform = "none";
        saveAs(dataUrl, "PemeriksaanDigital.png");
      })
      .catch((err) => {
        console.error("Could not generate image", err);
        // Reset the transform in case of an error
        element.style.transform = "none";
      });
  };

  return (
    <div className="space-y-4 bg-white">
      <div ref={PemeriksaanDigitalRef} className="PemeriksaanDigital-container">
        <header className="header">
          <div className="header-content">
            <img src={logo} alt="Logo" className="logo" />
            <h1>UPTD Wisata Kesehatan Jamu</h1>
          </div>
          <p>Jl. Kebugaran No. 123, Yogyakarta, Indonesia</p>
          <p>Telp: (021) 123-4567 | Email: info@wisatakesehatanjamu.com</p>
        </header>
        <main className="main-content">
          <div className="tanggal">
            <p>
              <span className="bold">Tanggal:</span> {data.date}
            </p>
          </div>
          <div className="mt-2">
            <p>
              <span className="bold">Nama:</span> {data.patientName}
            </p>
            <p>
              <span className="bold">Umur:</span> {data.age}
            </p>
            <p>
              <span className="bold">Alamat:</span> {data.address}
            </p>
            <p>
              <span className="keluhan bold">Keluhan:</span> {data.complaint}
            </p>
          </div>
        </main>
        <footer className="footer text-center items-center justify-center">
          <p className="font-semibold">Terima kasih telah menggunakan layanan kami.</p>
        </footer>
      </div>
      <button onClick={handleDownload} className="btn-download">
        Download as Image
      </button>
    </div>
  );
};

export default PemeriksaanDigital;
