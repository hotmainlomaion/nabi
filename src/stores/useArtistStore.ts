import { create } from "zustand";

interface ArtistStore {
  selectedArtists: string[];
  toggleArtist: (id: string) => void;
  setArtists: (ids: string[]) => void;
  clearArtists: () => void;
}

const useArtistStore = create<ArtistStore>((set) => ({
  selectedArtists: [],

  toggleArtist: (id) =>
    set((state) => ({
      selectedArtists: state.selectedArtists.includes(id)
        ? state.selectedArtists.filter((v) => v !== id)
        : [...state.selectedArtists, id],
    })),

  setArtists: (ids) => set({ selectedArtists: ids }),

  clearArtists: () => set({ selectedArtists: [] }),
}));

export default useArtistStore;