// src/components/ForgotPassword.js
import React, { useState } from "react";
import { auth } from "../../../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to send password reset email to:", email);
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully.");
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (err) {
      console.error("Error sending reset email: ", err);
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div
      className="min-h-screen py-12 "
      style={{ backgroundImage: "linear-gradient(115deg, #b6d7a8, #6aa84f)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12  bg-[#E9F8F3B2] rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 hidden lg:block flex flex-col items-center justify-center p-12 ">
            <img
              src="https://res.cloudinary.com/dap6ohre8/image/upload/v1715827584/Forgot_password-amico_wtiu0f.png"
              alt=""
            />
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Lupa Password??</h2>
            <p className="mb-4">Masukan email yang terdaftar..</p>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="w-full rounded-md mt-5 bg-[#20B486] py-3 text-center text-white">
                Reset Password
              </button>
              {message && (
                <p className="text-green-500 mb-4 mt-2 text-center">
                  {message}
                </p>
              )}
              {error && <p className="text-red-500 mb-4">{error}</p>}
            </form>
            <p className="mt-5">
              Kembali ke{" "}
              <Link className="text-[#62c1a3]" to="/SignIn">
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
