import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getCategories(): Promise<string[]> {
  const snapshot = await getDocs(collection(db, 'categories'));
  const categories: string[] = [];
  snapshot.forEach((doc) => categories.push(doc.id));
  return categories;
}
