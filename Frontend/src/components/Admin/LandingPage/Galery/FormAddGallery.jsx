import React, { useState } from "react";
import { storage, db, ref } from "../../../../Firebase"; // Sesuaikan path jika perlu
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function FormAddGallery() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const types = ['image/png', 'image/jpeg', 'video/mp4', 'video/mkv'];

  const fileHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
      console.log("File selected successfully");
    } else {
      setFile(null);
      setError("File must be in jpg/png format for images or mp4/mkv format for videos");
    }
  };

  const addMedia = async (e) => {
    e.preventDefault();
    console.log(title, desc, file);
    if (!file) {
      setError("Please select a valid image or video file");
      return;
    }

    const storageRef = ref(storage, `gallery/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          await addDoc(collection(db, "gallery"), {
            title: title,
            desc: desc,
            media: url,
            mediaType: file.type.startsWith('image/') ? 'image' : 'video',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          setTitle("");
          setDesc("");
          setFile(null);
          setError("");
          document.getElementById("file").value = "";

          Swal.fire({
            icon: "success",
            title: "Media Berhasil ditambahkan!",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          setError(error.message);
        }
      }
    );
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl mb-4 font-semibold">Add Gallery</h2>
      <form onSubmit={addMedia}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Judul
          </label>
          <input
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700 font-bold mb-2">
            Deskripsi
          </label>
          <input
            type="text"
            required
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            id="file"
            onChange={fileHandler}
            className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
          />
          {error && <span style={{ color: "red" }}>{error}</span>}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default FormAddGallery;
