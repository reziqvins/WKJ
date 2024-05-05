import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../Firebase";
import Message from "./Message";

const Messages = () => {
  // const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatContext);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);

  return (
    <div className="messages bg-[#E9F8F3B2] p-4 h-full overflow-y-auto">
      <Message/>
      <Message/>
      <Message/>

    </div>
    // <div className="messages bg-gray-200 p-4 h-full overflow-y-auto">
    //   {messages.map((m) => (
    //     <Message message={m} key={m.id} />
    //   ))}
    // </div>
  );
};

export default Messages;
