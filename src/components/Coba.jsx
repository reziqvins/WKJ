import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

function Coba() {
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setPhoneNumber(currentUser.phoneNumber || '');
      setAddress(currentUser.address || '');
      setPostalCode(currentUser.postalCode || '');
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const updatedProfile = {
      displayName: name,
      phoneNumber,
      address,
      postalCode,
    };

    try {
      await updateUserProfile(updatedProfile);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div
      className="min-h-screen py-12"
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}
    >
      <div className="container mx-auto">
        {currentUser && (
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-[#E9F8F3B2] rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full md:w-1/3 bg-green-400 p-6 flex flex-col items-center shadow-md rounded-l-lg">
              <div className="relative">
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
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
              <h2 className="mt-4 text-xl font-semibold">{currentUser.displayName}</h2>
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

            <div className="w-full md:w-2/3 p-6 bg-white shadow-md">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </div>
              <form className="space-y-4" onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600">Name</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Phone Number</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600">Address</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Postal Code</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
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
    </div>
  );
}

export default Coba;
