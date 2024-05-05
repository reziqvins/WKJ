import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col bg-indigo-800 relative">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
