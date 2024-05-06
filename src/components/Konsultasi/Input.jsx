import React, { useContext, useState } from "react";
import Img from "../../img/img.png";
import Attach from "../../img/attach.png";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
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
  };

  return (
    <div className="input bg-white h-16 flex items-center justify-between px-4">
      <input
        className="w-[90%] border-none outline-none text-gray-800 text-lg"
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Ceritakan keluhan anda"
      />
      <div className="send w-[23%] flex items-center gap-4">
      <label htmlFor="file" className="cursor-pointer">
          <img src={Img} alt="" className="h-6" />
          <input type="file" style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])} id="file" />
        </label>
        <button onClick={handleSend} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">Kirim</button>
      </div>
    </div>
    // <div className="input bg-white h-16 flex items-center justify-between px-4">
    //   <input
    //     type="text"
    //     placeholder="Type something..."
    //     onChange={(e) => setText(e.target.value)}
    //     value={text}
    //     className="w-full border-none outline-none text-gray-800 text-lg"
    //   />
    //   <div className="send flex items-center gap-4">
    //     <img src={Attach} alt="" className="h-6 cursor-pointer" />
    //     <label htmlFor="file" className="cursor-pointer">
    //       <img src={Img} alt="" className="h-6" />
    //       <input
    //         type="file"
    //         style={{ display: "none" }}
    //         id="file"
    //         onChange={(e) => setImg(e.target.files[0])}
    //       />
    //     </label>
    //     <button
    //       onClick={handleSend}
    //       className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
    //     >
    //       Send
    //     </button>
    //   </div>
    // </div>
  );
};

export default Input;
