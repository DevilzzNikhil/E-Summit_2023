import { useContext, createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from "../utility/firebase";
import { useRouter } from "next/router";
import { doc, getDoc, setDoc, collection, set } from "firebase/firestore";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(user?.displayName);
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    }
  };
  const logout = async () => {
    console.log("LOGGING OUT");
    await router.replace("/");
    await signOut(auth);
    setIsLoggedIn(false);
    setUser({});
  };

  const userRegistration = async (googleUser) => {
    if (user?.name) return;
    if (googleUser?.displayName) {
      const participantRef = doc(db, "participants", googleUser.uid);
      const participantSnap = await getDoc(participantRef);
      if (participantSnap.exists()) {
        console.log("Document data:", participantSnap.data());
        setUser(participantSnap.data());
      } else {
        const newUser = {
          id: googleUser.uid,
          referral_code:
            googleUser.uid.slice(0, 4).toLowerCase() +
            Date.now().toString().substring(9),
          name: googleUser.displayName,
          email: googleUser.email,
          avatar: googleUser.photoURL,
          time: Date.now(),
          registrations: [],
        };
        await setDoc(doc(db, "participants", newUser.id), newUser);
        setUser(newUser);
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      userRegistration(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ handleGoogleSignIn, user, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
