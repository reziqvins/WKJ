import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

function Profil() {
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || "");
      setPhoneNumber(currentUser.phoneNumber || "");
      setAddress(currentUser.address || "");
      setPostalCode(currentUser.postalCode || "");
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile({
        displayName: name,
        phoneNumber: phoneNumber,
        address: address,
        postalCode: postalCode,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen py-10 p-4  rounded-lg"
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}
    >
      {currentUser && (
        <div className="flex flex-col  md:flex-row bg-gray-100 my-auto  rounded-lg">
          <div className="w-full md:w-1/3 md:py-8 bg-green-100 p-12 flex flex-col items-center shadow-md rounded-l-lg">
            <div className="relative">
              <img
                src={currentUser.photoURL || "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12h.01M12 15h.01M9 12h.01M12 9h.01M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
                  ></path>
                </svg>
              </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold">
              {currentUser.displayName}
            </h2>
            <p className="mt-1 text-gray-600">{currentUser.role}</p>
            <div className="mt-6 flex text-left w-full">
              <div className="kiri w-[30%]">
                <p>Email</p>
                <p>No Hp</p>
                <p>Alamat</p>
                <p>Kode Pos</p>
              </div>
              <div className="kanan">
                <p>: {currentUser.email}</p>
                <p>: {currentUser.phoneNumber}</p>
                <p>: {currentUser.address}</p>
                <p>: {currentUser.postalCode}</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 p-6 md:py-8 bg-white shadow-md rounded-lg">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold">Profil Akun</h2>
            </div>
            <form className="space-y-4" onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600">Nama</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Nomor Telepon</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600">Alamat</label>
                <textarea
                  className="w-full border rounded-lg p-2"
                  rows="4" // Sesuaikan jumlah baris yang diinginkan
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-600">Kode Pos</label>
                <input
                  type="text"
                  className="w-1/2 border rounded-lg p-2"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profil;
