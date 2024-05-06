import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={`flex ${message.senderId === currentUser.uid ? 'flex-row-reverse' : ''} gap-4 mb-4`}>
      <div className="flex flex-col items-center justify-center text-gray-500">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
          alt=""
        />
        <span className="text-xs">sekarang</span>
      </div>
      <div className={`flex flex-col gap-2 max-w-[80%] ${message.senderId === currentUser.uid ? 'items-end' : 'items-start'}`}>
        <p className={`bg-white py-2 px-4 rounded-lg ${message.senderId === currentUser.uid ? 'rounded-l-none' : 'rounded-r-none'}`}>{message.text}</p>
        {message.img && <img src={message.img} alt="" className="w-1/2" />}
      </div>
    </div>
  );
};

export default Message;
