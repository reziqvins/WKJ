import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../Firebase";

const Chats = () => {
  // const [chats, setChats] = useState([]);

  // const { currentUser } = useContext(AuthContext);
  // const { dispatch } = useContext(ChatContext);

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  // const handleSelect = (u) => {
  //   dispatch({ type: "CHANGE_USER", payload: u });
  // };

  return (
    <div className="chats">
      <div className="userChat flex items-center p-4 gap-4 text-white cursor-pointer hover:bg-indigo-900">
        <img className="w-10 h-10 rounded-full object-cover" src="https://res.cloudinary.com/dap6ohre8/image/upload/v1711775648/WKJ/icons1_zxidth.png" alt="" />
        <div className="userChatInfo">
        <span className="text-sm font-semibold text-yellow-200">jhon kened</span>
        <p className="text-xs text-gray-300">wis mangan?</p>
        </div>
      </div>
    </div>
    // <div className="chats">
    //   {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
    //     <div
    //       className="userChat flex items-center p-4 gap-4 text-white cursor-pointer hover:bg-indigo-900"
    //       key={chat[0]}
    //       onClick={() => handleSelect(chat[1].userInfo)}
    //     >
    //       <img src={chat[1].userInfo.photoURL} alt="" className="w-12 h-12 rounded-full object-cover" />
    //       <div className="userChatInfo">
    //         <span className="text-lg font-semibold">{chat[1].userInfo.displayName}</span>
    //         <p className="text-sm text-gray-300">{chat[1].lastMessage?.text}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Chats;
