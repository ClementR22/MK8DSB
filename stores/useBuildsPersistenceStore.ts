import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Data and Types
import useBuildsListStore, { Build } from "./useBuildsListStore";

// Utilities
import {
  deleteAllSavedBuildsInMemory,
  getOnlyBuildsSavedKeysFromMemory,
  loadThingFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";
import { SORT_NUMBER_SAVED_BUILDS_DEFAULT } from "@/constants/constants";

export interface BuildsPersistenceStoreState {
  sortNumberSavedBuilds: number;

  setSortNumberSavedBuilds: (newSortNumberSavedBuilds: number) => Promise<void>;
  fetchBuildsSavedKeys: () => Promise<string[]>;
  fetchBuildsSaved: () => Promise<Build[]>;
  saveBuildInMemory: (build: Build) => Promise<void>;
  removeBuildInMemory: (keyToRemove: string) => Promise<void>;
  updateBuildInMemory: (build: Build) => Promise<void>;
  deleteAllSavedBuilds: () => Promise<void>;
  loadSortNumberFromMemory: () => Promise<void>;
}

const useBuildsPersistenceStore = create<BuildsPersistenceStoreState>((set, get) => ({
  sortNumberSavedBuilds: SORT_NUMBER_SAVED_BUILDS_DEFAULT,

  setSortNumberSavedBuilds: async (newSortNumberSavedBuilds) => {
    await saveThingInMemory("sortNumberSavedBuilds", newSortNumberSavedBuilds);
    set({ sortNumberSavedBuilds: newSortNumberSavedBuilds });
  },

  fetchBuildsSavedKeys: async () => {
    const buildsKeys = await getOnlyBuildsSavedKeysFromMemory();
    return buildsKeys;
  },

  fetchBuildsSaved: async () => {
    const buildsKeys = await get().fetchBuildsSavedKeys();
    const buildsValues = await AsyncStorage.multiGet(buildsKeys);
    const buildsValuesParsed: Build[] = buildsValues
      .map(([, value]) => {
        try {
          return value ? JSON.parse(value) : null;
        } catch (e) {
          console.error("Error parsing saved build:", e);
          return null;
        }
      })
      .filter((build) => build !== null) as Build[];

    return buildsValuesParsed;
  },

  saveBuildInMemory: async (build) => {
    await saveThingInMemory(build.id, build);
  },

  removeBuildInMemory: async (keyToRemove) => {
    if (keyToRemove) {
      await AsyncStorage.removeItem(keyToRemove);
    } else {
      console.warn(`Attempted to remove build ${keyToRemove}, but no key found.`);
    }
  },

  updateBuildInMemory: async (build) => {
    await saveThingInMemory(String(build.id), build);
  },

  deleteAllSavedBuilds: async () => {
    useBuildsListStore.getState().setBuildsListSaved([]);
    await deleteAllSavedBuildsInMemory();
  },

  loadSortNumberFromMemory: async () => {
    await loadThingFromMemory("sortNumberSavedBuilds", get().setSortNumberSavedBuilds);
  },
}));

export default useBuildsPersistenceStore;
