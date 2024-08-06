// src/components/FormEtalase.jsx
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { db } from '../../../Firebase';

const FormEtalase = () => {
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {e
      await addDoc(collection(db, 'etalase'), { category });
      Swal.fire({
        title: 'Berhasil tambah etalase',
        text: 'Kategori berhasil ditambahkan!',
        icon: 'success'
      });
      setCategory('');
    } catch (error) {
      console.error('Error menambahkan dokumen: ', error);
      Swal.fire({
        title: 'Error',
        text: 'Terjadi kesalahan saat menambahkan kategori.',
        icon: 'error'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full mb-6">
      <div className="flex items-center space-x-4">
        <label htmlFor="category" className="text-lg font-semibold w-1/4">Kategori</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Masukkan kategori"
          required
        />
        <button type="submit" className="btn btn-primary w-1/4">Kirim</button>
      </div>
    </form>
  );
};

export default FormEtalase;
