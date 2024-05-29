import React from 'react'

function NavbarRegister() {
  return (
    <div className="w-full h-[80px]  bg-[#E9F8F3B2] border-b py-6">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img src={icons} className="h-[60px]" />

        <div className="hidden md:flex">
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li><Link to="/Konsultasi">Konsultasi</Link></li>
            <li>
              <Link to="/DashboardStore">Toko</Link>
            </li>
            {currentUser ? (
              <li className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn bg-transparent border-none outline-none">
                  
                  <img className="w-8 h-8 object-cover rounded-full" src={currentUser.photoURL} alt="" />

                  <span>{currentUser.displayName}</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 left-[-10px]"
                >
                  <li>
                    <button><CgProfile />Profil</button>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      <VscSignOut />logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link to="/SignIn">
                  <button className="bg-[#20B486] rounded-lg px-4 py-2 text-white ">
                    Masuk
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <li className="p-4 hover:bg-gray-100">
            <Link to="/">Beranda</Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to="/DashboardStore">Toko</Link>
          </li>
          <li  className="p-4 hover:bg-gray-100"><Link to="/Konsultasi">Konsultasi</Link></li>
          {currentUser ? (
            <li className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn bg-transparent border-none outline-none">
                <img className="w-6" src="https://res.cloudinary.com/dap6ohre8/image/upload/v1711775648/WKJ/icons1_zxidth.png" alt="" />
                <span>{currentUser.displayName}</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 left-[-10px]"
              >
                <li>
                  <button><CgProfile />Profil</button>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <VscSignOut />logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <Link to="/SignIn">
                <button className="bg-[#20B486] rounded-lg px-4 py-2 text-white ">
                  Masuk
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default NavbarRegister