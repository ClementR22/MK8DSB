import { create } from "zustand";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { router } from "expo-router";

// Data and Types
import { ScreenName } from "@/contexts/ScreenContext";
import { MAX_NUMBER_BUILDS_DISPLAY, MAX_NUMBER_BUILDS_SAVE, Build } from "./useBuildsListStore";

// Utilities
import { getBuildStatsFromClassIds } from "@/utils/getBuildStatsFromClassIds";
import { arraysEqual } from "@/utils/deepCompare";
import { checkFormatBuildImported } from "@/utils/checkFormatBuildImported";

// Stores
import useStatsStore from "./useStatsStore";
import useBuildsListStore from "./useBuildsListStore";
import useBuildsPersistenceStore from "./useBuildsPersistenceStore";
import useGeneralStore from "./useGeneralStore";

export interface BuildsActionsStoreState {
  loadBuildCard: (params: {
    source?: ScreenName;
    id?: string;
    build?: Build;
    target: ScreenName;
    forceName?: boolean;
  }) => Build;
  loadToSearch: (params: { source?: ScreenName; id?: string; build?: Build }) => void;
  loadToDisplay: (params: { source: ScreenName; id: string }) => void;
  loadBuildsSaved: () => void;
  saveSet: (source: ScreenName, id: string) => Promise<void>;
  unSaveSet: (screenName: ScreenName, id: string) => Promise<void>;
  exportBuild: (screenName: ScreenName, id: string) => void;
  importBuild: (clipboardContent: string, screenName: ScreenName) => void;
}

const useBuildsActionsStore = create<BuildsActionsStoreState>((set, get) => ({
  loadBuildCard: (params: {
    source?: ScreenName;
    id?: string;
    build?: Build;
    target: ScreenName;
    forceName?: boolean;
  }) => {
    const { source, id, build: providedBuild, target, forceName = false } = params;

    // on récupère build depuis les props ou bien on le calcule
    // et on retire percentage
    let build: Build;
    if (providedBuild) {
      const { percentage, ...build_ } = providedBuild;
      build = build_;
    } else {
      const { percentage, ...build_ } = useBuildsListStore.getState().getSet(source, id);
      build = build_;
    }
    // on change l'id car dans l'appli, il ne doit pas y avoir 2 builds avec le même id
    build.id = nanoid(8);

    const buildsListTarget = useBuildsListStore.getState().getBuildsList(target).buildsList;

    // vérification de la limit de builds
    if (
      (target === "display" && buildsListTarget.length >= MAX_NUMBER_BUILDS_DISPLAY) ||
      (target === "save" && buildsListTarget.length >= MAX_NUMBER_BUILDS_SAVE)
    ) {
      throw new Error("setLimitReachedInThisScreen");
    }

    // verification du nom unique
    const isNameUnique = useBuildsListStore.getState().checkNameUnique(build.name, target);

    if (!isNameUnique) {
      if (!forceName) {
        throw new Error("nameAlreadyExists");
      } else {
        const baseName = build.name;
        const newIndex = 0;
        const newName = useBuildsListStore.getState().generateUniqueName(baseName, newIndex, target);

        build.name = newName;
      }
    }

    const newBuildsListTarget = [...buildsListTarget, build];

    const setBuildsListTarget = useBuildsListStore.getState().getSetBuildsList(target);
    setBuildsListTarget(newBuildsListTarget);
    return build;
  },

  loadToSearch: (params: { source?: ScreenName; id?: string; build?: Build }) => {
    const { source, id, build: providedBuild } = params;

    // on récupère build depuis les props ou bien on le calcule
    // pas nécessaire de retirer percentage
    let build: Build;
    if (providedBuild) {
      build = providedBuild;
    } else {
      build = useBuildsListStore.getState().getSet(source, id);
    }

    useStatsStore.getState().loadSetStats(build.stats);

    router.push({ pathname: "/", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadToDisplay: (params: { source: ScreenName; id: string }) => {
    const { source, id } = params;

    get().loadBuildCard({ source, id, target: "display" });

    router.push({ pathname: "/DisplayBuildScreen", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadBuildsSaved: async () => {
    const buildsSaved = await useBuildsPersistenceStore.getState().fetchBuildsSaved();
    useBuildsListStore.getState().setBuildsListSaved(buildsSaved);
  },

  saveSet: async (source: ScreenName, id: string) => {
    try {
      const build = get().loadBuildCard({ source, id, target: "save" });

      const buildsListSaved = useBuildsListStore.getState().buildsListSaved;
      if (buildsListSaved.length >= MAX_NUMBER_BUILDS_SAVE) {
        throw new Error("setLimitReachedInThisScreen");
      }

      await useBuildsPersistenceStore.getState().saveSetInMemory(build);
    } catch (e) {
      console.log(e);
    }
  },

  unSaveSet: async (screenName: ScreenName, id: string) => {
    const classIds = useBuildsListStore.getState().getSet(screenName, id).classIds;

    const buildsListSaved = useBuildsListStore.getState().buildsListSaved;
    const buildsToRemove = buildsListSaved.filter((build) => arraysEqual(build.classIds, classIds));

    for (const build of buildsToRemove) {
      useBuildsListStore.getState().removeSet(build.id, "save");
      await useBuildsPersistenceStore.getState().removeSetInMemory(build.id);
    }
  },

  exportBuild: (screenName, id) => {
    const build = useBuildsListStore.getState().getSet(screenName, id);

    const json = JSON.stringify({ name: build.name, classIds: build.classIds });
    Clipboard.setStringAsync(json);
  },

  importBuild: (clipboardContent: string, screenName: ScreenName) => {
    let parsedSet: unknown;

    try {
      parsedSet = JSON.parse(clipboardContent);
    } catch (err) {
      throw new Error("incorrectFormat");
    }

    if (!checkFormatBuildImported(parsedSet)) {
      throw new Error("incorrectFormat");
    }

    const stats = getBuildStatsFromClassIds(parsedSet.classIds);

    if (!stats) {
      throw new Error("thisSetDoesNotExist");
    }

    const build = { ...parsedSet, id: nanoid(8), stats };

    if (screenName === "search") {
      get().loadToSearch({ build });
    } else {
      get().loadBuildCard({ build, target: screenName, forceName: true });
      if (screenName === "save") {
        useBuildsPersistenceStore.getState().saveSetInMemory(build);
      }
    }
  },
}));

export default useBuildsActionsStore;
