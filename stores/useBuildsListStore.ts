// Third-party libraries
import { create } from "zustand";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

// Data and Types
import { statNames } from "@/data/stats/statsData";
import { ScreenName } from "@/contexts/ScreenContext";

// Utilities
import { getBuildStatsFromClassIds } from "@/utils/getBuildStatsFromClassIds";
import { SortableElement, sortElements } from "@/utils/sortElements";
import { DEFAULT_BUILDS } from "@/constants/defaultBuilds";
import useBuildsPersistenceStore from "./useBuildsPersistenceStore";

export const MAX_NUMBER_SETS_DISPLAY = 10;
export const MAX_NUMBER_SETS_SAVE = 30;

export interface Build {
  id: string;
  name: string;
  classIds: number[];
  stats: number[];
  percentage?: number;
}
export interface BuildsListStoreState {
  setsListFound: Build[];
  setsListDisplayed: Build[];
  setsListSaved: Build[];
  setCardEditedId: string;
  setKeyInDisplay: number;

  getBuildsList: (screenName: ScreenName) => {
    setsList: Build[] | Build[];
    setsListName: string;
  };
  getSetBuildsList: (screenName: ScreenName) => (newBuildsList: Build[]) => void;

  getSet: (screenName: ScreenName, id: string) => Build;

  setBuildsListFound: (newBuildsList: Build[]) => void;
  setBuildsListDisplayed: (newBuildsList: Build[]) => void;
  setBuildsListSaved: (newBuildsList: Build[]) => void;
  setSetCardEditedId: (id: string) => void;
  addNewSetInDisplay: () => void;
  removeSet: (id: string, screenName: ScreenName) => void;
  checkNameUnique: (setName: string, screenName: ScreenName) => boolean;
  generateUniqueName: (baseName: string, newIndexInit: number, target: ScreenName) => string;
  renameSet: (newName: string, screenName: ScreenName, id: string) => void;
  updateBuildsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => void;
  sortBuildsList: (screenName: ScreenName, sortNumber: number) => void;
}

const useBuildsListStore = create<BuildsListStoreState>((set, get) => ({
  setsListFound: [],
  setsListDisplayed: [
    { id: nanoid(8), ...DEFAULT_BUILDS.set1 },
    { id: nanoid(8), ...DEFAULT_BUILDS.set2 },
  ],
  setsListSaved: [],
  setCardEditedId: null,
  setKeyInDisplay: 2,

  getBuildsList: (screenName) => {
    let setsListName: string;

    switch (screenName) {
      case "search":
        setsListName = "setsListFound";
        break;
      case "display":
        setsListName = "setsListDisplayed";
        break;
      case "save":
        setsListName = "setsListSaved";
        break;
    }

    const setsList = get()[setsListName];
    return { setsList, setsListName };
  },

  getSetBuildsList: (screenName: ScreenName) => {
    let setBuildsListName: string;

    switch (screenName) {
      case "search":
        setBuildsListName = "setBuildsListFound";
        break;
      case "display":
        setBuildsListName = "setBuildsListDisplayed";
        break;
      case "save":
        setBuildsListName = "setBuildsListSaved";
        break;
    }

    const setBuildsList = get()[setBuildsListName];
    return setBuildsList;
  },

  getSet: (screenName: ScreenName, id: string) => {
    const setList = get().getBuildsList(screenName).setsList;

    const s = setList.find((s) => s.id === id);
    return s;
  },

  setBuildsListFound: (newBuildsList) => set({ setsListFound: newBuildsList }),

  setBuildsListDisplayed: (newBuildsList) => set({ setsListDisplayed: newBuildsList }),

  setBuildsListSaved: (newBuildsList) => set({ setsListSaved: newBuildsList }),

  setSetCardEditedId: (id) => {
    set({ setCardEditedId: id });
  },

  addNewSetInDisplay: () => {
    if (get().setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY) {
      throw new Error("setLimitReached");
    }

    const newIndex = get().setKeyInDisplay;
    const newName = get().generateUniqueName("Build", newIndex, "display");

    set((state) => {
      return {
        setKeyInDisplay: newIndex,
        setsListDisplayed: [...state.setsListDisplayed, { ...DEFAULT_BUILDS.set1, id: nanoid(8), name: newName }],
      };
    });
  },

  removeSet: (id, screenName) => {
    const { setsList, setsListName } = get().getBuildsList(screenName);
    const newList = setsList.filter((build) => build.id !== id);
    set({ [setsListName]: newList });
  },

  checkNameUnique: (setName, screenName) => {
    // ne lance pas d'error
    const { setsList } = get().getBuildsList(screenName);

    const isNameUnique = !setsList.some((build) => build.name === setName);
    return isNameUnique;
  },

  generateUniqueName: (baseName: string, newIndexInit: number, target: ScreenName) => {
    let newIndex = newIndexInit;
    let newName: string;
    let attempts = 0;
    const MAX_ATTEMPTS = 20;

    do {
      newIndex++;
      newName = `${baseName} (${newIndex})`;
      attempts++;

      if (attempts > MAX_ATTEMPTS) {
        throw new Error("cannotGenerateUniqueName");
      }
    } while (!get().checkNameUnique(newName, target));

    return newName;
  },

  renameSet: (newName, screenName, id) => {
    const { setsList, setsListName } = get().getBuildsList(screenName);

    const isNameUnique = get().checkNameUnique(newName, screenName);
    if (!isNameUnique) {
      throw new Error("nameAlreadyExists");
    }

    const s = get().getSet(screenName, id);
    const newSet = { ...s, name: newName };

    const newBuildsList = setsList.map((s: Build) => {
      if (s.id === id) {
        return newSet;
      }
      return s;
    });

    set({ [setsListName]: newBuildsList });

    if (screenName === "save") {
      useBuildsPersistenceStore.getState().saveSetInMemory(newSet);
    }
  },

  updateBuildsList: (pressedClassIdsObj, screenName) => {
    const { setsList, setsListName } = get().getBuildsList(screenName);
    const newClassIds = Object.values(pressedClassIdsObj);
    const id = get().setCardEditedId;

    const s = get().getSet(screenName, id);
    const newSet = { ...s, classIds: newClassIds, stats: getBuildStatsFromClassIds(newClassIds) };

    const setsListUpdated = setsList.map((s) => {
      if (s.id === id) {
        return newSet;
      }
      return s;
    });

    set({ [setsListName]: setsListUpdated });

    if (screenName === "save") {
      useBuildsPersistenceStore.getState().saveSetInMemory(newSet);
    }
  },

  sortBuildsList: (screenName, sortNumber) => {
    const { setsList, setsListName } = get().getBuildsList(screenName);

    const setsListSortable: SortableElement[] = setsList.map((setObj: Build) => {
      const statsArray = setObj.stats;
      const mappedStats: Partial<SortableElement> = {};

      statNames.forEach((statName, index) => {
        mappedStats[statName] = statsArray[index];
      });

      return {
        id: setObj.id,
        name: setObj.name,
        classIds: setObj.classIds,
        stats: setObj.stats,
        ...mappedStats,
      } as SortableElement;
    });

    const setsListSorted = sortElements(setsListSortable, sortNumber);
    const setsListSortedLight = setsListSorted.map((setSorted) => ({
      id: setSorted.id,
      name: setSorted.name,
      classIds: setSorted.classIds,
      stats: setSorted.stats,
    }));

    set({ [setsListName]: setsListSortedLight });
  },
}));

export default useBuildsListStore;
