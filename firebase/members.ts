import { Member } from '@/types/member';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getMember(userId: string) {
  const snapshot = await getDoc(doc(collection(db, 'members'), userId));
  const data = snapshot.data();
  return data as Member | null;
}

export async function getMembers(
  userIds: string[]
): Promise<Map<string, Member>> {
  const collectionRef = collection(db, 'members');
  const q = query(collectionRef, where(documentId(), 'in', userIds));
  const snapshot = await getDocs(q);

  const result = new Map<string, Member>();
  snapshot.forEach((doc) => {
    result.set(doc.id, doc.data() as Member);
  });
  return result;
}

export async function setMember(
  member: Omit<Member, 'role' | 'joinTimestamp'>
) {
  await setDoc(doc(collection(db, 'members'), member.id), {
    ...member,
    role: 'visitor',
    joinTimestamp: new Date().getTime(),
  });
  return member.id;
}
