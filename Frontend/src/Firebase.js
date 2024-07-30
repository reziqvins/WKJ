// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH1xWLVwRFirhLp8ltMm3LcueklYZ-1hA",
  authDomain: "cobatoko-57725.firebaseapp.com",
  projectId: "cobatoko-57725",
  storageBucket: "cobatoko-57725.appspot.com",
  messagingSenderId: "410394776123",
  appId: "1:410394776123:web:c746b417cf627ca439821e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const messaging = getMessaging(app);

export { app,messaging, auth, storage, db, ref };
