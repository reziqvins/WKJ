// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()