import React, { useContext, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import KonsultasiPage from '../../page/KonsultasiPage';
import LoginPrompt from '../Auth/Login/LoginPrompt';

const KonsultasiPageWrapper = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === '/Konsultasi') {
      showWorkingHoursAlert();
    }
  }, [location.pathname]);

  const showWorkingHoursAlert = () => {
    const today = new Date();
    const day = today.getDay();
    const hour = today.getHours();

    let isWorkingHours = false;

    if (day >= 1 && day <= 4) {
      // Monday to Thursday: 8 AM to 4 PM
      if (hour >= 8 && hour < 16) {
        isWorkingHours = true;
      }
    } else if (day === 5) {
      // Friday: 8 AM to 11 AM
      if (hour >= 8 && hour < 11) {
        isWorkingHours = true;
      }
    } else if (day === 6) {
      // Saturday: 8 AM to 1 PM
      if (hour >= 8 && hour < 13) {
        isWorkingHours = true;
      }
    }

    if (!isWorkingHours) {
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
    }
  };

  return currentUser ? <KonsultasiPage /> : <LoginPrompt />;
};

export default KonsultasiPageWrapper;
