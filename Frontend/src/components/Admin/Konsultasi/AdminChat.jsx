import React, { useContext } from "react";
import AdminMessages from "./AdminMessages";
import AdminInput from "./AdminInput";
import { ChatContext } from "../../../Context/ChatContext";

const AdminChat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat flex flex-2 flex-col w-[70%]">
      <div className="chatInfo bg-[#3f9277] h-20 m-[-2px] flex items-center gap-6  px-4 text-gray-300" >
        <img className="md:h-7 md:w-7 h-9 w-9 rounded-full object-cover" src={data?.user?.photoURL} alt="" />
      <span className="font-bold text-yellow-200">{data.user?.displayName}</span>
      
      </div>
      <AdminMessages />
      <AdminInput />
    </div>
  );
};

export default AdminChat;
