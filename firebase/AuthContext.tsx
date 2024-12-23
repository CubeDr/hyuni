'use client';

import { auth } from '@/firebase/firebaseClient';
import { Member } from '@/types/member';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { getMember } from './members';

interface AuthContextType {
  user: User | null;
  member: Member | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null, member: null });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user != null) {
        getMember(user.uid).then((member) => setMember(member));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, member }}>
      {children}
    </AuthContext.Provider>
  );
}
