import React, { useContext, useState, useEffect } from "react";
import Img from "../../img/img.png";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { penyakit } from "../helpers/utils";
// import addNotification from 'react-push-notification';

const responses = penyakit;

const getChatbotResponse = async (text) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const lowerText = text.toLowerCase();

  const foundKeyword = Object.keys(responses).find((keyword) =>
    lowerText.includes(keyword)
  );

  return foundKeyword
    ? responses[foundKeyword]
    : "Maaf, pertanyaan anda tidak ada di database kami. Silahkan bertan [chatWithAdminButton]";
};

const Input = ({ chatbotEnabled, setChatbotEnabled }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // function successNotification() {
  //   addNotification({
  //     title: "Success",
  //     subtitle: "You have successfully submitted",
  //     message: "Welcome to GeeksforGeeks",
  //     theme: "light",
  //     closeButton: "X",
  //     backgroundTop: "green",
  //     backgroundBottom: "yellowgreen",
  //   });
  // }

  // useEffect(() => {
  //   if (Notification.permission !== "granted") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission !== "granted") {
  //         console.log("Notification permission denied.");
  //       }
  //     });
  //   }

  //   const chatDocRef = doc(db, "chats", data.chatId);

  //   const unsubscribe = onSnapshot(chatDocRef, (doc) => {
  //     const data = doc.data();
  //     if (data) {
  //       const lastMessage = data.messages[data.messages.length - 1];
  //       if (lastMessage && lastMessage.senderId !== currentUser.uid) {
  //         console.log("New message received:", lastMessage.text);
  //         successNotification();
  //       }
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [currentUser.uid, data.chatId]);

  // const handleNotifications = () => {
  //   console.log("Notification button clicked");
  //   successNotification();
  // };

  const handleSend = async () => {
    let isFirstMessage = false;
    const chatDocRef = doc(db, "chats", data.chatId);
    const chatDoc = await getDoc(chatDocRef);

    if (!chatDoc.exists() || !chatDoc.data().messages.length) {
      isFirstMessage = true;
    }

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(chatDocRef, {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });

            if (isFirstMessage) {
              sendAutomatedResponse(chatDocRef);
            }
          });
        }
      );
    } else {
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      if (isFirstMessage) {
        sendAutomatedResponse(chatDocRef);
      }
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    if (chatbotEnabled) {
      const chatbotResponse = await getChatbotResponse(text);
      if (chatbotResponse) {
        await updateDoc(chatDocRef, {
          messages: arrayUnion({
            id: uuid(),
            text: chatbotResponse,
            senderId: data.user.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text: chatbotResponse,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text: chatbotResponse,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      }
    }

    setText("");
    setImg(null);
  };

  const sendAutomatedResponse = async (chatDocRef) => {
    const adminId = data.user.uid;
    await updateDoc(chatDocRef, {
      messages: arrayUnion({
        id: uuid(),
        text: "pesan anda akan dibalas secepatnya. pastikan anda mengirim pesan pada jam kerja WKJ -wkjBot-",
        senderId: adminId,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: "pesan anda akan dibalas secepatnya. pastikan anda mengirim pesan pada jam kerja WKJ -wkjBot-",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", adminId), {
      [data.chatId + ".lastMessage"]: {
        text: "pesan anda akan dibalas secepatnya. pastikan anda mengirim pesan pada jam kerja WKJ -wkjBot-",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };

  return (
    <div className="input bg-white h-16 flex items-center justify-between px-4">
      <input
        className="w-full flex-1 border-none outline-none text-gray-800 text-lg"
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Ceritakan keluhan anda"
      />
      <div className="send flex items-center gap-4">
        <label htmlFor="file" className="cursor-pointer">
          <img src={Img} alt="" className="h-6" />
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
            id="file"
          />
        </label>
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Kirim
        </button>
        {/* <button
          onClick={handleNotifications}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Notif Test
        </button> */}
      </div>
    </div>
  );
};

export default Input;
