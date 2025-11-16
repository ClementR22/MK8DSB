import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Data and Types
import { Build, BuildPersistant } from "@/types/buildsTypes";

// Utilities
import {
  getOnlyBuildsSavedKeysFromMemory,
  loadThingFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";
import { SORT_NUMBER_SAVED_BUILDS_DEFAULT } from "@/constants/constants";

interface BuildsPersistenceStoreState {
  sortNumberSavedBuilds: number;

  setSortNumberSavedBuilds: (newSortNumberSavedBuilds: number) => Promise<void>;
  fetchBuildsSavedKeys: () => Promise<string[]>;
  fetchBuildsSaved: () => Promise<BuildPersistant[]>;
  saveBuildInMemory: (build: Build, name: string) => Promise<void>;
  removeBuildInMemory: (keyToRemove: string) => Promise<void>;
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
    const buildsValuesParsed: BuildPersistant[] = buildsValues
      .map(([, value]) => {
        try {
          return value ? JSON.parse(value) : null;
        } catch (e) {
          console.error("Error parsing saved build:", e);
          return null;
        }
      })
      .filter((buildPersistant) => buildPersistant !== null) as BuildPersistant[];

    return buildsValuesParsed;
  },

  saveBuildInMemory: async (build, name) => {
    const buildPersistant: BuildPersistant = { buildDataId: build.buildDataId, name: name };
    await saveThingInMemory(build.buildDataId, buildPersistant);
  },

  removeBuildInMemory: async (keyToRemove) => {
    if (keyToRemove) {
      await AsyncStorage.removeItem(keyToRemove);
    } else {
      console.warn(`Attempted to remove build ${keyToRemove}, but no key found.`);
    }
  },

  loadSortNumberFromMemory: async () => {
    await loadThingFromMemory("sortNumberSavedBuilds", get().setSortNumberSavedBuilds);
  },
}));

export default useBuildsPersistenceStore;
