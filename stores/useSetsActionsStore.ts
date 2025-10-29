import { create } from "zustand";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { router } from "expo-router";

// Data and Types
import { ScreenName } from "@/contexts/ScreenContext";
import { MAX_NUMBER_SETS_DISPLAY, MAX_NUMBER_SETS_SAVE, SetProps } from "./useSetsListStore";

// Utilities
import { getSetStatsFromClassIds } from "@/utils/getSetStatsFromClassIds";
import { arraysEqual } from "@/utils/deepCompare";
import { checkFormatSetImported } from "@/utils/checkFormatSetImported";

// Stores
import useStatsStore from "./useStatsStore";
import useSetsListStore from "./useSetsListStore";
import useSetsPersistenceStore from "./useSetsPersistenceStore";
import useGeneralStore from "./useGeneralStore";

export interface SetsActionsStoreState {
  loadSetCard: (params: {
    source?: ScreenName;
    id?: string;
    build?: SetProps;
    target: ScreenName;
    forceName?: boolean;
  }) => SetProps;
  loadToSearch: (params: { source?: ScreenName; id?: string; build?: SetProps }) => void;
  loadToDisplay: (params: { source: ScreenName; id: string }) => void;
  loadSetsSaved: () => void;
  saveSet: (source: ScreenName, id: string) => Promise<void>;
  unSaveSet: (screenName: ScreenName, id: string) => Promise<void>;
  exportSet: (screenName: ScreenName, id: string) => void;
  importSet: (clipboardContent: string, screenName: ScreenName) => void;
}

const useSetsActionsStore = create<SetsActionsStoreState>((set, get) => ({
  loadSetCard: (params: {
    source?: ScreenName;
    id?: string;
    build?: SetProps;
    target: ScreenName;
    forceName?: boolean;
  }) => {
    const { source, id, build: providedBuild, target, forceName = false } = params;

    // on récupère build depuis les props ou bien on le calcule
    // et on retire percentage
    let build: SetProps;
    if (providedBuild) {
      const { percentage, ...build_ } = providedBuild;
      build = build_;
    } else {
      const { percentage, ...build_ } = useSetsListStore.getState().getSet(source, id);
      build = build_;
    }
    // on change l'id car dans l'appli, il ne doit pas y avoir 2 builds avec le même id
    build.id = nanoid(8);

    const setsListTarget = useSetsListStore.getState().getSetsList(target).setsList;

    // vérification de la limit de builds
    if (
      (target === "display" && setsListTarget.length >= MAX_NUMBER_SETS_DISPLAY) ||
      (target === "save" && setsListTarget.length >= MAX_NUMBER_SETS_SAVE)
    ) {
      throw new Error("setLimitReachedInThisScreen");
    }

    // verification du nom unique
    const isNameUnique = useSetsListStore.getState().checkNameUnique(build.name, target);

    if (!isNameUnique) {
      if (!forceName) {
        throw new Error("nameAlreadyExists");
      } else {
        const baseName = build.name;
        const newIndex = 0;
        const newName = useSetsListStore.getState().generateUniqueName(baseName, newIndex, target);

        build.name = newName;
      }
    }

    const newSetsListTarget = [...setsListTarget, build];

    const setSetsListTarget = useSetsListStore.getState().getSetSetsList(target);
    setSetsListTarget(newSetsListTarget);
    return build;
  },

  loadToSearch: (params: { source?: ScreenName; id?: string; build?: SetProps }) => {
    const { source, id, build: providedBuild } = params;

    // on récupère build depuis les props ou bien on le calcule
    // pas nécessaire de retirer percentage
    let build: SetProps;
    if (providedBuild) {
      build = providedBuild;
    } else {
      build = useSetsListStore.getState().getSet(source, id);
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
    const setsSaved = await useSetsPersistenceStore.getState().fetchSetsSaved();
    useSetsListStore.getState().setSetsListSaved(setsSaved);
  },

  saveSet: async (source: ScreenName, id: string) => {
    try {
      const build = get().loadSetCard({ source, id, target: "save" });

      const setsListSaved = useSetsListStore.getState().setsListSaved;
      if (setsListSaved.length >= MAX_NUMBER_SETS_SAVE) {
        throw new Error("setLimitReachedInThisScreen");
      }

      await useSetsPersistenceStore.getState().saveSetInMemory(build);
    } catch (e) {
      console.log(e);
    }
  },

  unSaveSet: async (screenName: ScreenName, id: string) => {
    const classIds = useSetsListStore.getState().getSet(screenName, id).classIds;

    const setsListSaved = useSetsListStore.getState().setsListSaved;
    const setsToRemove = setsListSaved.filter((build) => arraysEqual(build.classIds, classIds));

    for (const build of setsToRemove) {
      useSetsListStore.getState().removeSet(build.id, "save");
      await useSetsPersistenceStore.getState().removeSetInMemory(build.id);
    }
  },

  exportSet: (screenName, id) => {
    const build = useSetsListStore.getState().getSet(screenName, id);

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
        useSetsPersistenceStore.getState().saveSetInMemory(build);
      }
    }
  },
}));

export default useSetsActionsStore;
