import React from 'react'
import TopBar from '../../../components/Admin/TopBar';
import UserTable from '../../../components/Admin/User/UserTable'

function UserPage() {
  return (
    <div className='px-4'>
      <TopBar title="Halaman Pengguna"/>
      <UserTable/>
    </div>
  )
}

export default UserPage
