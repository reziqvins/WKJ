import { doc, onSnapshot, arrayUnion, updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../Firebase";
import Message from "./Message";
import { v4 as uuid } from "uuid";

const Messages = ({ setChatbotEnabled }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

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

  const renderMessage = (text) => {
    if (text.includes("[chatWithAdminButton]")) {
      const parts = text.split("[chatWithAdminButton]");
      return (
        <span key={uuid()}>
          {parts[0]}
          <button
            onClick={handleEscalate}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Chat with Admin
          </button>
          {parts[1]}
        </span>
      );
    }
    return text;
  };

  return (
    <div className="messages bg-[#E9F8F3B2] p-4 h-full overflow-y-auto">
      {messages.map((m) => (
        <Message message={{ ...m, text: renderMessage(m.text) }} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
