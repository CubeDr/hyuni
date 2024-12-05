import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import { addPostToCategory } from './categories';
import { db } from './firebaseClient';
import { addPostToSeries } from './series';

export async function addPost(
  postData: Omit<Post, 'timestamp'>
): Promise<string> {
  const postDocRef = await addDoc(collection(db, 'posts'), {
    title: postData.title,
    category: postData.category,
    series: postData.series,
    blocks: postData.blocks,
    timestamp: new Date().getTime(),
    thumbnailImageSrc: postData.thumbnailImageSrc,
  });

  if (postData.series !== '') {
    await addPostToSeries(postDocRef, postData.category, postData.series);
  } else {
    await addPostToCategory(postDocRef, postData.category);
  }
  return postDocRef.id;
}

export async function getPost(id: string): Promise<Post | null> {
  const snapshot = await getDoc(doc(collection(db, 'posts'), id));
  const data = snapshot.data();
  return data as Post | null;
}

export interface GetPostsOptions {
  limit?: number;
  page?: number;
}

export async function getPosts(
  category?: string,
  options?: GetPostsOptions
): Promise<Post[]> {
  const collectionRef = collection(db, 'posts');
  let q = query(collectionRef);

  if (category != null) {
    q = query(q, where('category', '==', category));
  }

  q = query(q, orderBy('timestamp', 'desc'));

  if (options?.page) {
    if (options.limit == null) {
      throw Error('To use page, limit should be also specified.');
    }

    q = query(q, startAt(options.limit * options.page));
  }

  if (options?.limit) {
    q = query(q, limit(options.limit));
  }

  const snapshot = await getDocs(q);

  const result: Post[] = [];
  snapshot.forEach((doc) => {
    result.push({
      ...doc.data(),
      id: doc.id,
    } as Post);
  });
  return result;
}
