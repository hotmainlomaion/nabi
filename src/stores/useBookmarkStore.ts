import { create } from "zustand";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export interface BookmarkedItem {
  id: string;
  artistName: string;
  source: string;
  title: string;
  summary: string;
  timeAgo: string;
  imageUrl?: string;
  url?: string;
  savedAt: string;
}

interface BookmarkStore {
  bookmarks: BookmarkedItem[];
  isBookmarked: (id: string) => boolean;
  addBookmark: (uid: string, item: BookmarkedItem) => Promise<void>;
  removeBookmark: (uid: string, id: string) => Promise<void>;
  loadBookmarks: (uid: string) => Promise<void>;
}

const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],

  isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

  addBookmark: async (uid, item) => {
    const bookmarkWithTime = {
      ...item,
      savedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "users", uid, "bookmarks", item.id), bookmarkWithTime);
    set((state) => ({
      bookmarks: [bookmarkWithTime, ...state.bookmarks],
    }));
  },

  removeBookmark: async (uid, id) => {
    await deleteDoc(doc(db, "users", uid, "bookmarks", id));
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    }));
  },

  loadBookmarks: async (uid) => {
    const snap = await getDocs(collection(db, "users", uid, "bookmarks"));
    const items: BookmarkedItem[] = [];
    snap.forEach((doc) => {
      items.push(doc.data() as BookmarkedItem);
    });
    items.sort(
      (a, b) =>
        new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    );
    set({ bookmarks: items });
  },
}));

export default useBookmarkStore;