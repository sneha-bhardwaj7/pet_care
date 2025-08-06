// src/components/contexts/AuthContext.jsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { signOut } from "firebase/auth"; // Import Firebase's signOut

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Define the logout function
  const logout = async () => {
    try {
      await signOut(auth); // Firebase signOut
      setCurrentUser(null); // Clear the user state
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // Include logout in the context value
  const value = {
    currentUser,
    loading,
    logout, // <-- Make sure this is included
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context;
}