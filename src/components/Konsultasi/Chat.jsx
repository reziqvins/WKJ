import React, { useContext } from "react";
import Cam from "../../img/cam.png"
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../Context/ChatContext";

const Chat = () => {
  // const { data } = useContext(ChatContext);

  return (
    <div className="chat flex flex-1 flex-col">
      <div className="chatInfo bg-[#3f9277] h-16 flex items-center justify-between px-4 text-gray-300" >
      <span>Reziq safsaf</span>
      
      </div>
      {/* <div className="chatInfo bg-purple-700 h-16 flex items-center justify-between px-4 text-gray-300">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <p>chat</p> */}
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
