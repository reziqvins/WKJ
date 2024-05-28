import React, { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'

const AdminNavbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar flex items-center justify-between bg-[#32584c] p-2 text-white'>
      <span className="logo font-bold">Konsultasi</span>
      <div className="user flex items-center gap-2 px-4">
      {currentUser ? (
          <>
            <img src={currentUser.photoURL} alt="User Avatar" className="h-9 w-9 rounded-full object-cover" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => signOut(auth)} className="bg-purple-700 text-white text-xs py-1 px-2 rounded cursor-pointer">Logout</button>
          </>
        ) : (
          <span>Loading...</span>
        )}</div>
    </div>
  )
}

export default AdminNavbar
