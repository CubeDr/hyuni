'use client';

import { auth } from '@/firebase/firebaseClient';
import { Member } from '@/types/member';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useCallback, useEffect, useState } from 'react';
import { getMember, setMember as setMemberFirebase } from './members';

interface AuthContextType {
  user: User | null;
  member: Member | null;
  isLoaded: boolean;
}

export const AuthContext = createContext<AuthContextType>({ user: null, member: null, isLoaded: false });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateMember = useCallback((user: User | null) => {
    if (user == null) {
      setIsLoaded(true);
      return;
    }

    getMember(user.uid).then((member) => {
      if (member == null) {
        setIsDialogOpen(true);
      } else {
        setMember(member);
        setIsLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      updateMember(user);
    });
    return () => unsubscribe();
  }, [updateMember]);

  const logout = useCallback(() => {
    signOut(auth);
    setIsDialogOpen(false);
  }, []);

  const signup = useCallback(() => {
    if (user == null) return;

    setMemberFirebase({
      id: user.uid,
      profileImageUrl: user.photoURL,
      username: user.displayName,
    }).then(() => {
      updateMember(user);
      setIsDialogOpen(false);
    });
  }, [user, updateMember]);

  return (
    <>
      <AuthContext.Provider value={{ user, member, isLoaded }}>
        {children}
      </AuthContext.Provider>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          회원 가입
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            가입되어 있지 않은 계정입니다. 회원 가입 하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logout} color='inherit'>
            취소
          </Button>
          <Button onClick={signup}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
