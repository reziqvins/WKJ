import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../Firebase'
import { AuthContext } from '../../Context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar flex items-center justify-between bg-[#32584c] p-2 text-white'>
      <span className="logo font-bold">Konsultasi</span>
      <div className="user flex items-center gap-2 px-4 hidden">
        <img src={currentUser.photoURL} alt="" className="md:h-7 md:w-7 h-9 w-9 rounded-full object-cover" />
        <span>{currentUser.displayName}</span>
        
        {/* <img src={currentUser.photoURL} alt="" className="h-6 w-6 rounded-full" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className="bg-purple-700 text-white text-xs py-1 px-2 rounded cursor-pointer">logout</button> */}
      </div>
    </div>
  )
}

export default Navbar
