import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { AuthContext } from "../../Context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
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
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search border-b border-gray-400">
      <div className="searchForm px-4 py-2">
        <input
        type="text"
        placeholder="Find a user"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
          className="bg-transparent border-none text-white outline-none placeholder-lightgray"
        />
      </div>
      {err && <span className="text-red-500">User not found!</span>}
      {user && (
        <div
          className="userChat cursor-pointer flex items-center gap-5 px-4 py-2"
          onClick={handleSelect}
        >
          <img src={user.photoURL} alt="" className=" md:h-7 md:w-7 h-9 w-9 rounded-full object-cover" />
          <div className="userChatInfo">
            <span className="text-sm font-semibold text-yellow-200">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
