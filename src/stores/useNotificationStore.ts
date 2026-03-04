import { create } from "zustand";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Notification {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  body: string;
  type: "news" | "community" | "shop" | "system";
  read: boolean;
  createdAt: string;
  linkUrl?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  loadNotifications: (uid: string) => Promise<void>;
  markAsRead: (uid: string, notifId: string) => Promise<void>;
  markAllRead: (uid: string) => Promise<void>;
  addNotification: (uid: string, notif: Omit<Notification, "id" | "read" | "createdAt">) => Promise<void>;
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  loadNotifications: async (uid) => {
    const ref = collection(db, "users", uid, "notifications");
    const q = query(ref, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    const items: Notification[] = [];
    snap.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as Notification);
    });

    set({
      notifications: items,
      unreadCount: items.filter((n) => !n.read).length,
    });
  },

  markAsRead: async (uid, notifId) => {
    const ref = doc(db, "users", uid, "notifications", notifId);
    await updateDoc(ref, { read: true });

    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      ),
      unreadCount: state.notifications.filter(
        (n) => !n.read && n.id !== notifId
      ).length,
    }));
  },

  markAllRead: async (uid) => {
    const { notifications } = get();
    const unread = notifications.filter((n) => !n.read);

    await Promise.all(
      unread.map((n) =>
        updateDoc(doc(db, "users", uid, "notifications", n.id), {
          read: true,
        })
      )
    );

    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  addNotification: async (uid, notif) => {
    const ref = collection(db, "users", uid, "notifications");
    const newNotif = {
      ...notif,
      read: false,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(ref, newNotif);

    set((state) => ({
      notifications: [{ ...newNotif, id: docRef.id }, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
}));

export default useNotificationStore;