import { addDoc, collection, DocumentReference } from 'firebase/firestore';
import { db } from './firebaseClient';
import { addPostToCategory } from './categories';

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
