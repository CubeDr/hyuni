import {
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getCategories(): Promise<string[]> {
  const snapshot = await getDocs(collection(db, 'categories'));
  const categories: string[] = [];
  snapshot.forEach((doc) => categories.push(doc.id));
  return categories;
}

export async function addPostToCategory(
  postDocRef: DocumentReference,
  category: string
) {
  const categoryRef = doc(collection(db, 'categories'), category);
  await updateDoc(categoryRef, {
    blocks: arrayUnion({ postRef: postDocRef }),
  });
}
