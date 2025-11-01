// Third-party libraries
import { create } from "zustand";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

// Data and Types
import { statNames } from "@/data/stats/statsData";
import { ScreenName } from "@/contexts/ScreenContext";
import { Build } from "@/data/builds/buildsTypes";

// Utilities
import { SortableElement, sortElements } from "@/utils/sortElements";
import { DEFAULT_BUILDS } from "@/constants/defaultBuilds";
import useBuildsPersistenceStore from "./useBuildsPersistenceStore";
import { buildsDataMap } from "@/data/builds/buildsData";
import useDeckStore from "./useDeckStore";
import { deleteAllSavedBuildsInMemory } from "@/utils/asyncStorageOperations";

export const MAX_NUMBER_BUILDS_DISPLAY = 10;
export const MAX_NUMBER_BUILDS_SAVE = 30;

export interface BuildsListStoreState {
  buildsListFound: Build[];
  buildsListDisplayed: Build[];
  buildsListSaved: Build[];
  buildEditedId: string;
  buildIndexInComparator: number;

  getBuildsList: (screenName: ScreenName) => {
    buildsList: Build[] | Build[];
    buildsListName: string;
  };
  getSetBuildsList: (screenName: ScreenName) => (newBuildsList: Build[]) => void;

  getBuild: (screenName: ScreenName, id: string) => Build;

  setBuildsListFound: (newBuildsList: Build[]) => void;
  setBuildsListDisplayed: (newBuildsList: Build[]) => void;
  setBuildsListSaved: (newBuildsList: Build[]) => void;
  deleteAllSavedBuilds: () => Promise<void>;
  setBuildEditedId: (id: string) => void;
  addNewBuildInDisplay: () => void;
  removeBuild: (id: string, screenName: ScreenName) => void;
  checkNameUnique: (buildName: string, screenName: ScreenName) => boolean;
  generateUniqueName: (baseName: string, newIndexInit: number, target: ScreenName) => string;
  renameBuild: (newName: string, screenName: ScreenName, id: string) => void;
  updateBuildsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => void;
  sortBuildsList: (screenName: ScreenName, sortNumber: number) => void;
}

const useBuildsListStore = create<BuildsListStoreState>((set, get) => ({
  buildsListFound: [],
  buildsListDisplayed: [
    { id: DEFAULT_BUILDS.build1.id, dataId: DEFAULT_BUILDS.build1.dataId },
    { id: DEFAULT_BUILDS.build2.id, dataId: DEFAULT_BUILDS.build2.dataId },
  ],
  buildsListSaved: [],
  buildEditedId: null,
  buildIndexInComparator: 2, // = get().buildsListDisplayed.length

  getBuildsList: (screenName) => {
    let buildsListName: string;

    switch (screenName) {
      case "search":
        buildsListName = "buildsListFound";
        break;
      case "display":
        buildsListName = "buildsListDisplayed";
        break;
      case "save":
        buildsListName = "buildsListSaved";
        break;
    }

    const buildsList = get()[buildsListName];
    return { buildsList, buildsListName };
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

  getBuild: (screenName: ScreenName, id: string) => {
    const buildsList = get().getBuildsList(screenName).buildsList;

    const build = buildsList.find((build) => build.id === id);
    return build;
  },

  setBuildsListFound: (newBuildsList) => set({ buildsListFound: newBuildsList }),

  setBuildsListDisplayed: (newBuildsList) => {
    return set({ buildsListDisplayed: newBuildsList });
  },

  setBuildsListSaved: (newBuildsList) => set({ buildsListSaved: newBuildsList }),

  deleteAllSavedBuilds: async () => {
    useBuildsListStore.getState().setBuildsListSaved([]);
    await deleteAllSavedBuildsInMemory();
  },

  setBuildEditedId: (id) => {
    set({ buildEditedId: id });
  },

  addNewBuildInDisplay: () => {
    if (get().buildsListDisplayed.length >= MAX_NUMBER_BUILDS_DISPLAY) {
      throw new Error("buildLimitReached");
    }

    const newIndex = get().buildIndexInComparator;
    const newName = get().generateUniqueName("Build", newIndex, "display");
    const dataId = DEFAULT_BUILDS.build1.dataId;

    set((state) => {
      return {
        buildIndexInComparator: newIndex,
        buildsListDisplayed: [...state.buildsListDisplayed, { id: nanoid(8), dataId: dataId }],
      };
    });
    useDeckStore.getState().updateName(dataId, newName);
  },

  removeBuild: (id, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);
    console.log("danns le remvoe, id,", id);
    console.log("removeBuild, buildsList", buildsList);
    const newList = buildsList.filter((build) => build.id !== id);
    const build = buildsList.find((build) => build.id === id);
    set({ [buildsListName]: newList });

    useDeckStore.getState().removeBuild(build.dataId);
    if (screenName === "save") {
      useBuildsPersistenceStore.getState().removeBuildInMemory(id);
    }
  },

  checkNameUnique: (buildName, screenName) => {
    // ne lance pas d'error
    const { buildsList } = get().getBuildsList(screenName);

    const isNameUnique = !buildsList.some((build) => {
      const name = useDeckStore.getState().deck.get(build.dataId)?.name;
      return name === buildName;
    });
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

  renameBuild: (newName, screenName, id) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);

    const isNameUnique = get().checkNameUnique(newName, screenName);
    if (!isNameUnique) {
      throw new Error("nameAlreadyExists");
    }

    const build = get().getBuild(screenName, id);
    const newBuild = { ...build, name: newName };

    const newBuildsList = buildsList.map((build: Build) => {
      if (build.id === id) {
        return newBuild;
      }
      return build;
    });

    set({ [buildsListName]: newBuildsList });

    if (screenName === "save") {
      const name = useDeckStore.getState().deck.get(build.dataId).name;
      useBuildsPersistenceStore.getState().saveBuildInMemory(newBuild, name);
    }

    useDeckStore.getState().updateName(build.dataId, newName);
  },

  updateBuildsList: (pressedClassIdsObj, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);
    const dataId = Object.values(pressedClassIdsObj).join("-");
    const id = get().buildEditedId;

    const build = get().getBuild(screenName, id);
    const newBuild: Build = { ...build, dataId: dataId };

    const buildsListUpdated = buildsList.map((build) => {
      if (build.id === id) {
        return newBuild;
      }
      return build;
    });

    set({ [buildsListName]: buildsListUpdated });

    if (screenName === "save") {
      const name = useDeckStore.getState().deck.get(build.dataId).name;
      useBuildsPersistenceStore.getState().saveBuildInMemory(newBuild, name);
    }
  },

  sortBuildsList: (screenName, sortNumber) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);

    const buildsListSortable: SortableElement[] = buildsList.map((build: Build) => {
      const buildName = useDeckStore.getState().deck.get(build.dataId)?.name;

      const buildData = buildsDataMap.get(build.dataId);

      const mappedStats: Partial<SortableElement> = {};

      statNames.forEach((statName, index) => {
        mappedStats[statName] = buildData.stats[index];
      });

      return {
        dataId: build.dataId,
        name: buildName,
        classIds: buildData.classIds,
        stats: buildData.stats,
        ...mappedStats,
      } as SortableElement;
    });

    const buildsListSorted = sortElements(buildsListSortable, sortNumber);
    const buildsListSortedLight: Build[] = buildsListSorted.map((build) => {
      const { id, dataId } = buildsList.find((bld) => bld.dataId === build.dataId);
      return {
        id: id,
        dataId: dataId,
      };
    });

    set({ [buildsListName]: buildsListSortedLight });
  },
}));

export default useBuildsListStore;
