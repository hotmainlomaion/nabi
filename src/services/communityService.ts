import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";

// ─── 좋아요 ───

export async function toggleLike(articleId: string, uid: string) {
  const likeRef = doc(db, "articles", articleId, "likes", uid);
  const statsRef = doc(db, "articles", articleId);
  const snap = await getDoc(likeRef);

  if (snap.exists()) {
    await deleteDoc(likeRef);
    await setDoc(statsRef, { likeCount: increment(-1) }, { merge: true });
    return false;
  } else {
    await setDoc(likeRef, { uid, createdAt: new Date().toISOString() });
    await setDoc(statsRef, { likeCount: increment(1) }, { merge: true });
    return true;
  }
}

export async function checkIfLiked(articleId: string, uid: string) {
  const likeRef = doc(db, "articles", articleId, "likes", uid);
  const snap = await getDoc(likeRef);
  return snap.exists();
}

export async function getLikeCount(articleId: string) {
  const statsRef = doc(db, "articles", articleId);
  const snap = await getDoc(statsRef);
  if (snap.exists()) {
    return snap.data().likeCount || 0;
  }
  return 0;
}

// ─── 댓글 ───

export interface Comment {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  createdAt: string;
}

export async function addComment(
  articleId: string,
  uid: string,
  displayName: string,
  photoURL: string,
  text: string
) {
  const commentsRef = collection(db, "articles", articleId, "comments");
  const statsRef = doc(db, "articles", articleId);

  const newDoc = await addDoc(commentsRef, {
    uid,
    displayName,
    photoURL,
    text,
    createdAt: new Date().toISOString(),
  });

  await setDoc(statsRef, { commentCount: increment(1) }, { merge: true });

  return newDoc.id;
}

export async function getComments(articleId: string): Promise<Comment[]> {
  const commentsRef = collection(db, "articles", articleId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);

  const comments: Comment[] = [];
  snap.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() } as Comment);
  });
  return comments;
}

export async function getCommentCount(articleId: string) {
  const statsRef = doc(db, "articles", articleId);
  const snap = await getDoc(statsRef);
  if (snap.exists()) {
    return snap.data().commentCount || 0;
  }
  return 0;
}