import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
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

export async function getPosts(): Promise<Post[]> {
  const q = query(collection(db, 'posts'));
  const snapshot = await getDocs(q);

  const result: Post[] = [];
  snapshot.forEach((doc) => {
    result.push({
      ...doc.data(),
      id: doc.id,
    } as Post);
  });
  return result;
}
