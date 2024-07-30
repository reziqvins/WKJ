import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../Firebase";
import Message from "./Message";
import { AuthContext } from "../../Context/AuthContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        const newMessages = doc.data().messages;
        setMessages(newMessages);

        // Check if the last message is from someone other than the current user
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.senderId !== currentUser.uid) {
          // Display notification
          if (Notification.permission === 'granted') {
            new Notification(`New message from ${data.user.displayName}`, {
              body: lastMessage.text,
              icon: data.user.photoURL,
            });
          }
        }
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId, currentUser.uid, data.user.displayName, data.user.photoURL]);

  return (
    <div className="messages bg-[#E9F8F3B2] p-4 h-full overflow-y-auto">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
