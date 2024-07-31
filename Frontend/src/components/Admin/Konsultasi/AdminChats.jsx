import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import { db } from "../../../Firebase";
import Swal from "sweetalert2";

const AdminChats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (currentUser) {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data() || {}); // Ensure chats is set to an empty object if doc.data() is undefined
        });

        return () => {
          unsub();
        };
      };

      getChats();
    }
  }, [currentUser]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleDelete = async (chatId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will delete the message permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const chatDocRef = doc(db, "userChats", currentUser.uid);
        await updateDoc(chatDocRef, {
          chats: arrayRemove({ id: chatId })
        });

        Swal.fire('Deleted!', 'Your message has been deleted.', 'success');
      }
    } catch (error) {
      console.error("Error deleting message: ", error);
      Swal.fire('Error!', 'There was an error deleting the message.', 'error');
    }
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1]?.date - a[1]?.date).map(([chatId, chat]) => (
        <div
          key={chatId}
          onClick={() => handleSelect(chat.userInfo)}
          className="userChat flex items-center p-4 gap-4 text-white cursor-pointer hover:bg-indigo-900"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={chat.userInfo?.photoURL || '/default-avatar.png'} // Provide a fallback image
            alt={chat.userInfo?.displayName || 'User'}
          />
          <div className="userChatInfo flex-grow">
            <span className="text-sm font-semibold text-yellow-200">
              {chat.userInfo?.displayName || 'Unknown User'}
            </span>
            <p className="text-xs text-gray-300">
              {chat.lastMessage?.text || 'No message'}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from triggering handleSelect
              handleDelete(chatId);
            }}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminChats;
