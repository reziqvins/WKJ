import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import FormPemeriksaan from '../PemeriksaanDigital/formPemeriksaan';

import { FaWpforms } from 'react-icons/fa';

const AdminNavbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='navbar flex items-center justify-between bg-[#32584c] p-2 text-white'>
      <span className="logo font-bold">Konsultasi</span>
      <div className="tooltip tooltip-left" data-tip="Form Pemeriksaan Digital">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-[#32584c] py-1 px-3 rounded-md hover:bg-[#ebebeb] transition-colors"
        >
          <FaWpforms />
        </button>
      </div>
      {isModalOpen && (
        <div className="modal modal-open text-black">
          <div className="modal-box">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <FormPemeriksaan closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
