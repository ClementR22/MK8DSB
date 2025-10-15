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

export const MAX_NUMBER_SETS_DISPLAY = 10;

export interface SetObject {
  id: string;
  name: string;
  classIds: number[];
  stats: number[];
}

export interface SetFoundObject extends SetObject {
  percentage: number;
}

export interface SetsListStoreState {
  setsListFound: SetFoundObject[];
  setsListDisplayed: SetObject[];
  setsListSaved: SetObject[];
  setCardEditedId: string;
  setKeyInDisplay: number;

  getSetsListFromScreenName: (screenName: ScreenName) => {
    setsList: SetObject[] | SetFoundObject[];
    setsListName: string;
    isSaveScreen: boolean;
  };
  setSetsListFound: (newSetsList: SetFoundObject[]) => void;
  setSetsListSaved: (newSetsList: SetObject[]) => void;
  setSetCardEditedId: (id: string) => void;
  addNewSetInDisplay: () => void;
  addSetToDisplay: (setToAdd: SetObject) => void;
  addSetToSaved: (setToAdd: SetObject) => void;
  removeSet: (id: string, screenName: ScreenName) => void;
  checkNameUnique: (name: string, screenName: ScreenName) => boolean;
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

  getSetsListFromScreenName: (screenName) => {
    let setsListName: string;
    let isSaveScreen = false;

    switch (screenName) {
      case "search":
        setsListName = "setsListFound";
        break;
      case "display":
        setsListName = "setsListDisplayed";
        break;
      case "save":
        setsListName = "setsListSaved";
        isSaveScreen = true;
        break;
    }

    const setsList = get()[setsListName];
    return { setsList, setsListName, isSaveScreen };
  },

  setSetsListFound: (newSetsList) => set({ setsListFound: newSetsList }),

  setSetsListSaved: (newSetsList) => set({ setsListSaved: newSetsList }),

  setSetCardEditedId: (id) => {
    set({ setCardEditedId: id });
  },

  addNewSetInDisplay: () => {
    if (get().setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY) {
      throw new Error("SetLimitReached");
    }

    let newIndex = get().setKeyInDisplay;
    let newName: string;
    let attempts = 0;
    const MAX_ATTEMPTS = 20;

    do {
      newIndex++;
      newName = `Set ${newIndex}`;
      attempts++;

      if (attempts > MAX_ATTEMPTS) {
        throw new Error("CannotGenerateUniqueName");
      }
    } while (!get().checkNameUnique(newName, "display"));

    set((state) => {
      return {
        setKeyInDisplay: newIndex,
        setsListDisplayed: [...state.setsListDisplayed, { ...DEFAULT_SETS.set1, id: nanoid(8), name: newName }],
      };
    });
  },

  addSetToDisplay: (setToAdd) => {
    const isNameUnique = get().checkNameUnique(setToAdd.name, "display");
    if (!isNameUnique) {
      throw new Error("NameAlreadyExists");
    }

    if (get().setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY) {
      throw new Error("SetLimitReached");
    }

    const setToAddWithNewId = { ...setToAdd, id: nanoid(8) };
    set((state) => ({
      setsListDisplayed: [...state.setsListDisplayed, setToAddWithNewId],
    }));
  },

  addSetToSaved: (setToAdd) => {
    let nameUnique = setToAdd.name;
    let newIndex = 0;

    while (!get().checkNameUnique(nameUnique, "save")) {
      nameUnique = `${setToAdd.name} (${newIndex})`;
      newIndex++;
    }

    const setToAddWithNewId = { ...setToAdd, name: nameUnique, id: nanoid(8) };

    set((state) => ({
      setsListSaved: [...state.setsListSaved, setToAddWithNewId],
    }));

    return setToAddWithNewId;
  },

  removeSet: (id, screenName) => {
    const { setsList, setsListName } = get().getSetsListFromScreenName(screenName);
    const newList = setsList.filter((set) => set.id !== id);
    set({ [setsListName]: newList } as any);
  },

  checkNameUnique: (name, screenName) => {
    const { setsList } = get().getSetsListFromScreenName(screenName);
    return !setsList.some((set) => set.name === name);
  },

  renameSet: (newName, screenName, setToShowId) => {
    const { setsList, setsListName } = get().getSetsListFromScreenName(screenName);

    const isNewNameUniqueExceptCurrent = setsList.every((set) => {
      return set.name !== newName;
    });

    if (!isNewNameUniqueExceptCurrent) {
      throw new Error("NameAlreadyExists");
    }

    const setsListUpdated = setsList.map((set: SetObject) => {
      if (set.id === setToShowId) {
        return { ...set, name: newName };
      }
      return set;
    });

    set({ [setsListName]: setsListUpdated } as any);
  },

  updateSetsList: (pressedClassIdsObj, screenName) => {
    const { setsList, setsListName } = get().getSetsListFromScreenName(screenName);
    const newClassIds = Object.values(pressedClassIdsObj);
    const setCardEditedId = get().setCardEditedId;

    const setsListUpdated = setsList.map((set) => {
      if (set.id === setCardEditedId) {
        return {
          ...set,
          classIds: newClassIds,
          stats: getSetStatsFromClassIds(newClassIds),
        };
      }
      return set;
    });

    set({ [setsListName]: setsListUpdated } as any);
  },

  sortSetsList: (screenName, sortNumber) => {
    const { setsList, setsListName } = get().getSetsListFromScreenName(screenName);

    const setsListSortable: SortableElement[] = setsList.map((setObj: SetObject) => {
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
