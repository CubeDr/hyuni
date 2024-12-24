'use client';

import { AUTH_DISABLED_PATHS, AuthContext } from '@/firebase/AuthContext';
import { auth } from '@/firebase/firebaseClient';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { usePathname } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';

export default function Login() {
  const { user } = useContext(AuthContext);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const pathname = usePathname();

  const login = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setIsLogoutDialogOpen(false);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }, []);

  if (AUTH_DISABLED_PATHS.includes(pathname)) {
    return <></>;
  }

  return <>
    <span onClick={user ? () => setIsLogoutDialogOpen(true) : login}>{user ? '로그아웃' : '로그인'}</span>
    <Dialog
      open={isLogoutDialogOpen}
      onClose={() => setIsLogoutDialogOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        로그아웃
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          로그아웃 하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsLogoutDialogOpen(false)} color='inherit'>
          취소
        </Button>
        <Button onClick={logout}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}