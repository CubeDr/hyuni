import { Member } from '@/types/member';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseClient';

export async function getMember(userId: string) {
  const snapshot = await getDoc(doc(collection(db, 'members'), userId));
  const data = snapshot.data();
  return data as Member | null;
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
