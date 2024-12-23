import { addDoc, collection } from 'firebase/firestore';
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
