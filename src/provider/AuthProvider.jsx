import React, { createContext, useEffect, useState } from "react";
import auth from "../../firebase.config";
import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updateProfile } from "firebase/auth"
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const axios = useAxios();
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
 




  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };


  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }


  const updatingUser = (username, photo) => {
    console.log(user)
     setLoading(true);
     return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: photo,
     })
  }


  const loggingWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);


      if (currentUser) {
          axios.post('/jwt', loggedUser, { withCredentials: true })
              .then(res => {
                  
              })
      }
      else {
          axios.post('/jwt/logout', loggedUser, {
              withCredentials: true
          })
              .then(res => {
                  
              })
      }
    })

    return () => {
        unsubscribe();
    }
  }, [])



  const authInfo = {
    user,
    createUser,
    signInUser,
    logOut,
    updatingUser,
    loggingWithGoogle,
    loading, 
    setLoading,

  };

  


  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;