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
      {layananData &&
        layananData.map((item) => (
          <div key={item.id} className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] ">
            <img
              src={item.imageUrl}
              className="md:order-first order-last w-80 h-80 object-cover mx-auto"
              alt="Layanan Image"
            />
            <div className="content flex flex-col justify-start">
              {/* Gunakan dangerouslySetInnerHTML untuk merender HTML */}
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Layanan2;
