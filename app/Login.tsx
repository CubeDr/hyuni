'use client';

import { AuthContext } from '@/firebase/AuthContext';
import { auth } from '@/firebase/firebaseClient';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useCallback, useContext } from 'react';

export default function Login() {
  const { user } = useContext(AuthContext);

  const login = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        window.alert('Signed in successfully!');
      } else {
        console.error('Sign-in error:', response.status);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      window.alert('Signed out successfully!');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }, []);

  return <>
    <span onClick={user ? logout : login}>{user ? '로그아웃' : '로그인'}</span>
  </>;
}