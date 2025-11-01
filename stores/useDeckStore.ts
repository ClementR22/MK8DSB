import { DEFAULT_BUILDS } from "@/constants/defaultBuilds";
import { Build } from "@/data/builds/buildsTypes";
import { create } from "zustand";

type Origin = "user" | "stranger";

type BuildEntry = { name: string; origin: Origin };

type DeckState = {
  deck: Map<string, BuildEntry>;

  addBuild: (build: Build, name: string, origin: Origin) => void;
  updateName: (dataId: string, name: string) => void;
  updateBuildData: (dataId: string, newData: any) => void;
  removeBuild: (dataId: string) => void;
};

const useDeckStore = create<DeckState>((set, get) => ({
  deck: new Map([
    [DEFAULT_BUILDS.build1.dataId, { name: DEFAULT_BUILDS.build1.name, origin: "user" }],
    [DEFAULT_BUILDS.build2.dataId, { name: DEFAULT_BUILDS.build2.name, origin: "user" }],
  ]),

  addBuild: (build, name, origin) =>
    set((state) => {
      const newDeck = state.deck;
      newDeck.set(build.dataId, { name: name, origin: origin });

      return {
        deck: newDeck,
      };
    }),

  updateName: (dataId, name) =>
    set((state) => {
      const buildEntry = state.deck.get(dataId);
      if (!buildEntry) return state;

      const newDeck = new Map(state.deck);
      newDeck.set(dataId, { ...buildEntry, name });

      return { deck: newDeck };
    }),

  updateBuildData: (formerDataId, newDataId) =>
    set((state) => {
      const deck = state.deck;

      const buildEntry = state.deck.get(formerDataId);
      if (!buildEntry) return state;

      deck.delete(formerDataId);
      deck.set(newDataId, buildEntry);

      return {
        deck: deck,
      };
    }),

  removeBuild: (dataId) =>
    set((state) => {
      const deck = state.deck;
      deck.delete(dataId);

      return { deck: deck };
    }),
}));

export default useDeckStore;
