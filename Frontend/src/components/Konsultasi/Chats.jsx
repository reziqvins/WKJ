import React, { useContext, useState, useEffect } from "react";
import { doc, onSnapshot, query, where, collection, getDocs, updateDoc, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../Firebase";

const AdminChats = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState({});

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("role", "==", "admin"));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setAdminUsers(users);
      } catch (err) {
        console.error("Failed to fetch admin users:", err);
      }
    };

    fetchAdminUsers();
  }, []);

  useEffect(() => {
    if (currentUser) { // Check if currentUser is not null
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {});
      });

      return () => {
        unsub();
      };
    }
  }, [currentUser]);

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Create a chat in the chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Create user chats for both current user and selected user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (err) {
      console.error("Failed to select user:", err);
    }
  };

  return (
    <div className="chats">
      {adminUsers.map((user) => (
        <div
          key={user.uid}
          onClick={() => handleSelect(user)}
          className="userChat flex items-center p-4 gap-4 text-white cursor-pointer hover:bg-indigo-900"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoURL}
            alt=""
          />
          <div className="userChatInfo">
            <span className="text-sm font-semibold text-yellow-200">
              {user.displayName}
            </span>
            {/* Mendapatkan lastMessage dari state chats */}
            <p className="text-xs text-gray-300">
              {chats[user.uid]?.lastMessage?.text || "haloo"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminChats;
