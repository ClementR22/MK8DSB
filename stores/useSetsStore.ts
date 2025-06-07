import { create } from "zustand";
import { statNames } from "@/data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "@/utils/toast";
import { getSetStatsFromElementsClassIds } from "@/utils/getSetStatsFromElementsClassIds";
import * as Clipboard from "expo-clipboard";
import {
  deleteAllSavedSetsInMemory,
  getOnlySetsSavedKeysFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";

// Types
export type StatName = string;

export interface ChosenStat {
  name: StatName;
  checked: boolean;
  value: number | null;
  statFilterNumber: number;
}

export interface VisibleStat {
  name: StatName;
  checked: boolean;
}

export interface SetObject {
  name: string;
  classIds: number[];
  stats: number[];
}

export type ScreenName = "search" | "display" | "save" | "gallery";

export interface SetsStoreState {
  chosenStats: ChosenStat[];
  setsListDisplayed: SetObject[];
  setsListSaved: SetObject[];
  setsListFound: SetObject[];
  setsSavedKeys: string[];
  setCardEdittedIndex: number;

  setChosenStats: (newChosenStats: ChosenStat[]) => void;
  setSetsListFound: (newSetsList: SetObject[]) => void;
  setSetCardEdittedIndex: (newIndex: number) => void;
  updateStatValue: (name: string, newValue: number) => void;
  syncWithChosenStats: (setStatsVisibleList: (list: VisibleStat[]) => void) => void;
  setStatFilterNumber: (statName: string, newState: number) => void;
  getSetsSavedKeys: () => Promise<string[]>;
  fetchSavedSets: () => Promise<void>;
  addNewSetInDisplay: () => void;
  loadSetToDisplay: (setToLoad: SetObject) => void;
  removeSet: (index: number, screenName: ScreenName) => void;
  removeSetInMemory: (index: number) => Promise<void>;
  loadSetToSearch: (set: SetObject) => void;
  loadSetSaveToSearch: (index: number) => void;
  loadSetDisplayToSearch: (index: number) => void;
  loadSetSaveToDisplay: (index: number) => void;
  loadSetSearchToDisplay: (index: number) => void;
  saveSet: (setToSave: SetObject) => Promise<boolean>;
  saveSetInMemory: (setToSave: SetObject) => Promise<void>;
  saveSetFromDisplay: (index: number) => Promise<void>;
  saveSetFromFound: () => Promise<void>;
  renameSet: (newName: string, screenName: ScreenName, index: number) => void;
  updateSetsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => Promise<void>;
  setSetInMemory: (key: string | number, setObj: SetObject) => Promise<void>;
  sortSetsSavedKeys: () => void;
  exportSet: (index: number, screenName: ScreenName) => void;
  importSet: (setCard: SetObject, screenName: ScreenName) => void;
  deleteAllSavedSets: () => void;
}

// Données par défaut
const setDefault: SetObject = {
  name: "Set 0",
  classIds: [9, 16, 30, 39],
  stats: [4, 3.75, 4.25, 4.5, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 4],
};

// Store Zustand typé
const useSetsStore = create<SetsStoreState>((set, get) => ({
  chosenStats: statNames.map((statName, index) => ({
    name: statName,
    checked: index === 0,
    value: index === 0 ? 0 : null,
    statFilterNumber: 0,
  })),

  setsListDisplayed: [{ ...setDefault }],
  setsListSaved: [],
  setsListFound: [],
  setsSavedKeys: [],
  setCardEdittedIndex: 0,

  setChosenStats: (newChosenStats) => {
    set({ chosenStats: newChosenStats });
  },

  setSetsListFound: (newSetsList) => set({ setsListFound: newSetsList }),

  setSetCardEdittedIndex: (newNumber) => {
    set({ setCardEdittedIndex: newNumber });
  },

  updateStatValue: (name, newValue) =>
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) => (stat.name === name ? { ...stat, value: newValue } : stat)),
    })),

  syncWithChosenStats: (setStatsVisibleList) => {
    setStatsVisibleList(get().chosenStats);
  },

  setStatFilterNumber: (statName, newState) => {
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) =>
        stat.name === statName ? { ...stat, statFilterNumber: newState } : stat
      ),
    }));
  },

  getSetsSavedKeys: async () => {
    const setsKeys = await getOnlySetsSavedKeysFromMemory();
    const sorted = setsKeys.sort((a, b) => a.localeCompare(b));
    set({ setsSavedKeys: sorted });
    return sorted;
  },

  fetchSavedSets: async () => {
    const keys = await get().getSetsSavedKeys();
    const kvs = await AsyncStorage.multiGet(keys);
    const parsed: SetObject[] = kvs.map(([, value]) => JSON.parse(value ?? "{}"));
    set({ setsListSaved: parsed });
  },

  addNewSetInDisplay: () => {
    const existingNames = get().setsListDisplayed.map((s) => s.name);
    let n = 0;
    while (existingNames.includes(`Set ${n}`)) n++;
    set((state) => ({
      setsListDisplayed: [...state.setsListDisplayed, { ...setDefault, name: `Set ${n}` }],
    }));
  },

  loadSetToDisplay: (setToLoad) => {
    set((state) => ({
      setsListDisplayed: [...state.setsListDisplayed, setToLoad],
    }));
  },

  removeSet: (index, screenName) => {
    const { setsListDisplayed, setsListSaved } = get();

    const isDisplay = screenName === "display";
    const targetList = isDisplay ? setsListDisplayed : setsListSaved;
    const listName = isDisplay ? "setsListDisplayed" : "setsListSaved";

    if (isDisplay && targetList.length === 1) {
      showToast("Erreur", "Vous devez garder au moins 1 set");
      return;
    }
    if (!isDisplay) {
      get().removeSetInMemory(index);
    }

    const newList = targetList.filter((_, i) => i !== index);
    set({
      [listName]: newList,
    } as any);
  },

  removeSetInMemory: async (index) => {
    const key = get().setsSavedKeys[index];
    await AsyncStorage.removeItem(key);
    set((state) => ({
      setsSavedKeys: state.setsSavedKeys.filter((_, i) => i !== index),
    }));
  },

  loadSetToSearch: (setToLoad) => {
    const newStats = get().chosenStats.map((stat, i) => ({
      ...stat,
      value: setToLoad.stats[i],
    }));
    set({ chosenStats: newStats });
    showToast("Succès", "Les stats du set ont été chargées");
  },

  loadSetSaveToSearch: (index) => {
    get().loadSetToSearch(get().setsListSaved[index]);
  },

  loadSetDisplayToSearch: (index) => {
    get().loadSetToSearch(get().setsListDisplayed[index]);
  },

  loadSetSaveToDisplay: (index) => {
    get().loadSetToDisplay(get().setsListSaved[index]);
    showToast("Succès", "Le set a été chargé");
  },

  loadSetSearchToDisplay: (index) => {
    get().loadSetToDisplay(get().setsListFound[index]);
    showToast("Succès", "Le set a été ajouté à l'écran de comparaison");
  },

  saveSet: async (setToSave) => {
    try {
      set((state) => ({
        setsListSaved: [...state.setsListSaved, setToSave],
      }));
      await get().saveSetInMemory(setToSave);
      showToast("Succès", "Le set est enregistré");
      return true;
    } catch (e) {
      alert(e);
      return false;
    }
  },

  saveSetInMemory: async (setToSave) => {
    let key = 0;
    const keys = get().setsSavedKeys;
    while (keys.includes(String(key))) key++;
    set((state) => ({
      setsSavedKeys: [...state.setsSavedKeys, String(key)],
    }));
    await saveThingInMemory(String(key), setToSave);
  },

  saveSetFromDisplay: async (index) => {
    await get().saveSet(get().setsListDisplayed[index]);
  },

  saveSetFromFound: async () => {
    await get().saveSet(get().setsListFound[get().setCardEdittedIndex]);
  },

  renameSet: (newName, screenName, setCardIndex) => {
    const index = setCardIndex != null ? setCardIndex : get().setCardEdittedIndex;
    const listName =
      screenName === "search" ? "setsListFound" : screenName === "display" ? "setsListDisplayed" : "setsListSaved";
    const list = get()[listName as keyof SetsStoreState] as SetObject[];
    const updated = list.map((set, i) => {
      if (i === index) {
        const renamed = { ...set, name: newName };
        if (screenName === "save") {
          const key = get().setsSavedKeys[index];
          get().setSetInMemory(key, renamed);
        }
        return renamed;
      }
      return set;
    });

    set({ [listName]: updated } as any);
  },

  updateSetsList: async (pressedClassIdsObj, screenName) => {
    const listName = screenName === "display" ? "setsListDisplayed" : "setsListSaved";
    const list = get()[listName as keyof SetsStoreState] as SetObject[];
    const classIds = Object.values(pressedClassIdsObj);
    const setCardEdittedIndex = get().setCardEdittedIndex;

    const updated = list.map((set, setCardIndex) => {
      if (setCardIndex === setCardEdittedIndex) {
        const newSet = {
          ...set,
          classIds,
          stats: getSetStatsFromElementsClassIds(classIds),
        };
        if (screenName === "save") {
          const key = get().setsSavedKeys[setCardEdittedIndex];
          get().setSetInMemory(key, newSet);
        }
        return newSet;
      }
      return set;
    });

    set({ [listName]: updated } as any);
  },

  setSetInMemory: async (key, setObj) => {
    await saveThingInMemory(String(key), setObj);
  },

  sortSetsSavedKeys: () => {
    const keys = get().setsSavedKeys;
    const sets = get().setsListSaved;

    const keyToName: Record<string, string> = {};
    keys.forEach((key, i) => {
      keyToName[key] = sets[i]?.name || "";
    });

    const sortedKeys = [...keys].sort((a, b) => keyToName[a].localeCompare(keyToName[b]));
    const sortedSets = sortedKeys.map((key) => sets[keys.indexOf(key)]);

    set({
      setsSavedKeys: sortedKeys,
      setsListSaved: sortedSets,
    });

    sortedSets.forEach((setObj, i) => get().setSetInMemory(i, setObj));
  },

  exportSet: (index, screenName) => {
    console.log("ok", screenName);
    const list =
      screenName === "search"
        ? get().setsListFound
        : screenName === "display"
        ? get().setsListDisplayed
        : get().setsListSaved;
    console.log("setsListFound", get().setsListFound[index]);
    const { name, classIds } = list[index];
    const json = JSON.stringify({ name, classIds });
    Clipboard.setStringAsync(json);
    showToast("Succès", "Set copié dans le presse-papier !");
  },

  importSet: (setCard: SetObject, screenName: ScreenName) => {
    const loadSet =
      screenName === "search"
        ? get().loadSetToSearch
        : screenName === "display"
        ? get().loadSetToDisplay
        : get().saveSet;
    loadSet(setCard);
  },

  deleteAllSavedSets: () => {
    set({ setsListSaved: [] });
    deleteAllSavedSetsInMemory();
  },
}));

export default useSetsStore;
