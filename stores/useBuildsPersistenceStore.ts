import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Data and Types
import { Build } from "./useBuildsListStore";

// Utilities
import {
  deleteAllSavedSetsInMemory,
  getOnlySetsSavedKeysFromMemory,
  loadThingFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";
import { SORT_NUMBER_SAVED_SETS_DEFAULT } from "@/constants/constants";

export interface BuildsPersistenceStoreState {
  sortNumberSavedSets: number;

  setSortNumberSavedSets: (newSortNumberSavedSets: number) => Promise<void>;
  fetchSetsSavedKeys: () => Promise<string[]>;
  fetchSetsSaved: () => Promise<Build[]>;
  saveSetInMemory: (setToSave: Build) => Promise<void>;
  removeSetInMemory: (keyToRemove: string) => Promise<void>;
  updateSetInMemory: (setObj: Build) => Promise<void>;
  deleteAllSavedSets: () => Promise<void>;
  loadSortNumberFromMemory: () => Promise<void>;
}

const useBuildsPersistenceStore = create<BuildsPersistenceStoreState>((set, get) => ({
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
    const buildsData = await AsyncStorage.multiGet(setsKeys);
    const buildsDataParsed: Build[] = buildsData
      .map(([, value]) => {
        try {
          return value ? JSON.parse(value) : null;
        } catch (e) {
          console.error("Error parsing saved build:", e);
          return null;
        }
      })
      .filter((build) => build !== null) as Build[];

    return buildsDataParsed;
  },

  saveSetInMemory: async (setToSave) => {
    await saveThingInMemory(setToSave.id, setToSave);
  },

  removeSetInMemory: async (keyToRemove) => {
    if (keyToRemove) {
      await AsyncStorage.removeItem(keyToRemove);
    } else {
      console.warn(`Attempted to remove build ${keyToRemove}, but no key found.`);
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

export default useBuildsPersistenceStore;
