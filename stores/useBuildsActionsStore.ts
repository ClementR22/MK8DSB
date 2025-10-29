import { create } from "zustand";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { router } from "expo-router";

// Data and Types
import { ScreenName } from "@/contexts/ScreenContext";
import { MAX_NUMBER_SETS_DISPLAY, MAX_NUMBER_SETS_SAVE, Build } from "./useBuildsListStore";

// Utilities
import { getSetStatsFromClassIds } from "@/utils/getSetStatsFromClassIds";
import { arraysEqual } from "@/utils/deepCompare";
import { checkFormatSetImported } from "@/utils/checkFormatSetImported";

// Stores
import useStatsStore from "./useStatsStore";
import useBuildsListStore from "./useBuildsListStore";
import useBuildsPersistenceStore from "./useBuildsPersistenceStore";
import useGeneralStore from "./useGeneralStore";

export interface BuildsActionsStoreState {
  loadSetCard: (params: {
    source?: ScreenName;
    id?: string;
    build?: Build;
    target: ScreenName;
    forceName?: boolean;
  }) => Build;
  loadToSearch: (params: { source?: ScreenName; id?: string; build?: Build }) => void;
  loadToDisplay: (params: { source: ScreenName; id: string }) => void;
  loadSetsSaved: () => void;
  saveSet: (source: ScreenName, id: string) => Promise<void>;
  unSaveSet: (screenName: ScreenName, id: string) => Promise<void>;
  exportSet: (screenName: ScreenName, id: string) => void;
  importSet: (clipboardContent: string, screenName: ScreenName) => void;
}

const useBuildsActionsStore = create<BuildsActionsStoreState>((set, get) => ({
  loadSetCard: (params: {
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

    const setsListTarget = useBuildsListStore.getState().getBuildsList(target).setsList;

    // vérification de la limit de builds
    if (
      (target === "display" && setsListTarget.length >= MAX_NUMBER_SETS_DISPLAY) ||
      (target === "save" && setsListTarget.length >= MAX_NUMBER_SETS_SAVE)
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

    const newBuildsListTarget = [...setsListTarget, build];

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

    get().loadSetCard({ source, id, target: "display" });
  },

  loadSetsSaved: async () => {
    const setsSaved = await useBuildsPersistenceStore.getState().fetchSetsSaved();
    useBuildsListStore.getState().setBuildsListSaved(setsSaved);
  },

  saveSet: async (source: ScreenName, id: string) => {
    try {
      const build = get().loadSetCard({ source, id, target: "save" });

      const setsListSaved = useBuildsListStore.getState().setsListSaved;
      if (setsListSaved.length >= MAX_NUMBER_SETS_SAVE) {
        throw new Error("setLimitReachedInThisScreen");
      }

      await useBuildsPersistenceStore.getState().saveSetInMemory(build);
    } catch (e) {
      console.log(e);
    }
  },

  unSaveSet: async (screenName: ScreenName, id: string) => {
    const classIds = useBuildsListStore.getState().getSet(screenName, id).classIds;

    const setsListSaved = useBuildsListStore.getState().setsListSaved;
    const setsToRemove = setsListSaved.filter((build) => arraysEqual(build.classIds, classIds));

    for (const build of setsToRemove) {
      useBuildsListStore.getState().removeSet(build.id, "save");
      await useBuildsPersistenceStore.getState().removeSetInMemory(build.id);
    }
  },

  exportSet: (screenName, id) => {
    const build = useBuildsListStore.getState().getSet(screenName, id);

    const json = JSON.stringify({ name: build.name, classIds: build.classIds });
    Clipboard.setStringAsync(json);
  },

  importSet: (clipboardContent: string, screenName: ScreenName) => {
    let parsedSet: unknown;

    try {
      parsedSet = JSON.parse(clipboardContent);
    } catch (err) {
      throw new Error("incorrectFormat");
    }

    if (!checkFormatSetImported(parsedSet)) {
      throw new Error("incorrectFormat");
    }

    const stats = getSetStatsFromClassIds(parsedSet.classIds);

    if (!stats) {
      throw new Error("thisSetDoesNotExist");
    }

    const build = { ...parsedSet, id: nanoid(8), stats };

    if (screenName === "search") {
      get().loadToSearch({ build });
    } else {
      get().loadSetCard({ build, target: screenName, forceName: true });
      if (screenName === "save") {
        useBuildsPersistenceStore.getState().saveSetInMemory(build);
      }
    }
  },
}));

export default useBuildsActionsStore;
