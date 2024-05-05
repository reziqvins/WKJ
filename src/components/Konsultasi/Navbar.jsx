import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../Firebase'
import { AuthContext } from '../../Context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar flex items-center justify-between bg-[#32584c] p-2 text-white'>
      <span className="logo font-bold">Konsultasi</span>
      <div className="user flex items-center gap-2">
        <img src="https://res.cloudinary.com/dap6ohre8/image/upload/v1711775648/WKJ/icons1_zxidth.png" alt="" className="h-6 w-6 rounded-full" />
        <span>John cena</span>
        
        {/* <img src={currentUser.photoURL} alt="" className="h-6 w-6 rounded-full" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className="bg-purple-700 text-white text-xs py-1 px-2 rounded cursor-pointer">logout</button> */}
      </div>
    </div>
  )
}

export default Navbar
