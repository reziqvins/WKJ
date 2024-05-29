import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth"; // tambahkan ini

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Tampilkan sweetalert login berhasil
      Swal.fire({
        icon: "success",
        title: "Login berhasil",
        text: "Anda berhasil masuk!",
      });

      // Navigasi ke halaman utama
      navigate("/");

    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div
      className="min-h-screen py-12 "
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12  bg-[#E9F8F3B2] rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 hidden lg:block flex-col items-center justify-center p-12 ">
            <img
              src="https://res.cloudinary.com/dap6ohre8/image/upload/v1714911314/Account-bro_1_xy3i06.png"
              alt=""
            />
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Sign In</h2>
            <p className="mb-4">
              Masuk ke akun anda lalu Konsultasikan Keluhan anda.
            </p>
            <form onSubmit={handleSubmit}>
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
              <div className="mt-5">
                <Link to="/ResetPassword"><p >Lupa Password??</p></Link>
              </div>
              <button
                className="w-full rounded-md mt-5 bg-[#20B486] py-3 text-center text-white"
              >
                Sign In
              </button>
              {err && <span>Something went wrong</span>}
            </form>
            <p className="mt-5">
              Belum punya akun? <Link className="text-[#62c1a3]" to="/SignUp"> Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
