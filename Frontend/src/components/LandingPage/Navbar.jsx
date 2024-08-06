import React, { useContext, useState } from "react";
import { icons, hamburgerMenu, close } from "../../assets";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { AuthContext } from "../../Context/AuthContext";
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleClick = () => setToggle(!toggle);
  console.log(`---------------curent${currentUser}`)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Logout Berhasil",
        text: "Anda telah berhasil logout.",
      });
    } catch (error) {
      console.error("Error while logging out", error);
    }
  };

  return (
    <div className="w-full h-[80px] bg-[#E9F8F3B2] border-b py-6">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img src={icons} className="h-[60px]" alt="Logo" />

        <div className="hidden md:flex">
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            {currentUser && currentUser.role === "admin" && (
              <li>
                <Link to="/Admin">Admin</Link>
              </li>
            )}
            <li>
              <Link to="/Konsultasi">Konsultasi</Link>
            </li>
            <li>
              <Link to="/DashboardStore">Toko</Link>
            </li>
            {currentUser ? (
              <li className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-transparent border-none outline-none"
                >
                  <img
                    className="w-8 h-8 object-cover rounded-full"
                    src={currentUser.photoURL}
                    alt=""
                  />
                  <span>{currentUser.displayName}</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[20] menu p-2 shadow bg-base-100 rounded-box w-[135px] left-[-10px]"
                >
                  <li>
                    <Link to="/UserProfile">
                      <button className="flex gap-3">
                        <CgProfile />
                        Profil
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Pemesanan">
                      <button className="flex gap-3">
                        <MdOutlineShoppingBag  />
                        Pemesanan
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="flex gap-3">
                      <VscSignOut />
                      Logout
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
          <img src={toggle ? close : hamburgerMenu} alt="Menu" />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <li className="p-4 hover:bg-gray-100">
            <Link to="/">Beranda</Link>
          </li>
          {currentUser && currentUser.role === "admin" && (
            <li className="p-4 hover:bg-gray-100">
              <Link to="/Admin">Admin</Link>
            </li>
          )}
          <li className="p-4 hover:bg-gray-100">
            <Link to="/Konsultasi">Konsultasi</Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to="/DashboardStore">Toko</Link>
          </li>
          {currentUser ? (
            <li className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-transparent border-none outline-none"
              >
                <img
                  className="w-8 h-8 object-cover rounded-full"
                  src={currentUser.photoURL}
                  alt=""
                />
                <span>{currentUser.displayName}</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52 left-[-10px]"
              >
                <li>
                  <Link to="/UserProfile">
                    <button className="flex gap-3">
                      <CgProfile />
                      Profil
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/Pemesanan">
                    <button className="flex gap-3">
                      <MdOutlineShoppingBag />
                      Pemesanan
                    </button>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex gap-3">
                    <VscSignOut />
                    Logout
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
  );
};

export default Navbar;