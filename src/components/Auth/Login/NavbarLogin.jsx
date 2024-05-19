import React from 'react'

function NavbarLogin() {
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

        </ul>
      </div>
    </div>
  )
}

export default NavbarLogin
