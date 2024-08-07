import { createContext, useEffect, useState } from "react";
import { auth, db, storage } from "../Firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUser({ ...user, ...userDoc.data() });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const updateUserProfile = async (updates) => {
    if (currentUser) {
      try {
        if (updates.photoURL) {
          await updateProfile(auth.currentUser, { photoURL: updates.photoURL });
        }

        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, {
          displayName: updates.displayName,
          phoneNumber: updates.phoneNumber,
          address: updates.address,
          postalCode: updates.postalCode,
          province: updates.province,
          id_provinsi: updates.id_provinsi,
          city: updates.city,
          id_city: updates.id_city,
          ...(updates.photoURL && { photoURL: updates.photoURL }),
          email: currentUser.email,
        }, { merge: true });

        const updatedUserDoc = await getDoc(userDocRef);
        setCurrentUser({ ...auth.currentUser, ...updatedUserDoc.data() });
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
