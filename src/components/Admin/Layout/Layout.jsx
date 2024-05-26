import { Outlet } from "react-router-dom";
import Sidebar from "../../Coba";

function Layout() {
  // bg-[#166534]
  return (
    <div className="flex bg-[#166534]">
      <Sidebar />
      <div className="flex-1 bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
