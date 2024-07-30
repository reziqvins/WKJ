import React, { useEffect } from "react";
import Sidebar from "../components/Konsultasi/Sidebar";
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
