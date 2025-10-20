// Third-party libraries
import { create } from "zustand";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

// Data and Types
import { statNames } from "@/data/stats/statsData";
import { ScreenName } from "@/contexts/ScreenContext";

// Utilities
import { getSetStatsFromClassIds } from "@/utils/getSetStatsFromClassIds";
import { SortableElement, sortElements } from "@/utils/sortElements";
import { DEFAULT_SETS } from "@/constants/defaultSets";
import useSetsPersistenceStore from "./useSetsPersistenceStore";

export const MAX_NUMBER_SETS_DISPLAY = 10;
export const MAX_NUMBER_SETS_SAVE = 30;

export interface SetProps {
  id: string;
  name: string;
  classIds: number[];
  stats: number[];
  percentage?: number;
}
export interface SetsListStoreState {
  setsListFound: SetProps[];
  setsListDisplayed: SetProps[];
  setsListSaved: SetProps[];
  setCardEditedId: string;
  setKeyInDisplay: number;

  getSetsList: (screenName: ScreenName) => {
    setsList: SetProps[] | SetProps[];
    setsListName: string;
  };
  getSetSetsList: (screenName: ScreenName) => (newSetsList: SetProps[]) => void;

  getSet: (screenName: ScreenName, id: string) => SetProps;

  setSetsListFound: (newSetsList: SetProps[]) => void;
  setSetsListDisplayed: (newSetsList: SetProps[]) => void;
  setSetsListSaved: (newSetsList: SetProps[]) => void;
  setSetCardEditedId: (id: string) => void;
  addNewSetInDisplay: () => void;
  removeSet: (id: string, screenName: ScreenName) => void;
  checkNameUnique: (setName: string, screenName: ScreenName) => boolean;
  generateUniqueName: (baseName: string, newIndexInit: number, target: ScreenName) => string;
  renameSet: (newName: string, screenName: ScreenName, id: string) => void;
  updateSetsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => void;
  sortSetsList: (screenName: ScreenName, sortNumber: number) => void;
}

const useSetsListStore = create<SetsListStoreState>((set, get) => ({
  setsListFound: [],
  setsListDisplayed: [
    { id: nanoid(8), ...DEFAULT_SETS.set1 },
    { id: nanoid(8), ...DEFAULT_SETS.set2 },
  ],
  setsListSaved: [],
  setCardEditedId: null,
  setKeyInDisplay: 2,

  getSetsList: (screenName) => {
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

  getSetSetsList: (screenName: ScreenName) => {
    let setSetsListName: string;

    switch (screenName) {
      case "search":
        setSetsListName = "setSetsListFound";
        break;
      case "display":
        setSetsListName = "setSetsListDisplayed";
        break;
      case "save":
        setSetsListName = "setSetsListSaved";
        break;
    }

    const setSetsList = get()[setSetsListName];
    return setSetsList;
  },

  getSet: (screenName: ScreenName, id: string) => {
    const setList = get().getSetsList(screenName).setsList;

    const s = setList.find((s) => s.id === id);
    return s;
  },

  setSetsListFound: (newSetsList) => set({ setsListFound: newSetsList }),

  setSetsListDisplayed: (newSetsList) => set({ setsListDisplayed: newSetsList }),

  setSetsListSaved: (newSetsList) => set({ setsListSaved: newSetsList }),

  setSetCardEditedId: (id) => {
    set({ setCardEditedId: id });
  },

  addNewSetInDisplay: () => {
    if (get().setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY) {
      throw new Error("SetLimitReached");
    }

    const newIndex = get().setKeyInDisplay;
    const newName = get().generateUniqueName("Set", newIndex, "display");

    set((state) => {
      return {
        setKeyInDisplay: newIndex,
        setsListDisplayed: [...state.setsListDisplayed, { ...DEFAULT_SETS.set1, id: nanoid(8), name: newName }],
      };
    });
  },

  removeSet: (id, screenName) => {
    const { setsList, setsListName } = get().getSetsList(screenName);
    const newList = setsList.filter((set) => set.id !== id);
    set({ [setsListName]: newList });
  },

  checkNameUnique: (setName, screenName) => {
    // ne lance pas d'error
    const { setsList } = get().getSetsList(screenName);

    const isNameUnique = !setsList.some((set) => set.name === setName);
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
        throw new Error("CannotGenerateUniqueName");
      }
    } while (!get().checkNameUnique(newName, target));

    return newName;
  },

  renameSet: (newName, screenName, id) => {
    const { setsList, setsListName } = get().getSetsList(screenName);

    const isNameUnique = get().checkNameUnique(newName, screenName);
    if (!isNameUnique) {
      throw new Error("NameAlreadyExists");
    }

    const s = get().getSet(screenName, id);
    const newSet = { ...s, name: newName };

    const newSetsList = setsList.map((s: SetProps) => {
      if (s.id === id) {
        return newSet;
      }
      return s;
    });

    set({ [setsListName]: newSetsList });

    if (screenName === "save") {
      useSetsPersistenceStore.getState().saveSetInMemory(newSet);
    }
  },

  updateSetsList: (pressedClassIdsObj, screenName) => {
    const { setsList, setsListName } = get().getSetsList(screenName);
    const newClassIds = Object.values(pressedClassIdsObj);
    const id = get().setCardEditedId;

    const s = get().getSet(screenName, id);
    const newSet = { ...s, classIds: newClassIds, stats: getSetStatsFromClassIds(newClassIds) };

    const setsListUpdated = setsList.map((s) => {
      if (s.id === id) {
        return newSet;
      }
      return s;
    });

    set({ [setsListName]: setsListUpdated });

    if (screenName === "save") {
      useSetsPersistenceStore.getState().saveSetInMemory(newSet);
    }
  },

  sortSetsList: (screenName, sortNumber) => {
    const { setsList, setsListName } = get().getSetsList(screenName);

    const setsListSortable: SortableElement[] = setsList.map((setObj: SetProps) => {
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

export default useSetsListStore;
