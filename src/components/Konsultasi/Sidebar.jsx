import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="flex flex-2 flex-col h-full bg-[#3f9277] w-[30%]">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
