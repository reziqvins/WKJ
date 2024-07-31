import React from 'react';
import TopBar from '../../components/Admin/TopBar';
import AdminChat from '../../components/Admin/Konsultasi/AdminChat';
import AdminSidebar from '../../components/Admin/Konsultasi/AdminSidebar';

const AdminKonsultasi = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar title="Halaman Konsultasi" />
      <div className="flex ">
        <div className="flex flex-1 border border-white rounded-lg overflow-hidden">
          <AdminSidebar />
          <AdminChat />
        </div>
      </div>
    </div>
  );
};

export default AdminKonsultasi;
