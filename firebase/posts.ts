import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { addPostToCategory } from './categories';
import { db } from './firebaseClient';

export async function addPost(
  postData: Omit<Post, 'timestamp'>
): Promise<string> {
  const postDocRef = await addDoc(collection(db, 'posts'), {
    title: postData.title,
    category: postData.category,
    blocks: postData.blocks,
    timestamp: new Date().getTime(),
  });
  await addPostToCategory(postDocRef, postData.category);
  return postDocRef.id;
}

export async function getPost(id: string): Promise<Post | null> {
  const snapshot = await getDoc(doc(collection(db, 'posts'), id));
  const data = snapshot.data();
  return data as Post | null;
}
