import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../Context/ChatContext";
import { db } from "../../../Firebase";
import AdminMessage from "./AdminMessage";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (

    <div className="messages bg-[#E9F8F3B2] p-4 h-full overflow-y-auto">
      {messages.map((m) => (
        <AdminMessage message={m} key={m.id} />
      ))}
    </div>
  );
};

export default AdminMessages;
