import React, { useContext, useState, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
// import addNotification from "react-push-notification";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch: chatDispatch } = useContext(ChatContext);
  const [chat, setChat] = useState(null);
  const [chatbotEnabled, setChatbotEnabled] = useState(true);
  const [adminUID, setAdminUID] = useState(null);

  useEffect(() => {
    const fetchAdminUID = async () => {
      try {
        const docRef = doc(db, "konsultasi", "BGmo4QK9vTc1PdqQgyDZ");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const adminData = docSnap.data();
          setAdminUID(adminData.uid);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching admin UID:", error);
      }
    };

    fetchAdminUID();
  }, []);

  useEffect(() => {
    if (currentUser && adminUID) {
      const chatId =
        currentUser.uid > adminUID
          ? currentUser.uid + adminUID
          : adminUID + currentUser.uid;

      const fetchChat = async () => {
        try {
          const res = await getDoc(doc(db, "chats", chatId));
          if (!res.exists()) {
            // Create a chat in the chats collection
            await setDoc(doc(db, "chats", chatId), { messages: [] });

            // Create user chats for both current user and admin
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [chatId + ".userInfo"]: {
                uid: adminUID,
                displayName: "Admin",
                photoURL: "", // Set the admin's photoURL here if needed
              },
              [chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", adminUID), {
              [chatId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [chatId + ".date"]: serverTimestamp(),
            });
          }

          setChat({
            id: chatId,
            userInfo: {
              uid: adminUID,
              displayName: "AskWKJ",
              photoURL: "", // Set the admin's photoURL here if needed
            }
          });

          chatDispatch({ type: "CHANGE_USER", payload: {
            uid: adminUID,
            displayName: "AskWKJ",
            photoURL: "", // Set the admin's photoURL here if needed
          }});
        } catch (err) {
          console.error("Failed to fetch or create chat:", err);
        }
      };

      fetchChat();

      // const unsubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
      //   const data = doc.data();
      //   if (data) {
      //     const lastMessage = data.messages[data.messages.length - 1];
      //     if (lastMessage && lastMessage.senderId !== currentUser.uid) {
      //       addNotification({
      //         title: "New Message",
      //         message: lastMessage.text,
      //         duration: 5000,
      //         native: true, // native browser notification
      //       });
      //     }
      //   }
      // });

      // return () => unsubscribe();
    }
  }, [currentUser, adminUID, chatDispatch]);

  return (
    <div className="chat flex flex-2 flex-col w-screen">
      <div className="chatInfo bg-[#3f9277] h-20 m-[-2px] flex items-center gap-6 px-4 text-gray-300">
        <span className="font-bold text-yellow-200">{chat?.userInfo?.displayName || "Loading..."}</span>
      </div>
      <Messages setChatbotEnabled={setChatbotEnabled} />
      <Input chatbotEnabled={chatbotEnabled} setChatbotEnabled={setChatbotEnabled} />
    </div>
  );
};

export default Chat;
