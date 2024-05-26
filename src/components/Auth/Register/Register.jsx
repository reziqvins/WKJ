import React, { useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../Firebase"; // Menghapus import storage dan fungsi terkait
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // Hapus baris berikut yang mengambil file gambar dari input
    // const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Setel foto profil default
      const photoURL = "https://res.cloudinary.com/dap6ohre8/image/upload/v1716714913/WKJ/Frame_349_q3utva.png";

      try {
        //Update profile
        await updateProfile(res.user, {
          displayName,
          photoURL,
        });

        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL,
        });

        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        Swal.fire({
          icon: "success",
          title: "Register berhasil",
          text: "Anda berhasil mendaftar!",
        });

        // Redirect ke halaman utama
        navigate("/SignIn");
      } catch (err) {
        console.log(err);
        setErr(true);
        setLoading(false);
      }
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 "
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12  bg-[#E9F8F3B2] rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 hidden lg:block  flex-col items-center justify-center p-12 ">
            <img
              src="https://res.cloudinary.com/dap6ohre8/image/upload/v1714874462/Sign_up-pana_h1joxb.png"
              alt=""
            />
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Buat akun anda secara gratis dan hanya membutuhkan waktu sebentar
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="UserName"
                  className="border border-b-gray-100 rounded-md py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="border border-b-gray-100 rounded-md py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-b-gray-100 rounded-md py-1 px-2 w-full"
                />
              </div>
              {/* Hapus input gambar */}
              {/* <div className="mt-5">
                <input
                  required
                  type="file"
                  id="file"
                  className="file-input file-input-bordered file-input-[#20B486] w-full h-9 max-w-xs"
                />
              </div> */}
              <button
                disabled={loading}
                className="w-full mt-3 rounded-md bg-[#20B486] py-3 text-center text-white"
              >
                {loading
                  ? "Mengunggah dan mengompresi gambar harap tunggu..."
                  : "Register"}
              </button>
              {err && (
                <span className="text-red-500">Something went wrong</span>
              )}
            </form>
            <p className="mt-5 text-sm">
              Sudah memiliki akun? <Link className="text-[#62c1a3]" to="/SignIn">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
