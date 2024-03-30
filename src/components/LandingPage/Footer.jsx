import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-white py-24">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-3 max-[780px]:grid-cols-1  gap-8 max-w-[600px]  px-4 md:px-0 ">
        <div className="">
          <h3 className="text-2xl font-bold">Kontak Kami</h3>
          <h3 className="py-2 text-[#6D737A]">Telepon : 082220360348</h3>
          <h3 className="py-2 text-[#6D737A]">
            V4WJ+FR2, Jl. Raya Moga-Guci, Kebonagung, Kec. Balapulang, <br />
            Kabupaten Tegal, Jawa Tengah 52464
          </h3>
          <h3 className="py-2 text-[#363A3D]">Email: example@mail.com</h3>
          <div className="flex gap-4 py-4">
            <div className="p-4 bg-[#E9F8F3] rounded-xl">
              <FaFacebookF size={25} style={{ color: "#4DC39E" }} />
            </div>
            <div className="p-4 bg-[#E9F8F3] rounded-xl">
              <FaInstagram size={25} style={{ color: "#4DC39E" }} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold">Layanan</h3>
          <ul className="py-6 text-[#6D737A]">
            <li className="py-2">Konsultasi</li>
            <li className="py-2">Akupuntur</li>
            <li className="py-2">Cafe Jamu</li>
            <li className="py-2">Produk Inovasi</li>
          </ul>
        </div>

        <div className="maps">
          <h1 className="text-2xl font-bold">Lokasi Wisata Kesehatan Jamu</h1>
          <iframe
            width="500"
            height="250"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=UPTD%20Wisata%20Kesehatan%20Jamu+(UPTD%20Wisata%20Kesehatan%20Jamu)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps vehicle tracker</a>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;
