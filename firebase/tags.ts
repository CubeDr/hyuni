import { arrayUnion, collection, doc, DocumentReference, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getTags(): Promise<string[]> {
  const snapshot = await getDocs(collection(db, 'tags'));
  const tags: string[] = [];
  snapshot.forEach((doc) => tags.push(doc.id));
  return tags;
}

export async function addTag(tag: string) {
  await setDoc(doc(db, 'tags', tag), {
    posts: [],
  });
}

export async function addPostToTag(postDocRef: DocumentReference, tag: string) {
  const tagRef = doc(collection(db, 'tags'), tag);

  try {
    await updateDoc(tagRef, {
      posts: arrayUnion({ postRef: postDocRef }),
    });
  } catch (err) {
    await setDoc(tagRef, {
      posts: [{ postRef: postDocRef }],
    });
  }
}
