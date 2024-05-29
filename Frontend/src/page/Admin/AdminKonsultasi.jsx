import React from 'react'
import TopBar from '../../components/Admin/TopBar';
import AdminSidebar from '../../components/Admin/Konsultasi/AdminSidebar';
import AdminChat from '../../components/Admin/Konsultasi/AdminChat';
const AdminKonsultasi = () => {
  return (
    <div>
      <TopBar title="Halaman Konsultasi" />
      <div className="home h-screen flex items-center justify-center mt-[-30px]">
        <div className="container border border-white rounded-lg w-[65%] h-[80%] flex overflow-hidden">
          <AdminSidebar />
          <AdminChat />
        </div>
      </div>
    </div>
  )
}

export default AdminKonsultasi
