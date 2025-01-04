import {
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getSeriesList(category: string): Promise<string[]> {
  console.log(category);
  const collectionRef = collection(db, 'categories', category, 'series');
  const snapshot = await getDocs(collectionRef);
  const series: string[] = [];
  snapshot.forEach((doc) => series.push(doc.id));
  return series;
}

export async function addSeries(category: string, series: string) {
  const collectionRef = collection(db, 'categories', category, 'series');
  await setDoc(doc(collectionRef, series), {
    posts: [],
  });
}

export async function addPostToSeries(
  postDocRef: DocumentReference,
  category: string,
  series: string
) {
  const collectionRef = collection(db, 'categories', category, 'series');
  const seriesRef = doc(collectionRef, series);
  await updateDoc(seriesRef, {
    posts: arrayUnion({ postRef: postDocRef }),
  });
}
