import React, { useEffect } from "react";
import Chat from "../components/Konsultasi/Chat";
import Navbar from "../components/LandingPage/Navbar";
import Swal from 'sweetalert2';

function KonsultasiPage() {
  useEffect(() => {
    Swal.fire({
      title: 'Jam Kerja WKJ',
      html: `
        <table style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Hari</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Jam Kerja</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Senin - Kamis</td>
              <td style="border: 1px solid #ddd; padding: 8px;">08:00 - 16:00</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Jumat</td>
              <td style="border: 1px solid #ddd; padding: 8px;">08:00 - 11:00</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Sabtu</td>
              <td style="border: 1px solid #ddd; padding: 8px;">08:00 - 13:00</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 10px;">Pesan anda akan dibalas pada jam kerja WKJ.</p>
      `,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }, []);

  return (
    <div
      className="bg-gradient-to-br from-[#b6d7a8] to-[#6aa84f] min-h-screen flex flex-col p-0 m-0 text-sm md:text-base"
    >
      <Navbar />
      <div
        className="container border border-white rounded-lg flex overflow-hidden mx-auto my-0"
        style={{ 
          height: 'calc(100vh - 60px)', // Adjust based on Navbar height
          width: '100vw',
          maxWidth: '1200px', // Optional, to limit maximum width
          backgroundColor: 'transparent' // Ensures background gradient shows through
        }}
      >
        <Chat />
      </div>
    </div>
  );
}

export default KonsultasiPage;
