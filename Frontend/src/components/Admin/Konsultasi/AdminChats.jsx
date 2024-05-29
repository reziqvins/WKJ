import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import { db } from "../../../Firebase";

const AdminChats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (currentUser) { // Check if currentUser is not null
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      };

      getChats();
    }
  }, [currentUser]); // Re-run effect when currentUser changes

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
          className="userChat flex items-center p-4 gap-4 text-white cursor-pointer hover:bg-indigo-900"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={chat[1].userInfo.photoURL}
            alt=""
          />
          <div className="userChatInfo">
            <span className="text-sm font-semibold text-yellow-200">
              {chat[1].userInfo.displayName}
            </span>
            <p className="text-xs text-gray-300">
              {chat[1].lastMessage?.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminChats;
