import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PropagateLoader } from "react-spinners";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user)

      if (!res.user.emailVerified) {
        setErr(true);
        Swal.fire({
          icon: "error",
          title: "Email belum terverifikasi",
          text: "Silakan verifikasi email Anda sebelum login.",
        });
        setLoading(false);
        return;
      }

      // User is verified and can be logged in
      navigate("/");
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
              src="https://res.cloudinary.com/dap6ohre8/image/upload/v1714911314/Account-bro_1_xy3i06.png"
              alt=""
            />
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Sign In</h2>
            <p className="mb-4">
              Masuk ke akun anda dan nikmati layanan kami
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
              <Link  to="/ResetPassword"><span className="mt-5">Lupa Password Anda???</span> </Link>
              <button
                disabled={loading}
                className="w-full mt-3 rounded-md bg-[#20B486] py-3 text-center text-white flex justify-center items-center"
              >
                {loading ? (
                  <PropagateLoader className="p-3" color="#ffffff" size={10} />
                ) : (
                  "Sign In"
                )}
              </button>
              {err && (
                <span className="text-red-500">Something went wrong</span>
              )}
            </form>
            <p className="mt-5 text-sm">
              Belum memiliki akun? <Link className="text-[#62c1a3]" to="/SignUp">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
