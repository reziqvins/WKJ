import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { storage } from "../../Firebase"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaEdit } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";

function Profil() {
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false); // Set initial loading state to false

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || "");
      setPhoneNumber(currentUser.phoneNumber || "");
      setAddress(currentUser.address || "");
      setPostalCode(currentUser.postalCode || "");
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when update starts

    const updatedProfile = {
        displayName: name,
        phoneNumber: phoneNumber,
        address: address,
        postalCode: postalCode,
    };

    try {
        if (profilePicture) {
            const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
            await uploadBytes(storageRef, profilePicture);
            const photoURL = await getDownloadURL(storageRef);
            updatedProfile.photoURL = photoURL;
        }

        await updateUserProfile(updatedProfile);
        toast.success("Profile updated successfully!");
    } catch (error) {
        toast.error("Failed to update profile. Please try again.");
    } finally {
        setLoading(false); // Set loading to false after update process
    }
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  };

  return (
    <div
      className="min-h-screen py-10 p-4 rounded-lg"
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}
    >
      {currentUser && (
        <div className="flex flex-col md:flex-row bg-gray-100 my-auto rounded-lg">
          <div className="w-full md:w-1/3 md:py-8 bg-green-100 p-12 flex flex-col items-center shadow-md rounded-l-lg">
            <div className="relative">
              <div className="w-28 h-28 mx-auto relative overflow-hidden rounded-full">
                <div>
                  <img
                    src={profilePicture ? URL.createObjectURL(profilePicture) : (currentUser.photoURL || "/default-profile.png")}
                    alt="login icons"
                  />
                </div>
                <form>
                  <label>
                    <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                      Upload Photo
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </form>
              </div>
              <div className="absolute bottom-0 right-3 text-white bg-blue-500 rounded-full p-1">
                <FaEdit className="flex justify-center items-center" />
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
                <p>: {truncateText(address, 3)}</p>
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
                  rows="4"
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
                disabled={loading}
                className="w-full mt-3 rounded-md bg-[#20B486] py-3 text-center text-white flex justify-center items-center"
              >
                {loading ? (
                  <PropagateLoader className="p-3" color="#ffffff" size={10} />
                ) : (
                  "Update Data"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profil;
