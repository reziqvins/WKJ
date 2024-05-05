import React from 'react'
import Sidebar from "../components/Konsultasi/Sidebar";
import Chat from "../components/Konsultasi/Chat";

function KonsultasiPage() {
  return (
<div className='home bg-blue-200 h-screen flex items-center justify-center'>
      <div className="container border border-white rounded-lg w-3/5 h-4/5 flex overflow-hidden">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default KonsultasiPage
