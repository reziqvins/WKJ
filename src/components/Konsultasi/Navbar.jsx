import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../Firebase'
import { AuthContext } from '../../Context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar flex items-center justify-between bg-indigo-900 p-2 text-white'>
      <span className="logo font-bold">Lama Chat</span>
      <div className="user flex items-center gap-2">
        <img src={currentUser.photoURL} alt="" className="h-6 w-6 rounded-full" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className="bg-purple-700 text-white text-xs py-1 px-2 rounded cursor-pointer">logout</button>
      </div>
    </div>
  )
}

export default Navbar
