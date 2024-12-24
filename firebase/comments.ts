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
import { getMembers } from './members';
import { updatePostCommentsCount } from './posts';

interface FirebaseComment {
  id: string;
  comment: string;
  postId: string;
  timestamp: number;
  userId: string;
}

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

export async function getComments(postId: string): Promise<Comment[]> {
  const collectionRef = collection(db, 'posts', postId, 'comment');
  const q = query(collectionRef, orderBy('timestamp', 'desc'));

  const snapshot = await getDocs(q);

  const userIds = new Set<string>(
    snapshot.docs.map((doc) => doc.data().userId)
  );
  const members = await getMembers(Array.from(userIds));

  const result: Comment[] = [];
  snapshot.forEach((doc) => {
    result.push({
      ...doc.data(),
      postId,
      id: doc.id,
      member: members.get(doc.data().userId),
    } as Comment);
  });
  return result;
}

export async function deleteComment(postId: string, commentId: string) {
  const docRef = doc(db, 'posts', postId, 'comment', commentId);
  await deleteDoc(docRef);
  await updatePostCommentsCount(postId);
}
