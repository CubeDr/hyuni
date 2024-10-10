import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { addPostToCategory } from './categories';
import { db } from './firebaseClient';

interface PostData {
  title: string;
  category: string;
  blocks: {
    type: 'markdown';
    content: string;
  }[];
  timestamp: number;
}

export async function addPost(
  postData: Omit<PostData, 'timestamp'>
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

export async function getPost(id: string): Promise<PostData> {
  const snapshot = await getDoc(doc(collection(db, 'posts'), id));
  const data = snapshot.data() as PostData;
  return data;
}
