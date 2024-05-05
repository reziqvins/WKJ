import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";

const Coba = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // setLoading(true);
    // e.preventDefault();
    // const displayName = e.target[0].value;
    // const email = e.target[1].value;
    // const password = e.target[2].value;
    // const file = e.target[3].files[0];

    // try {
    //   //Create user
    //   const res = await createUserWithEmailAndPassword(auth, email, password);

    //   //Create a unique image name
    //   const date = new Date().getTime();
    //   const storageRef = ref(storage, `${displayName + date}`);

    //   await uploadBytesResumable(storageRef, file).then(() => {
    //     getDownloadURL(storageRef).then(async (downloadURL) => {
    //       try {
    //         //Update profile
    //         await updateProfile(res.user, {
    //           displayName,
    //           photoURL: downloadURL,
    //         });
    //         //create user on firestore
    //         await setDoc(doc(db, "users", res.user.uid), {
    //           uid: res.user.uid,
    //           displayName,
    //           email,
    //           photoURL: downloadURL,
    //         });

    //         //create empty user chats on firestore
    //         await setDoc(doc(db, "userChats", res.user.uid), {});
    //         navigate("/");
    //       } catch (err) {
    //         console.log(err);
    //         setErr(true);
    //         setLoading(false);
    //       }
    //     });
    //   });
    // } catch (err) {
    //   setErr(true);
    //   setLoading(false);
    // }
  };

  return (
    <div className="formContainer bg-blue-200 h-screen flex items-center justify-center">
      <div className="formWrapper bg-white p-8 rounded-lg flex flex-col items-center gap-4">
        <span className="logo text-indigo-800 font-bold text-2xl">Lama Chat</span>
        <span className="title text-indigo-800 text-sm">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input required type="text" placeholder="display name" className="border border-gray-400 px-3 py-2" />
          <input required type="email" placeholder="email" className="border border-gray-400 px-3 py-2" />
          <input required type="password" placeholder="password" className="border border-gray-400 px-3 py-2" />
          <label htmlFor="file" className="flex items-center gap-2 text-indigo-800 text-xs cursor-pointer">
            <img src={Add} alt="" className="w-8" />
            <span>Add an avatar</span>
          </label>
          <input required style={{ display: "none" }} type="file" id="file" />
          <button disabled={loading} className="w-full bg-indigo-700 text-white px-4 py-2 font-bold rounded-md cursor-pointer">{loading ? "Uploading and compressing the image please wait..." : "Sign up"}</button>
          {err && <span className="text-red-500">Something went wrong</span>}
        </form>
        <p className="text-indigo-800 text-sm">You do have an account? <Link to="/register" className="text-indigo-800 font-semibold">Login</Link></p>
      </div>
    </div>
  );
};

export default Coba;
