import { create } from "zustand";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface ArtistStore {
  selectedArtists: string[];
  toggleArtist: (id: string) => void;
  setArtists: (ids: string[]) => void;
  clearArtists: () => void;
  saveToFirestore: (uid: string) => Promise<void>;
  loadFromFirestore: (uid: string) => Promise<void>;
}

const useArtistStore = create<ArtistStore>((set, get) => ({
  selectedArtists: [],

  toggleArtist: (id) =>
    set((state) => ({
      selectedArtists: state.selectedArtists.includes(id)
        ? state.selectedArtists.filter((v) => v !== id)
        : [...state.selectedArtists, id],
    })),

  setArtists: (ids) => set({ selectedArtists: ids }),

  clearArtists: () => set({ selectedArtists: [] }),

  saveToFirestore: async (uid) => {
    const { selectedArtists } = get();
    await setDoc(doc(db, "users", uid), {
      selectedArtists,
      updatedAt: new Date().toISOString(),
    });
  },

  loadFromFirestore: async (uid) => {
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) {
      const data = snap.data();
      if (data.selectedArtists) {
        set({ selectedArtists: data.selectedArtists });
      }
    }
  },
}));

export default useArtistStore;