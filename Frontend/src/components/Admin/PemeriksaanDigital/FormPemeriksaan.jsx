import React, { useState } from "react";
import PemeriksaanDigital from './PemeriksaanDigital'; // Adjust the path

const FormPemeriksaan = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    date: "",
    complaint: "",
    doctorName: "",
    patientName: "",
    age: "",
    address: "",
  });

  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div>
      {!showResult ? (
        <div className="flex justify-center text-sm items-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-3 text-center">
              Form Pemeriksaan
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control mb-1">
                <label htmlFor="date" className="label">
                  Tanggal
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-1">
                <label htmlFor="doctorName" className="label">
                  Nama Dokter
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="form-control mb-1">
              <label htmlFor="complaint" className="label">
                Keluhan
              </label>
              <textarea
                id="complaint"
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-1">
              <label htmlFor="patientName" className="label">
                Nama Pasien
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-1">
              <label htmlFor="age" className="label">
                Umur
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-1">
              <label htmlFor="address" className="label">
                Alamat
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Generate Invoice
            </button>
          </form>
        </div>
      ) : (
        <PemeriksaanDigital data={formData} />
      )}
    </div>
  );
};

export default FormPemeriksaan;
