import { Member } from '@/types/member';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getMember(userId: string) {
  const snapshot = await getDoc(doc(collection(db, 'members'), userId));
  const data = snapshot.data();
  return data as Member | null;
}
