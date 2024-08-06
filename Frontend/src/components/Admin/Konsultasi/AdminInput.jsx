import React, { useContext, useState } from "react";
import Img from "../../../img/img.png";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AdminInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!text.trim()) {
      return;
    }
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setImgPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bg-white p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <input
          className="w-full flex-1 border-none outline-none text-gray-800 text-lg"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Ceritakan keluhan anda"
          onKeyDown={handleKeyPress}
        />
        <div className="send flex items-center gap-4">
          <label htmlFor="file" className="cursor-pointer">
            <img src={Img} alt="" className="h-6" />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
              id="file"
            />
          </label>
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Kirim
          </button>
        </div>
      </div>
      {imgPreview && (
        <div className="image-preview mb-2">
          <img
            src={imgPreview}
            alt="Selected preview"
            className="max-h-48 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default AdminInput;
