import React from 'react'
import TopBar from '../../components/Admin/TopBar'
import Sidebar from '../../components/Konsultasi/Sidebar'
import Chat from '../../components/Konsultasi/Chat'

const Inbox = () => {
  return (
    <div>
      <TopBar title="Halaman Konsultasi"/>
      <div className="home h-screen flex items-center justify-center mt-[-30px]">
        <div className="container border border-white rounded-lg w-[65%] h-[80%] flex overflow-hidden">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default Inbox
