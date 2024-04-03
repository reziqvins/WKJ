import React from "react";
import TopBar from "../components/DashboardStore/TopBar";
import MiddleBar from "../components/DashboardStore/MiddleBar";
import Navbar from "../components/LandingPage/Navbar";

function DashboardStore() {
  return (
    <div>
      <Navbar />
      <TopBar />
      <MiddleBar />
    </div>
  );
}

export default DashboardStore;
