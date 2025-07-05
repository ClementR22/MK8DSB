import { create } from "zustand";
import { statNames } from "@/data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "@/utils/toast";
import { getSetStatsFromClassIds } from "@/utils/getSetStatsFromClassIds";
import * as Clipboard from "expo-clipboard";
import {
  deleteAllSavedSetsInMemory,
  getOnlySetsSavedKeysFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";
import { ScreenName } from "@/contexts/ScreenContext";
import { ResultStats } from "@/contexts/ResultStatsContext";

export type StatName = string;

const MAX_NUMBER_SETS_DISPLAY = 10;
export interface ChosenStat {
  name: StatName;
  checked: boolean;
  value: number | null;
  statFilterNumber: number;
}

export interface SetObject {
  name: string;
  classIds: number[];
  stats: number[];
}

export interface SetFoundObject extends SetObject {
  percentage: number;
}

export interface SetsStoreState {
  chosenStats: ChosenStat[];
  setsListDisplayed: SetObject[];
  setsListSaved: SetObject[];
  setsListFound: SetFoundObject[];
  setsSavedKeys: string[];
  setCardEditedIndex: number;
  setKeyInDisplay: number;

  setChosenStats: (newChosenStats: ChosenStat[]) => void;
  setSetsListFound: (newSetsList: SetFoundObject[]) => void;
  setsetCardEditedIndex: (newIndex: number) => void;
  updateStatValue: (name: string, newValue: number) => void;
  syncWithChosenStats: (setResultStats: (list: ResultStats) => void) => void;
  setStatFilterNumber: (statName: string, newState: number) => void;
  fetchSetsSavedKeys: () => Promise<string[]>;
  fetchSavedSets: () => Promise<void>;
  addNewSetInDisplay: () => void;
  loadSetToDisplay: (setToLoad: SetObject) => void;
  loadSetToSave: (setTOLoad: SetObject) => void;
  removeSet: (index: number, screenName: ScreenName) => void;
  removeSetInMemory: (index: number) => Promise<void>;
  loadSetToSearch: (set: SetObject) => void;
  loadSetSaveToSearch: (index: number) => void;
  loadSetDisplayToSearch: (index: number) => void;
  loadSetSaveToDisplay: (index: number) => void;
  loadSetSearchToDisplay: (index: number) => void;
  checkNameUnique: (name: string, screenName: ScreenName) => boolean;
  saveSet: (screenName: ScreenName, index: number) => boolean;
  saveSetInMemory: (setToSave: SetObject) => Promise<void>;
  renameSet: (newName: string, screenName: ScreenName, index: number) => boolean;
  updateSetsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => Promise<void>;
  setSetInMemory: (key: string | number, setObj: SetObject) => Promise<void>;
  sortSetsSavedKeys: () => void;
  exportSet: (index: number, screenName: ScreenName) => void;
  importSet: (setCard: SetObject, screenName: ScreenName) => void;
  deleteAllSavedSets: () => void;
}

const setDefault: SetObject = {
  name: "Set 1",
  classIds: [9, 16, 30, 39],
  stats: [4, 3.75, 4.25, 4.5, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 4],
};

const useSetsStore = create<SetsStoreState>((set, get) => ({
  chosenStats: statNames.map((statName, index) => ({
    name: statName,
    checked: index === 0,
    value: 0,
    statFilterNumber: 0,
  })),

  setsListDisplayed: [{ ...setDefault }],
  setsListSaved: [],
  setsListFound: [],
  setsSavedKeys: [],
  setCardEditedIndex: 0,
  setKeyInDisplay: 1,

  setChosenStats: (newChosenStats) => {
    set({ chosenStats: newChosenStats });
  },

  setSetsListFound: (newSetsList) => set({ setsListFound: newSetsList }),

  setsetCardEditedIndex: (newNumber) => {
    set({ setCardEditedIndex: newNumber });
  },

  updateStatValue: (name, newValue) =>
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) => (stat.name === name ? { ...stat, value: newValue } : stat)),
    })),

  syncWithChosenStats: (setResultStats) => {
    setResultStats(get().chosenStats);
  },

  setStatFilterNumber: (statName, newState) => {
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) =>
        stat.name === statName ? { ...stat, statFilterNumber: newState } : stat
      ),
    }));
  },

  fetchSetsSavedKeys: async () => {
    const setsKeys = await getOnlySetsSavedKeysFromMemory();
    const sorted = setsKeys.sort((a, b) => a.localeCompare(b));
    set({ setsSavedKeys: sorted });
    return sorted;
  },

  fetchSavedSets: async () => {
    const keys = await get().fetchSetsSavedKeys();
    const kvs = await AsyncStorage.multiGet(keys);
    const parsed: SetObject[] = kvs.map(([, value]) => JSON.parse(value ?? "{}"));
    set({ setsListSaved: parsed });
  },

  addNewSetInDisplay: () => {
    if (get().setsListDisplayed.length < MAX_NUMBER_SETS_DISPLAY) {
      let newIndex = get().setKeyInDisplay;
      let newName: string;
      do {
        newIndex++;
        newName = `Set ${newIndex}`;
      } while (!get().checkNameUnique(newName, "display"));

      set((state) => {
        return {
          setKeyInDisplay: newIndex,
          setsListDisplayed: [...state.setsListDisplayed, { ...setDefault, name: `Set ${newIndex}` }],
        };
      });
    } else {
      showToast("Erreur" + " " + "Vous ne pouvez pas comparer plus de " + MAX_NUMBER_SETS_DISPLAY + " sets.");
    }
  },

  loadSetToDisplay: (setToLoad) => {
    const isNameUnique = get().checkNameUnique(setToLoad.name, "display");
    if (!isNameUnique) return false;

    if (get().setsListDisplayed.length < MAX_NUMBER_SETS_DISPLAY) {
      set((state) => ({
        setsListDisplayed: [...state.setsListDisplayed, setToLoad],
      }));
      showToast("Succès" + " " + "Le set a été ajouté à l'écran de comparaison");
    } else {
      showToast("Erreur" + " " + "Vous ne pouvez pas comparer plus de " + MAX_NUMBER_SETS_DISPLAY + " sets.");
    }
  },

  loadSetToSave: (setToLoad) => {
    const isNameUnique = get().checkNameUnique(setToLoad.name, "save");
    if (!isNameUnique) {
      let newIndex = -1;
      let newName: string;
      do {
        newIndex++;
        newName = setToLoad.name + `(${newIndex})`;
        console.log("newName", newName);
      } while (!get().checkNameUnique(newName, "display"));
      setToLoad = { ...setToLoad, name: newName };
    }

    set((state) => ({
      setsListSaved: [...state.setsListSaved, setToLoad],
    }));
    showToast("Succès" + " " + "Le set a été chargé dans les favoris");
  },

  removeSet: (index, screenName) => {
    const isSave = screenName === "save";
    const targetList = !isSave ? get().setsListDisplayed : get().setsListSaved;
    const listName = !isSave ? "setsListDisplayed" : "setsListSaved";

    if (isSave) {
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
    showToast("Succès" + " " + "Les stats du set ont été chargées");
  },

  loadSetSaveToSearch: (index) => {
    get().loadSetToSearch(get().setsListSaved[index]);
  },

  loadSetDisplayToSearch: (index) => {
    get().loadSetToSearch(get().setsListDisplayed[index]);
  },

  loadSetSaveToDisplay: (index) => {
    get().loadSetToDisplay(get().setsListSaved[index]);
  },

  loadSetSearchToDisplay: (index) => {
    get().loadSetToDisplay(get().setsListFound[index]);
  },

  checkNameUnique: (name, screenName) => {
    const targetList =
      screenName === "search"
        ? get().setsListFound
        : screenName === "display"
        ? get().setsListDisplayed
        : get().setsListSaved;

    const setsNames = targetList.map((set) => set.name);

    if (setsNames.includes(name)) {
      showToast("Erreur" + " " + "Ce nom de set existe déjà");
      return false;
    }
    return true;
  },

  saveSet: (screenName, index) => {
    const list = screenName === "search" ? get().setsListFound : (get().setsListDisplayed as SetFoundObject[]);

    try {
      const setSelected = list[index];
      if (!setSelected) {
        throw "Le set n'existe pas";
      }
      const { percentage, ...setToSave } = setSelected;

      const isNameUnique = get().checkNameUnique(setToSave.name, "save");
      if (!isNameUnique) return false;

      set((state) => ({
        setsListSaved: [...state.setsListSaved, setToSave],
      }));
      get().saveSetInMemory(setToSave);
      showToast("Succès" + " " + "Le set a été enregistré");
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

  renameSet: (newName, screenName, setCardIndex) => {
    const listName =
      screenName === "search" ? "setsListFound" : screenName === "display" ? "setsListDisplayed" : "setsListSaved";

    const list = get()[listName] as SetObject[] | SetFoundObject[];

    const updated = list.map((set: SetObject, i: number): SetObject => {
      if (i === setCardIndex) {
        const renamed = { ...set, name: newName };

        if (screenName === "save") {
          const key = get().setsSavedKeys[setCardIndex];
          get().setSetInMemory(key, renamed);
        }

        return renamed;
      }
      return set;
    });
    set({ [listName]: updated } as any);
    return true;
  },

  updateSetsList: async (pressedClassIdsObj, screenName) => {
    const listName = screenName === "display" ? "setsListDisplayed" : "setsListSaved";
    const list = get()[listName as keyof SetsStoreState] as SetObject[];
    const classIds = Object.values(pressedClassIdsObj);
    const setCardEditedIndex = get().setCardEditedIndex;

    const updated = list.map((set, setCardIndex) => {
      if (setCardIndex === setCardEditedIndex) {
        const newSet = {
          ...set,
          classIds,
          stats: getSetStatsFromClassIds(classIds),
        };
        if (screenName === "save") {
          const key = get().setsSavedKeys[setCardEditedIndex];
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
    const list =
      screenName === "search"
        ? get().setsListFound
        : screenName === "display"
        ? get().setsListDisplayed
        : get().setsListSaved;

    console.log("list", list);
    console.log("index", index);
    console.log(list[index]);

    const { name, classIds } = list[index];
    const json = JSON.stringify({ name, classIds });
    Clipboard.setStringAsync(json);
    showToast("Succès" + " " + "le set a été copié dans le presse-papier !");
  },

  importSet: (setCard: SetObject, screenName: ScreenName) => {
    const loadSet =
      screenName === "search"
        ? get().loadSetToSearch
        : screenName === "display"
        ? get().loadSetToDisplay
        : get().loadSetToSave;
    loadSet(setCard);
  },

  deleteAllSavedSets: () => {
    set({ setsListSaved: [] });
    deleteAllSavedSetsInMemory();
  },
}));

export default useSetsStore;
