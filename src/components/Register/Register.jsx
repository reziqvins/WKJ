import React, { useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State untuk menyimpan file yang dipilih
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setErr(false); // Reset error state
    setLoading(true); // Set loading to true
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Jika file dipilih
      if (selectedFile) {
        // Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        // Upload file ke storage
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        // Pantau status upload
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Proses sedang berlangsung, bisa tambahkan indikator di sini jika diperlukan
          },
          (error) => {
            // Handle error
            console.error(error);
            setErr(true); // Set error state
            setLoading(false); // Set loading to false
          },
          async () => {
            // Upload selesai, dapatkan URL unduhan
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            try {
              // Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });

              // Create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              // Create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});

              // Tampilkan sweetalert
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
          }
        );
      } else {
        // Jika file tidak dipilih, lanjutkan proses tanpa upload foto
        try {
          // Update profile
          await updateProfile(res.user, {
            displayName,
          });

          // Create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
          });

          // Create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});

          // Tampilkan sweetalert
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
      }
    } catch (err) {
      setErr(true);
      console.log(err);
      setLoading(false);
    }
  };

  // Handle ketika file dipilih
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Set state dengan file yang dipilih
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
              
              <label
                htmlFor="file"
                className="flex items-center mt-5 mb-5 gap-2 text-[#47802f]  cursor-pointer"
              >
                <BiSolidImageAdd className="w-8 text-[35px] " />
                <span className="text-xs">Tambah Foto Profil</span>
              </label>
              {/* Input untuk memilih file */}
              <input
                required
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange} // Panggil fungsi handleFileChange saat file dipilih
              />
              {/* Keterangan bahwa file sudah dipilih */}
              {selectedFile && (
                <span className="text-gray-400 text-sm mb-5">Gambar telah dipilih: <span className=" text-[#20B486git]">{selectedFile.name} </span></span>
              )}
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
