import { BuildPersistant } from "@/types";
import { create } from "zustand";

export type BuildEntry = { name: string; isSaved: boolean };

interface DeckState {
  deck: Map<string, BuildEntry>;

  setBuildName: (buildDataId: string, name: string) => void;
  updateBuildDataId: (formerBuildDataId: string, newBuildDataId: string) => void;
  removeBuildName: (buildDataId: string) => void;
  saveBuild: (buildDataId: string) => void;
  unSaveBuild: (buildDataId: string) => void;
  loadBuildsSaved: (buildsSaved: BuildPersistant[]) => void;
  checkNameFree: (buildName: string) => boolean;
}

const useDeckStore = create<DeckState>((set, get) => ({
  deck: new Map([
    //    [DEFAULT_BUILDS.build1.buildDataId, { name: DEFAULT_BUILDS.build1.name, isSaved: false }],
  ]),

  setBuildName: (buildDataId, newName) =>
    set((state) => {
      const buildEntry = state.deck.get(buildDataId);
      const updatedEntry: BuildEntry = buildEntry
        ? { ...buildEntry, name: newName }
        : { name: newName, isSaved: false };

      const newDeck = new Map(state.deck);
      newDeck.set(buildDataId, updatedEntry);
      return { deck: newDeck };
    }),

  updateBuildDataId: (formerBuildDataId, newBuildDataId) =>
    set((state) => {
      const buildEntry = state.deck.get(formerBuildDataId);
      if (!buildEntry) return state;

      const newDeck = new Map(state.deck);
      newDeck.delete(formerBuildDataId);
      newDeck.set(newBuildDataId, buildEntry);
      return { deck: newDeck };
    }),

  removeBuildName: (buildDataId) =>
    set((state) => {
      const newDeck = new Map(state.deck);
      newDeck.delete(buildDataId);
      return { deck: newDeck };
    }),

  saveBuild: (buildDataId) =>
    set((state) => {
      const buildEntry = state.deck.get(buildDataId);
      if (!buildEntry) return state;

      const newDeck = new Map(state.deck);
      newDeck.set(buildDataId, { ...buildEntry, isSaved: true });
      return { deck: newDeck };
    }),

  unSaveBuild: (buildDataId) =>
    set((state) => {
      const buildEntry = state.deck.get(buildDataId);
      if (!buildEntry) return state;

      const newDeck = new Map(state.deck);
      newDeck.set(buildDataId, { ...buildEntry, isSaved: false });
      return { deck: newDeck };
    }),

  loadBuildsSaved: (buildsSaved) =>
    set((state) => {
      const newDeck = new Map(state.deck);
      buildsSaved.forEach((buildPersistant) => {
        newDeck.set(buildPersistant.buildDataId, {
          name: buildPersistant.name,
          isSaved: true,
        });
      });
      return { deck: newDeck };
    }),

  checkNameFree: (buildName) => {
    const { deck } = get();
    for (const entry of deck.values()) {
      if (entry.name.trim().toLowerCase() === buildName.trim().toLowerCase()) {
        return false; // nom déjà pris
      }
    }
    return true; // nom disponible
  },
}));

export default useDeckStore;
