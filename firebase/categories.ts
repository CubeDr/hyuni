import {
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getCategories(): Promise<string[]> {
  const snapshot = await getDocs(collection(db, 'categories'));
  const categories: string[] = [];
  snapshot.forEach((doc) => categories.push(doc.id));
  return categories;
}

export async function addCategory(category: string) {
  await setDoc(doc(db, 'categories', category), {
    posts: [],
  });
}

export async function addPostToCategory(
  postDocRef: DocumentReference,
  category: string
) {
  const categoryRef = doc(collection(db, 'categories'), category);
  await updateDoc(categoryRef, {
    posts: arrayUnion({ postRef: postDocRef }),
  });
}
