import React, { useContext, useState, useEffect } from "react";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase";

const Chat = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const { data, dispatch: chatDispatch } = useContext(ChatContext);
  const [chat, setChat] = useState(null);
  const [chatbotEnabled, setChatbotEnabled] = useState(true);

  // Admin UID you want to chat with
  const adminUID = "FpIhSeviSoau76x5Cd6GTHovAQ52";

  useEffect(() => {
    if (currentUser) {
      const chatId =
        currentUser.uid > adminUID
          ? currentUser.uid + adminUID
          : adminUID + currentUser.uid;

      const fetchChat = async () => {
        try {
          const res = await getDoc(doc(db, "chats", chatId));
          if (!res.exists()) {
            // Create a chat in the chats collection
            await setDoc(doc(db, "chats", chatId), { messages: [] });

            // Create user chats for both current user and admin
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [chatId + ".userInfo"]: {
                uid: adminUID,
                displayName: "Admin",
                photoURL: "", // Set the admin's photoURL here if needed
              },
              [chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", adminUID), {
              [chatId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [chatId + ".date"]: serverTimestamp(),
            });
          }

          setChat({
            id: chatId,
            userInfo: {
              uid: adminUID,
              displayName: "AskWKJ",
              photoURL: "", // Set the admin's photoURL here if needed
            }
          });

          chatDispatch({ type: "CHANGE_USER", payload: {
            uid: adminUID,
            displayName: "AskWKJ",
            photoURL: "", // Set the admin's photoURL here if needed
          }});
        } catch (err) {
          console.error("Failed to fetch or create chat:", err);
        }
      };

      fetchChat();
    }
  }, [currentUser, chatDispatch]);

  return (
    <div className="chat flex flex-2 flex-col w-screen">
      <div className="chatInfo bg-[#3f9277] h-20 m-[-2px] flex items-center gap-6 px-4 text-gray-300">
        <span className="font-bold text-yellow-200">{chat?.userInfo?.displayName || "Loading..."}</span>
      </div>
      <Messages setChatbotEnabled={setChatbotEnabled} />
      <Input chatbotEnabled={chatbotEnabled} setChatbotEnabled={setChatbotEnabled} />
    </div>
  );
};

export default Chat;
