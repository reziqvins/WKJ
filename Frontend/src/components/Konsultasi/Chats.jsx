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

  // Fetch admin users
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
  }, []); // Empty dependency array to run only once

  // Listen for changes in current user's chats
  useEffect(() => {
    if (currentUser) {
      const chatRef = doc(db, "userChats", currentUser.uid);
      const unsub = onSnapshot(chatRef, (doc) => {
        const data = doc.data();
        console.log("User Chats Data:", data); // Debug log
        setChats(data || {});
      });

      return () => {
        unsub();
      };
    }
  }, [currentUser.uid]); // Dependency array to run when currentUser.uid changes

  // Fetch messages for all chats when chats data changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (Object.keys(chats).length > 0) {
        try {
          const chatIds = Object.keys(chats);
          const chatDocs = await Promise.all(
            chatIds.map((chatId) => getDoc(doc(db, "chats", chatId)))
          );

          const newChats = {};
          chatDocs.forEach((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              newChats[docSnap.id] = data;
            }
          });

          setChats((prevChats) => ({
            ...prevChats,
            ...newChats,
          }));
        } catch (err) {
          console.error("Failed to fetch messages:", err);
        }
      }
    };

    fetchMessages();
  }, [chats]); // Dependency array ensures it runs when chats state updates

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
      {adminUsers.map((user) => {
        const chatId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        const lastMessage = chats[chatId]?.messages?.slice(-1)[0];
        return (
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
              <p className="text-xs text-gray-300">
                {lastMessage ? lastMessage.text : "Mulai Konsultasi"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminChats;
