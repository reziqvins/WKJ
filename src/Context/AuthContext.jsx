import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Ubah menjadi null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Perbaiki nama fungsi
  }, []);

  useEffect(() => {
    console.log(currentUser); // Tambahkan log di sini
  }, [currentUser]); // Ubah menjadi efek yang tergantung pada currentUser

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
