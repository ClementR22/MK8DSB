import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Data and Types
import { SetObject } from "./useSetsListStore";

// Utilities
import {
  deleteAllSavedSetsInMemory,
  getOnlySetsSavedKeysFromMemory,
  loadThingFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";
import { SORT_NUMBER_SAVED_SETS_DEFAULT } from "@/constants/constants";

export interface SetsPersistenceStoreState {
  sortNumberSavedSets: number;

  setSortNumberSavedSets: (newSortNumberSavedSets: number) => Promise<void>;
  fetchSetsSavedKeys: () => Promise<string[]>;
  fetchSetsSaved: () => Promise<SetObject[]>;
  saveSetInMemory: (setToSave: SetObject) => Promise<void>;
  removeSetInMemory: (keyToRemove: string) => Promise<void>;
  updateSetInMemory: (setObj: SetObject) => Promise<void>;
  deleteAllSavedSets: () => Promise<void>;
  loadSortNumberFromMemory: () => Promise<void>;
}

const useSetsPersistenceStore = create<SetsPersistenceStoreState>((set, get) => ({
  sortNumberSavedSets: SORT_NUMBER_SAVED_SETS_DEFAULT,

  setSortNumberSavedSets: async (newSortNumberSavedSets) => {
    await saveThingInMemory("sortNumberSavedSets", newSortNumberSavedSets);
    set({ sortNumberSavedSets: newSortNumberSavedSets });
  },

  fetchSetsSavedKeys: async () => {
    const setsKeys = await getOnlySetsSavedKeysFromMemory();
    return setsKeys;
  },

  fetchSetsSaved: async () => {
    const setsKeys = await get().fetchSetsSavedKeys();
    const setsData = await AsyncStorage.multiGet(setsKeys);
    const setsDataParsed: SetObject[] = setsData
      .map(([, value]) => {
        try {
          return value ? JSON.parse(value) : null;
        } catch (e) {
          console.error("Error parsing saved set:", e);
          return null;
        }
      })
      .filter((set) => set !== null) as SetObject[];

    return setsDataParsed;
  },

  saveSetInMemory: async (setToSave) => {
    await saveThingInMemory(setToSave.id, setToSave);
  },

  removeSetInMemory: async (keyToRemove) => {
    if (keyToRemove) {
      await AsyncStorage.removeItem(keyToRemove);
    } else {
      console.warn(`Attempted to remove set ${keyToRemove}, but no key found.`);
    }
  },

  updateSetInMemory: async (setObj) => {
    await saveThingInMemory(String(setObj.id), setObj);
  },

  deleteAllSavedSets: async () => {
    await deleteAllSavedSetsInMemory();
  },

  loadSortNumberFromMemory: async () => {
    await loadThingFromMemory("sortNumberSavedSets", get().setSortNumberSavedSets);
  },
}));

export default useSetsPersistenceStore;
