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
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid ? "owner" : ""}`}
    >
      <div className="messageInfo flex flex-col text-gray-500">
        <img
          src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <span>just now</span>
      </div>
      <div className="messageContent max-w-80 flex flex-col gap-2">
        <p className={`${message.senderId === currentUser.uid ? "bg-blue-600 text-white rounded-r-lg" : "bg-gray-100 text-gray-800 rounded-l-lg"} p-4 max-w-max-content`}>{message.text}</p>
        {message.img && <img src={message.img} alt="" className="w-1/2" />}
      </div>
    </div>
  );
};

export default Message;
