import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, GoogleAuthProvider,
  signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>;
}
