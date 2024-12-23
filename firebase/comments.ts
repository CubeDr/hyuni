import { Comment } from '@/types/comment';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './firebaseClient';

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
