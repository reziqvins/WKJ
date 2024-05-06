import React, { useContext } from "react";
import Cam from "../../img/cam.png"
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../Context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat flex flex-2 flex-col">
      <div className="chatInfo bg-[#3f9277] h-20 m-[-2px] flex items-center  px-4 text-gray-300" >
      <span>{data.user?.displayName}</span>
      
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
