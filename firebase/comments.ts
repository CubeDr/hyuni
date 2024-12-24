import { Comment } from '@/types/comment';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './firebaseClient';
import { updatePostCommentsCount } from './posts';

export async function addComment(
  comment: string,
  postId: string,
  userId: string
) {
  const commentDocRef = await addDoc(
    collection(db, 'posts', postId, 'comment'),
    {
      comment,
      userId,
      timestamp: new Date().getTime(),
    }
  );
  await updatePostCommentsCount(postId);

  return commentDocRef.id;
}

export async function getComments(postId: string) {
  const collectionRef = collection(db, 'posts', postId, 'comment');
  const q = query(collectionRef, orderBy('timestamp', 'desc'));

  const snapshot = await getDocs(q);

  const result: Comment[] = [];
  snapshot.forEach((doc) => {
    result.push({
      ...doc.data(),
      postId,
      id: doc.id,
    } as Comment);
  });
  return result;
}

export async function deleteComment(postId: string, commentId: string) {
  const docRef = doc(db, 'posts', postId, 'comment', commentId);
  await deleteDoc(docRef);
  await updatePostCommentsCount(postId);
}
