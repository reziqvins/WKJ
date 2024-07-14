import React, { useState, useEffect } from "react";
import { db } from "../../Firebase"; // Sesuaikan dengan path ke file firebase.js Anda
import { collection, getDocs } from "firebase/firestore"; // Impor fungsi collection dan getDocs

function Layanan2() {
  const [layananData, setLayananData] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const fetchLayananData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "layanan2"));
        const layananArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLayananData(layananArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching layanan data:", error);
        // Handle error here
      }
    };

    fetchLayananData();
  }, []);

  // Tambahkan penanganan jika loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-blue-100 lg:p-20 p-7">
          <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]">
            <img
              src="https://res.cloudinary.com/dap6ohre8/image/upload/v1720975312/WKJ/Chat_bot-bro_1_mery4o.png"
              className="md:order-first order-last  object-cover mx-auto"
              alt="Layanan Image"
            />
            <div className="description content flex flex-col items-center justify-center">
              <h1 className="font-bold text-3xl text-center">Konsultasi <span className="text-[#20B486]">Mudah</span>, dengan <span className="text-[#20B486]">gawai</span> anda</h1>
              <p className="text-center mt-5 text-xl">kini tersedia layanan konsultasi bagi anda yang ingin menjaga kesehatan dengan alami. dapatkan rekomendasi produk jamu sesuai dengan kebutuhan anda.</p>
            </div>
          </div>
    </div>
  );
}

export default Layanan2;
