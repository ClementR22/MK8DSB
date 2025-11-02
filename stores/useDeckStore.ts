import { DEFAULT_BUILDS } from "@/constants/defaultBuilds";
import { Build, BuildPersistant } from "@/data/builds/buildsTypes";
import { create } from "zustand";

type Origin = "user" | "stranger";

export type BuildEntry = { name: string; origin: Origin; isSaved: boolean };

type DeckState = {
  deck: Map<string, BuildEntry>;

  updateName: (dataId: string, name: string) => void;
  updateBuildData: (dataId: string, newData: any) => void;
  removeBuildName: (dataId: string) => void;
  saveBuild: (dataId: string) => void;
  unSaveBuild: (dataId: string) => void;
  loadBuildsSaved: (buildsSaved: BuildPersistant[]) => void;
};

const useDeckStore = create<DeckState>((set) => ({
  deck: new Map([
    [DEFAULT_BUILDS.build1.dataId, { name: DEFAULT_BUILDS.build1.name, origin: "user" as Origin, isSaved: false }],
    [DEFAULT_BUILDS.build2.dataId, { name: DEFAULT_BUILDS.build2.name, origin: "user" as Origin, isSaved: false }],
  ]),

  updateName: (dataId, newName) =>
    set((state) => {
      const buildEntry = state.deck.get(dataId);

      const updatedEntry: BuildEntry = buildEntry
        ? { ...buildEntry, name: newName }
        : { name: newName, origin: "user", isSaved: false };

      const newDeck = new Map(state.deck);
      newDeck.set(dataId, updatedEntry);

      return { deck: newDeck };
    }),

  updateBuildData: (formerDataId, newDataId) =>
    set((state) => {
      const buildEntry = state.deck.get(formerDataId);
      if (!buildEntry) return state;

      const newDeck = new Map(state.deck);
      newDeck.delete(formerDataId);
      newDeck.set(newDataId, buildEntry);

      return { deck: newDeck };
    }),

  removeBuildName: (dataId) =>
    set((state) => {
      const newDeck = new Map(state.deck);
      newDeck.delete(dataId);

      return { deck: newDeck };
    }),

  saveBuild: (dataId) =>
    set((state) => {
      const buildEntry = state.deck.get(dataId);

      const newDeck = new Map(state.deck);
      newDeck.set(dataId, { ...buildEntry, isSaved: true });

      return { deck: newDeck };
    }),

  unSaveBuild: (dataId) =>
    set((state) => {
      const buildEntry = state.deck.get(dataId);
      const newBuild = { ...buildEntry, isSaved: false };

      const newDeck = new Map(state.deck);
      newDeck.set(dataId, newBuild);

      return { deck: newDeck };
    }),

  loadBuildsSaved: (buildsSaved) =>
    set((state) => {
      const newDeck = new Map(state.deck);
      buildsSaved.forEach((buildPersistant: BuildPersistant) => {
        newDeck.set(buildPersistant.dataId, { name: buildPersistant.name, origin: "user", isSaved: true });
      });
      return { deck: newDeck };
    }),
}));

export default useDeckStore;
