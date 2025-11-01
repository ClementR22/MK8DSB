import { create } from "zustand";
import { Build } from "@/data/builds/buildsTypes";

type DeckState = {
  deck: Record<string, Build>;

  addBuild: (build: Build) => void;
  updateName: (id: string, name: string) => void;
  updateBuildData: (id: string, newData: any) => void;
  removeBuild: (id: string) => void;
};

const useDeckStore = create<DeckState>((set, get) => ({
  deck: {},

  addBuild: (build) =>
    set((state) => ({
      deck: { ...state.deck, [build.id]: build },
    })),

  updateName: (id, name) =>
    set((state) => {
      const build = state.deck[id];
      if (!build) return state;
      return { deck: { ...state.deck, [id]: { ...build, name } } };
    }),

  updateBuildData: (id, newDataId) =>
    set((state) => {
      const build = state.deck[id];
      if (!build) return state;

      return {
        deck: {
          ...state.deck,
          [id]: { ...build, dataId: newDataId },
        },
      };
    }),

  removeBuild: (id) =>
    set((state) => {
      const newDeck = { ...state.deck };
      delete newDeck[id];
      return { deck: newDeck };
    }),
}));

export default useDeckStore;
