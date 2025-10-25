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
    s?: SetProps;
    target: ScreenName;
    forceName?: boolean;
  }) => SetProps;
  loadToSearch: (params: { source?: ScreenName; id?: string; s?: SetProps }) => void;
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
    s?: SetProps;
    target: ScreenName;
    forceName?: boolean;
  }) => {
    const { source, id, s: providedSet, target, forceName = false } = params;

    // on récupère s depuis les props ou bien on le calcule
    // et on retire percentage
    let s: SetProps;
    if (providedSet) {
      const { percentage, ...set } = providedSet;
      s = set;
    } else {
      const { percentage, ...set } = useSetsListStore.getState().getSet(source, id);
      s = set;
    }
    // on change l'id car dans l'appli, il ne doit pas y avoir 2 sets avec le même id
    s.id = nanoid(8);

    const setsListTarget = useSetsListStore.getState().getSetsList(target).setsList;

    // vérification de la limit de sets
    if (
      (target === "display" && setsListTarget.length >= MAX_NUMBER_SETS_DISPLAY) ||
      (target === "save" && setsListTarget.length >= MAX_NUMBER_SETS_SAVE)
    ) {
      throw new Error("setLimitReachedInThisScreen");
    }

    // verification du nom unique
    const isNameUnique = useSetsListStore.getState().checkNameUnique(s.name, target);

    if (!isNameUnique) {
      if (!forceName) {
        throw new Error("nameAlreadyExists");
      } else {
        const baseName = s.name;
        const newIndex = 0;
        const newName = useSetsListStore.getState().generateUniqueName(baseName, newIndex, target);

        s.name = newName;
      }
    }

    const newSetsListTarget = [...setsListTarget, s];

    const setSetsListTarget = useSetsListStore.getState().getSetSetsList(target);
    setSetsListTarget(newSetsListTarget);
    return s;
  },

  loadToSearch: (params: { source?: ScreenName; id?: string; s?: SetProps }) => {
    const { source, id, s: providedSet } = params;

    // on récupère s depuis les props ou bien on le calcule
    // pas nécessaire de retirer percentage
    let s: SetProps;
    if (providedSet) {
      s = providedSet;
    } else {
      s = useSetsListStore.getState().getSet(source, id);
    }

    useStatsStore.getState().loadSetStats(s.stats);

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
      const s = get().loadSetCard({ source, id, target: "save" });

      const setsListSaved = useSetsListStore.getState().setsListSaved;
      if (setsListSaved.length >= MAX_NUMBER_SETS_SAVE) {
        throw new Error("setLimitReachedInThisScreen");
      }

      await useSetsPersistenceStore.getState().saveSetInMemory(s);
    } catch (e) {
      console.log(e);
    }
  },

  unSaveSet: async (screenName: ScreenName, id: string) => {
    const classIds = useSetsListStore.getState().getSet(screenName, id).classIds;

    const setsListSaved = useSetsListStore.getState().setsListSaved;
    const setsToRemove = setsListSaved.filter((s) => arraysEqual(s.classIds, classIds));

    for (const s of setsToRemove) {
      useSetsListStore.getState().removeSet(s.id, "save");
      await useSetsPersistenceStore.getState().removeSetInMemory(s.id);
    }
  },

  exportSet: (screenName, id) => {
    const s = useSetsListStore.getState().getSet(screenName, id);

    const json = JSON.stringify({ name: s.name, classIds: s.classIds });
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

    const s = { ...parsedSet, id: nanoid(8), stats };

    if (screenName === "search") {
      get().loadToSearch({ s });
    } else {
      get().loadSetCard({ s, target: screenName, forceName: true });
      if (screenName === "save") {
        useSetsPersistenceStore.getState().saveSetInMemory(s);
      }
    }
  },
}));

export default useSetsActionsStore;
