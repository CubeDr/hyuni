'use client';

import { auth, db } from '@/firebase/firebaseClient';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

type Role = 'owner' | 'member' | 'visitor';

interface AuthContextType {
  user: User | null;
  role: Role | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null, role: null });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user != null) {
        const docRef = doc(db, 'owners', user.uid);
        getDoc(docRef).then((snapshot) => {
          if (snapshot.exists()) {
            setRole('owner');
          } else {
            setRole('member');
          }
        });
      } else {
        setRole('visitor');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
}
