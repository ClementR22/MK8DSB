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
import { getRandomDataId } from "@/utils/getRandomDataId";

export const MAX_NUMBER_BUILDS_DISPLAY = 10;
export const MAX_NUMBER_BUILDS_SAVE = 30;

class BuildAlreadyExistsError extends Error {
  buildName: string;

  constructor(buildName: string) {
    super("buildAlreadyExistsWithTheName");
    this.name = "BuildAlreadyExistsError";
    this.buildName = buildName;
  }
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
  deleteAllSavedBuilds: () => Promise<void>;
  setBuildEditedId: (id: string) => void;
  addNewBuildInDisplay: () => void;
  removeBuild: (id: string, screenName: ScreenName) => void;
  renameBuild: (newName: string, screenName: ScreenName, id: string, isSaved: boolean) => void;
  updateBuildsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => void;
  sortBuildsList: (screenName: ScreenName, sortNumber: number) => void;
  findSameBuildInThisScreen: (dataId: string, buildsList: Build[]) => Build | undefined;
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
    const dataId = getRandomDataId();

    set((state) => {
      return {
        buildIndexInComparator: newIndex,
        buildsListDisplayed: [...state.buildsListDisplayed, { id: nanoid(8), dataId: dataId }],
      };
    });
  },

  removeBuild: (id, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);

    const newList = buildsList.filter((build) => build.id !== id);
    set({ [buildsListName]: newList });

    if (screenName === "save") {
      useBuildsPersistenceStore.getState().removeBuildInMemory(id);
      // mise à jour de la props isSaved dans useDeckStore
      const dataId = buildsList.find((build) => build.id === id).dataId;
      useDeckStore.getState().unSaveBuild(dataId);
    }
  },

  renameBuild: (newName, screenName, id, isSaved) => {
    const build = get().getBuild(screenName, id);

    // si le nouveau nom est vide
    if (!newName.trim()) {
      useDeckStore.getState().removeBuildName(build.dataId); // on retire le nom de useDeckStore
      newName = undefined;
      return;
    }

    // pour la suite, newName est censé être non vide
    const isNameUnique = useDeckStore.getState().checkNameFree(newName);
    if (!isNameUnique) {
      throw new Error("nameAlreadyExists");
    }

    if (isSaved) {
      const name = useDeckStore.getState().deck.get(build.dataId).name;
      useBuildsPersistenceStore.getState().saveBuildInMemory(build, name);
    }

    useDeckStore.getState().updateName(build.dataId, newName);
  },

  updateBuildsList: (selectedClassIdsByCategory, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);
    const dataId = Object.values(selectedClassIdsByCategory).join("-");

    const sameBuild = get().findSameBuildInThisScreen(dataId, buildsList);
    if (sameBuild) {
      const buildName = useDeckStore.getState().deck.get(sameBuild.dataId)?.name;
      throw new BuildAlreadyExistsError(buildName);
    }

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

    useDeckStore.getState().updateBuildData(build.dataId, dataId);
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

  findSameBuildInThisScreen: (dataId, buildsList) => {
    const sameBuild = buildsList.find((build) => build.dataId === dataId);
    return sameBuild;
  },
}));

export default useBuildsListStore;
