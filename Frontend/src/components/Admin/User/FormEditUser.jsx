import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";

function FormEditUser() {
  const { id } = useParams();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setDisplayName(userData.displayName);
          setEmail(userData.email);
          setRole(userData.role);
          setAddress(userData.address);
        } else {
          setError("User not found");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        displayName,
        email,
        role,
        address,
      });
      toast.success("Data Berhasil di Ubah")
    } catch (error) {
      setError(error.message);
      toast.error("Data Gagal di Ubah")
    }
  };

  return (
    <div className="mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl mb-4 font-semibold">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="displayName"
            className="block text-gray-700 font-bold mb-2"
          >
            Nama
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
            Role
          </label>
          <select
            id="role"
            requiredx
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-bold mb-2"
          >
            Alamat
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
        >
          Update User
        </button>
      </form>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

export default FormEditUser;
