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

export const MAX_NUMBER_BUILDS_DISPLAY = 10;
export const MAX_NUMBER_BUILDS_SAVE = 30;

export interface Build {
  id: string;
  name: string;
  classIds: number[];
  stats: number[];
  percentage?: number;
}
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
    { id: nanoid(8), ...DEFAULT_BUILDS.build1 },
    { id: nanoid(8), ...DEFAULT_BUILDS.build2 },
  ],
  buildsListSaved: [],
  buildEditedId: null,
  buildIndexInComparator: 2,

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

  setBuildsListDisplayed: (newBuildsList) => set({ buildsListDisplayed: newBuildsList }),

  setBuildsListSaved: (newBuildsList) => set({ buildsListSaved: newBuildsList }),

  setBuildEditedId: (id) => {
    set({ buildEditedId: id });
  },

  addNewBuildInDisplay: () => {
    if (get().buildsListDisplayed.length >= MAX_NUMBER_BUILDS_DISPLAY) {
      throw new Error("buildLimitReached");
    }

    const newIndex = get().buildIndexInComparator;
    const newName = get().generateUniqueName("Build", newIndex, "display");

    set((state) => {
      return {
        buildIndexInComparator: newIndex,
        buildsListDisplayed: [...state.buildsListDisplayed, { ...DEFAULT_BUILDS.build1, id: nanoid(8), name: newName }],
      };
    });
  },

  removeBuild: (id, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);
    const newList = buildsList.filter((build) => build.id !== id);
    set({ [buildsListName]: newList });
  },

  checkNameUnique: (buildName, screenName) => {
    // ne lance pas d'error
    const { buildsList } = get().getBuildsList(screenName);

    const isNameUnique = !buildsList.some((build) => build.name === buildName);
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
      useBuildsPersistenceStore.getState().saveBuildInMemory(newBuild);
    }
  },

  updateBuildsList: (pressedClassIdsObj, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);
    const newClassIds = Object.values(pressedClassIdsObj);
    const id = get().buildEditedId;

    const build = get().getBuild(screenName, id);
    const newBuild = { ...build, classIds: newClassIds, stats: getBuildStatsFromClassIds(newClassIds) };

    const buildsListUpdated = buildsList.map((build) => {
      if (build.id === id) {
        return newBuild;
      }
      return build;
    });

    set({ [buildsListName]: buildsListUpdated });

    if (screenName === "save") {
      useBuildsPersistenceStore.getState().saveBuildInMemory(newBuild);
    }
  },

  sortBuildsList: (screenName, sortNumber) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);

    const buildsListSortable: SortableElement[] = buildsList.map((build: Build) => {
      const statsArray = build.stats;
      const mappedStats: Partial<SortableElement> = {};

      statNames.forEach((statName, index) => {
        mappedStats[statName] = statsArray[index];
      });

      return {
        id: build.id,
        name: build.name,
        classIds: build.classIds,
        stats: build.stats,
        ...mappedStats,
      } as SortableElement;
    });

    const buildsListSorted = sortElements(buildsListSortable, sortNumber);
    const buildsListSortedLight = buildsListSorted.map((build) => ({
      id: build.id,
      name: build.name,
      classIds: build.classIds,
      stats: build.stats,
    }));

    set({ [buildsListName]: buildsListSortedLight });
  },
}));

export default useBuildsListStore;
