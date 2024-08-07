import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase"; // Sesuaikan dengan lokasi Firebase Anda
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import Search from "../Search"; // Import komponen Search
import { TbReload } from "react-icons/tb";
import Swal from "sweetalert2";
import { PropagateLoader } from "react-spinners"; // Import spinner
import { AuthContext } from "../../../Context/AuthContext"; // Misal context untuk auth

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { currentUser } = useContext(AuthContext); // Misal mendapatkan user yang sedang login dari context

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersArray);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } 
  };

  const handleDeleteUser = async (userId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter((user) => user.id !== userId));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Ambil data pengguna saat komponen dimuat pertama kali
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle pencarian
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Filter pengguna berdasarkan kata kunci pencarian
  const filteredUsers = users.filter((user) =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <PropagateLoader color="#2dd4bf" loading={loading} size={15} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4 rounded-md bg-white">
      <div className="flex justify-between">
        <Search onSearch={handleSearch} />
        <div className="action flex gap-8">
          <Link to="/admin/ser">
            <button className="bg-[#2dd4bf] flex justify-between p-2 h-[2.5rem] w-full md:w-[6rem] rounded-lg  md:mt-0">
              <TbReload className="text-lg mt-1" />
              Reload
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto bg-white p-4 mt-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-blue-500 text-[14px]">
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentUser && (
              <tr key={currentUser.id} className="bg-yellow-100 border-b border-gray-200">
                <td className="px-4 py-2">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span className="inline-block w-10 h-10 bg-gray-200 rounded-full"></span>
                  )}
                </td>
                <td className="px-4 py-2">{currentUser.displayName}</td>
                <td className="px-4 py-2">{currentUser.email}</td>
                <td className="px-4 py-2">{currentUser.role}</td>
                <td className="px-4 py-2"></td> 
              </tr>
            )}
            {filteredUsers.map((user) => (
              user.id !== currentUser.id && (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">
                    
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full"
                      />
                  </td>
                  <td className="px-4 py-2">{user.displayName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link to={`/admin/editUser/${user.id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                          <MdEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
