import React from "react";
import { nurse } from "../../assets";

const Layanan = () => {
  return (
    <div className="w-full bg-white lg:px-20 p-5 ">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] md:px-0">
        <div className="flex flex-col justify-center ">
          <h1 className="md:leading-[72px] text-3xl font-bold">
            Layanan <span className="text-[#20B486]">Kami</span>
          </h1>
          <p className="text-lg text-gray-600">
            Kami memberikan pelayanan yang personal dan terfokus pada kebutuhan
            kesehatan Anda.
          </p>

          <div className="grid md:grid-cols-2 gap-4 py-16">
            <div className="px-3 bg-green-200 p-4 rounded-xl">
              <h1 className="text-2xl font-semibold">Konsultasi</h1>
              <p className="text-[#6D737A]">
                Konsultasi dengan dokter ahli untuk mendapatkan rekomendasi
                kesehatan yang tepat.
              </p>
            </div>

            <div className="px-3 bg-[#ffc17a7e] rounded-xl p-4">
              <h1 className="text-2xl font-semibold">Akupuntur</h1>
              <p className="text-[#6D737A]">
                Terapi tradisional dengan menggunakan jarum halus untuk
                merangsang titik-titik tertentu pada tubuh.
              </p>
            </div>

            <div className="px-3 bg-[#ed445863] rounded-xl p-4">
              <h1 className="text-2xl font-semibold">Cafe Jamu</h1>
              <p className="text-[#6D737A]">
                Nikmati minuman sehat dengan ramuan tradisional yang bermanfaat
                untuk kesehatan Anda.
              </p>
            </div>

            <div className="px-3 bg-[#0076fd6c] rounded-xl p-4">
              <h1 className="text-2xl font-semibold">Produk Inovasi</h1>
              <p className="text-[#6D737A]">
                Produk jamu inovatif yang dikembangkan untuk mengatasi
                berbagai masalah kesehatan dengan bahan alami terpilih.
              </p>
            </div>
          </div>
        </div>

        <img src={nurse} className="m-auto md:order-last  order-first" alt="Nurse" />
      </div>
    </div>
  );
};

export default Layanan;
