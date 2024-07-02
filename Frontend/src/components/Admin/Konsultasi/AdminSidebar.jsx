import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSearch from "./AdminSearch";
import AdminChats from "./AdminChats";

const AdminSidebar = () => {
  return (
    <div className="flex flex-1 flex-col h-full w-[30%] bg-[#3f9277]">
      <AdminNavbar />
      <AdminSearch />
      <AdminChats />
    </div>
  );
};

export default AdminSidebar;
