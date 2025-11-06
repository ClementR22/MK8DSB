// Third-party libraries
import { create } from "zustand";
import "react-native-get-random-values";

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
import { BuildAlreadyExistsError, NameAlreadyExistsError } from "@/errors/errors";

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

  getBuild: (screenName: ScreenName, dataId: string) => Build;

  setBuildsListFound: (newBuildsList: Build[]) => void;
  setBuildsListDisplayed: (newBuildsList: Build[]) => void;
  setBuildsListSaved: (newBuildsList: Build[]) => void;
  deleteAllSavedBuilds: () => Promise<void>;
  setBuildEditedId: (dataId: string) => void;
  addNewBuildInDisplay: () => void;
  removeBuild: (dataId: string, screenName: ScreenName) => void;
  renameBuild: (newName: string, screenName: ScreenName, dataId: string, isSaved: boolean) => void;
  updateBuildsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => void;
  sortBuildsList: (screenName: ScreenName, sortNumber: number) => void;
  findSameBuildInThisScreen: (props: {
    dataId: string;
    buildsList?: Build[];
    screenName?: ScreenName;
  }) => Build | undefined;
}

const useBuildsListStore = create<BuildsListStoreState>((set, get) => ({
  buildsListFound: [],
  buildsListDisplayed: [{ dataId: DEFAULT_BUILDS.build1.dataId }, { dataId: DEFAULT_BUILDS.build2.dataId }],
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

  getBuild: (screenName: ScreenName, dataId: string) => {
    const buildsList = get().getBuildsList(screenName).buildsList;

    const build = buildsList.find((build) => build.dataId === dataId);
    return build;
  },

  setBuildsListFound: (newBuildsList) => set({ buildsListFound: newBuildsList }),

  setBuildsListDisplayed: (newBuildsList) => {
    return set({ buildsListDisplayed: newBuildsList });
  },

  setBuildsListSaved: (newBuildsList) => set({ buildsListSaved: newBuildsList }),

  deleteAllSavedBuilds: async () => {
    const unSaveBuild = useDeckStore.getState().unSaveBuild;
    const buildsListSaved = useBuildsListStore.getState().buildsListSaved;
    buildsListSaved.forEach((build) => unSaveBuild(build.dataId));

    useBuildsListStore.getState().setBuildsListSaved([]);

    await deleteAllSavedBuildsInMemory();
  },

  setBuildEditedId: (dataId) => {
    set({ buildEditedId: dataId });
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
        buildsListDisplayed: [...state.buildsListDisplayed, { dataId: dataId }], // okk
      };
    });
  },

  removeBuild: (dataId, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);

    const newList = buildsList.filter((build) => build.dataId !== dataId);
    set({ [buildsListName]: newList });
    console.log("ok3");
    if (screenName === "save") {
      useBuildsPersistenceStore.getState().removeBuildInMemory(dataId);
      // mise à jour de la props isSaved dans useDeckStore
      useDeckStore.getState().unSaveBuild(dataId);
    }
  },

  renameBuild: (newName, screenName, dataId, isSaved) => {
    const build = get().getBuild(screenName, dataId);

    // si le nouveau nom est vide
    if (!newName.trim()) {
      useDeckStore.getState().removeBuildName(build.dataId); // on retire le nom de useDeckStore
      newName = undefined;
      return;
    }

    // pour la suite, newName est censé être non vide
    const isNameFree = useDeckStore.getState().checkNameFree(newName);
    if (!isNameFree) {
      throw new NameAlreadyExistsError(newName);
    }

    if (isSaved) {
      useBuildsPersistenceStore.getState().saveBuildInMemory(build, newName);
    }

    useDeckStore.getState().updateName(build.dataId, newName);
  },

  updateBuildsList: (selectedClassIdsByCategory, screenName) => {
    const { buildsList, buildsListName } = get().getBuildsList(screenName);
    const dataId = Object.values(selectedClassIdsByCategory).join("-");

    const sameBuild = get().findSameBuildInThisScreen({ dataId, buildsList });
    if (sameBuild) {
      const buildName = useDeckStore.getState().deck.get(sameBuild.dataId)?.name;
      throw new BuildAlreadyExistsError(buildName);
    }

    const buildEditedId = get().buildEditedId;

    const newBuild: Build = { dataId: dataId };

    const buildsListUpdated = buildsList.map((build) => {
      if (build.dataId === buildEditedId) {
        return newBuild;
      }
      return build;
    });

    set({ [buildsListName]: buildsListUpdated });

    if (screenName === "save") {
      const name = useDeckStore.getState().deck.get(newBuild.dataId).name;
      useBuildsPersistenceStore.getState().removeBuildInMemory(buildEditedId);
      useBuildsPersistenceStore.getState().saveBuildInMemory(newBuild, name);
    }

    useDeckStore.getState().updateBuildData(buildEditedId, dataId);
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
      const dataId = buildsList.find((bld) => bld.dataId === build.dataId).dataId;
      return {
        dataId: dataId,
      };
    });

    set({ [buildsListName]: buildsListSortedLight });
  },

  findSameBuildInThisScreen: ({ dataId, buildsList, screenName }) => {
    if (!buildsList) {
      buildsList = get().getBuildsList(screenName).buildsList;
    }
    const sameBuild = buildsList.find((build) => build.dataId === dataId);
    return sameBuild;
  },
}));

export default useBuildsListStore;
