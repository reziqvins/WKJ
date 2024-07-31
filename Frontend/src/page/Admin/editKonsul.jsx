import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import Swal from 'sweetalert2';

function EditKonsul() {
  const [data, setData] = useState([]);
  const [userKons, setUsersKons] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [defaultDisplayName, setDefaultDisplayName] = useState('');
  const targetUID = 'BGmo4QK9vTc1PdqQgyDZ'; // UID target

  const fetchDataUser = async () => {
    try {
      const response = await getDocs(collection(db, 'users'));
      const users = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const adminUsers = users.filter(user => user.role === 'admin');
      console.log("Fetched admin users:", adminUsers); // Log the fetched admin users
      setData(adminUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataKonsul = async () => {
    try {
      const docRef = doc(db, 'konsultasi', targetUID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const konsulData = docSnap.data();
        setDefaultDisplayName(konsulData.displayName || ''); // Set the default display name
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchDataKonsul();
  }, []);

  const handleSelectChange = (event) => {
    const userId = event.target.value;
    const user = data.find(u => u.id === userId);
    setSelectedUser(user);
  };

  const updateSelectedUser = async () => {
    if (!selectedUser) return;
    
    try {
      const docRef = doc(db, 'konsultasi', targetUID); // reference to the target document
      await updateDoc(docRef, {
        address: selectedUser.address,
        displayName: selectedUser.displayName,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        photoURL: selectedUser.photoURL,
        postalCode: selectedUser.postalCode,
        role: selectedUser.role,
        uid: selectedUser.id,
      });
      Swal.fire({
        icon: 'success',
        title: 'Dokter untuk konsultasi telah diubah',
        showConfirmButton: false,
        timer: 1500
      });
      console.log("User data updated in Firestore:", selectedUser);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h2>Select User</h2>
      <select 
        className="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-indigo-500"
        onChange={handleSelectChange}
        defaultValue=""
      >
        <option value="" disabled>{defaultDisplayName ? `Selected: ${defaultDisplayName}` : 'Select a user'}</option>
        {data.length > 0 ? (
          data.map(user => (
            <option key={user.id} value={user.id}>
              {user.displayName || 'No Name'} {/* Fallback if displayName is not available */}
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>
      <button 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={updateSelectedUser}
      >
        OK
      </button>
    </div>
  );
}

export default EditKonsul;
