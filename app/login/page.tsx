'use client';

import { AuthContext } from '@/firebase/AuthContext';
import { auth } from '@/firebase/firebaseClient';
import { Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useContext } from 'react';
import AppBar from '../component/appbar/AppBar';

export default function LoginPage() {
  const { user } = useContext(AuthContext);

  const signInWithGoogle = async () => {
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
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      window.alert('Signed out successfully!');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <>
      <AppBar />
      {user ? (
        <Button variant="contained" onClick={signOutUser}>
          로그아웃
        </Button>
      ) : (
        <Button variant="contained" onClick={signInWithGoogle}>
          구글 로그인
        </Button>
      )}
    </>
  );
}