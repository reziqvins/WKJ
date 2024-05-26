// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAukarVSE5gPOQspLq_fznMY-1Xug9KLVY",
  authDomain: "wisatakesehatanjamu1.firebaseapp.com",
  projectId: "wisatakesehatanjamu1",
  storageBucket: "wisatakesehatanjamu1.appspot.com",
  messagingSenderId: "660701546894",
  appId: "1:660701546894:web:074f5164374890fbb07cdf",
  measurementId: "G-9ST42NQYW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db, ref };
