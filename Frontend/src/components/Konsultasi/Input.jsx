import React, { useContext, useState } from "react";
import Img from "../../img/img.png";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { penyakit } from "../helpers/utils";

// Predefined chatbot responses with special keyword
const responses = penyakit;

const getChatbotResponse = async (text) => {
  // Simulating a delay for response
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Convert text to lowercase for case insensitive matching
  const lowerText = text.toLowerCase();

  // Find keyword in the text
  const foundKeyword = Object.keys(responses).find((keyword) =>
    lowerText.includes(keyword)
  );

  // Return response if keyword is found, otherwise return default message
  return foundKeyword
    ? responses[foundKeyword]
    : "I'm sorry, I don't understand. [chatWithAdminButton]";
};

const Input = ({ chatbotEnabled, setChatbotEnabled }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    let isFirstMessage = false;
    const chatDocRef = doc(db, "chats", data.chatId);
    const chatDoc = await getDoc(chatDocRef);

    if (!chatDoc.exists() || !chatDoc.data().messages.length) {
      isFirstMessage = true;
    }

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // Handle error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(chatDocRef, {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });

            if (isFirstMessage) {
              sendAutomatedResponse(chatDocRef);
            }
          });
        }
      );
    } else {
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      if (isFirstMessage) {
        sendAutomatedResponse(chatDocRef);
      }
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

    if (chatbotEnabled) {
      const chatbotResponse = await getChatbotResponse(text);
      if (chatbotResponse) {
        await updateDoc(chatDocRef, {
          messages: arrayUnion({
            id: uuid(),
            text: chatbotResponse,
            senderId: data.user.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text: chatbotResponse,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text: chatbotResponse,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      }
    }

    setText("");
    setImg(null);
  };

  const handleEscalate = async () => {
    setChatbotEnabled(false); // Disable the chatbot
    const chatDocRef = doc(db, "chats", data.chatId);
    const adminId = data.user.uid;

    await updateDoc(chatDocRef, {
      messages: arrayUnion({
        id: uuid(),
        text: "You are now chatting with a human admin.",
        senderId: adminId,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: "You are now chatting with a human admin.",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", adminId), {
      [data.chatId + ".lastMessage"]: {
        text: "You are now chatting with a human admin.",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  const sendAutomatedResponse = async (chatDocRef) => {
    const adminId = data.user.uid;
    await updateDoc(chatDocRef, {
      messages: arrayUnion({
        id: uuid(),
        text: "pesan anda akan dibalas secepatnya. pastikan anda mengirim pesan pada jam kerja WKJ -wkjBot-",
        senderId: adminId,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: "pesan anda akan dibalas secepatnya. pastikan anda mengirim pesan pada jam kerja WKJ -wkjBot-",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", adminId), {
      [data.chatId + ".lastMessage"]: {
        text: "pesan anda akan dibalas secepatnya. pastikan anda mengirim pesan pada jam kerja WKJ -wkjBot-",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
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
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
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
  );
};

export default Input;
