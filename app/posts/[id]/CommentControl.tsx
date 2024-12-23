'use client';

import { AuthContext } from '@/firebase/AuthContext';
import { deleteComment } from '@/firebase/comments';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';
import styles from './CommentControl.module.css';

interface Props {
  userId: string;
  postId: string;
  commentId: string;
}

export default function CommentControl({ userId, postId, commentId }: Props) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const deleteCommentCallback = useCallback(() => {
    deleteComment(postId, commentId).then(() => {
      router.refresh();
      setOpen(false);
    });
  }, [userId, postId, commentId]);

  if (user?.uid !== userId) {
    return <></>;
  }

  return (
    <>
      <div className={styles.CommentControl}>
        <span className={styles.Delete} onClick={() => setOpen(true)}>삭제</span>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          댓글 삭제
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            댓글을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='inherit'>
            취소
          </Button>
          <Button onClick={deleteCommentCallback} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}