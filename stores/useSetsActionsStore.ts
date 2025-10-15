import { create } from "zustand";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { router } from "expo-router";

// Data and Types
import { ScreenName } from "@/contexts/ScreenContext";
import { SetObject, SetFoundObject } from "./useSetsListStore";

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
  loadSetToSearch: (set: SetObject) => void;
  loadSetSaveToSearch: (id: string) => void;
  loadSetDisplayToSearch: (id: string) => void;
  loadSetSaveToDisplay: (id: string) => void;
  loadSetSearchToDisplay: (id: string) => void;
  saveSet: (screenName: ScreenName, id: string) => Promise<void>;
  unSaveSet: (screenName: ScreenName, id: string) => Promise<void>;
  renameSetWithPersistence: (newName: string, screenName: ScreenName, id: string) => Promise<void>;
  updateSetsListWithPersistence: (pressedClassIds: Record<string, number>, screenName: ScreenName) => Promise<void>;
  exportSet: (id: string, screenName: ScreenName) => void;
  importSet: (clipboardContent: string, screenName: ScreenName) => void;
  initializeSavedSets: () => Promise<void>;
  deleteAllSavedSetsComplete: () => Promise<void>;
}

const useSetsActionsStore = create<SetsActionsStoreState>((set, get) => ({
  loadSetToSearch: (setToLoad) => {
    useStatsStore.getState().loadStatsFromSet(setToLoad.stats);
    router.push({ pathname: "/", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadSetSaveToSearch: (id) => {
    const setFromSaved = useSetsListStore.getState().setsListSaved.find((set) => set.id === id);
    if (!setFromSaved) {
      throw new Error("Le set sauvegardé n'a pas été trouvé.");
    }
    get().loadSetToSearch(setFromSaved);
  },

  loadSetDisplayToSearch: (id) => {
    const setFromDisplay = useSetsListStore.getState().setsListDisplayed.find((set) => set.id === id);
    if (!setFromDisplay) {
      throw new Error("Le set affiché n'a pas été trouvé.");
    }
    get().loadSetToSearch(setFromDisplay);
  },

  loadSetSaveToDisplay: (id) => {
    const setFromSaved = useSetsListStore.getState().setsListSaved.find((set) => set.id === id);
    if (!setFromSaved) {
      throw new Error("Le set sauvegardé n'a pas été trouvé");
    }
    useSetsListStore.getState().addSetToDisplay(setFromSaved);
  },

  loadSetSearchToDisplay: (id) => {
    const setSelected = useSetsListStore.getState().setsListFound.find((set) => set.id === id);
    if (!setSelected) {
      throw new Error("Le set trouvé n'a pas été trouvé");
    }
    const { percentage, ...setToLoad } = setSelected;
    useSetsListStore.getState().addSetToDisplay(setToLoad);
  },

  saveSet: async (screenName, id) => {
    const { setsList } = useSetsListStore.getState().getSetsListFromScreenName(screenName);

    const setSelected = setsList.find((set) => set.id === id);
    if (!setSelected) {
      throw new Error("Le set n'existe pas");
    }

    const { percentage, ...setToSave } = setSelected as SetFoundObject;

    const isNameUnique = useSetsListStore.getState().checkNameUnique(setToSave.name, "save");
    if (!isNameUnique) {
      throw new Error("NameAlreadyExists");
    }

    useSetsListStore.getState().addSetToSaved(setToSave);
    await useSetsPersistenceStore.getState().saveSetInMemory(setToSave);
  },

  unSaveSet: async (screenName: ScreenName, id) => {
    const { setsList } = useSetsListStore.getState().getSetsListFromScreenName(screenName);
    const classIds = setsList.find((set) => set.id === id).classIds;

    const setsListSaved = useSetsListStore.getState().setsListSaved;
    const setsToRemove = setsListSaved.filter((set) => arraysEqual(set.classIds, classIds));

    for (const set of setsToRemove) {
      useSetsListStore.getState().removeSet(set.id, "save");
      await useSetsPersistenceStore.getState().removeSetInMemory(set.id);
    }
  },

  renameSetWithPersistence: async (newName, screenName, id) => {
    const { isSaveScreen } = useSetsListStore.getState().getSetsListFromScreenName(screenName);

    useSetsListStore.getState().renameSet(newName, screenName, id);

    if (isSaveScreen) {
      const setRenamed = useSetsListStore.getState().setsListSaved.find((set) => set.id === id);
      if (setRenamed) {
        await useSetsPersistenceStore.getState().updateSetInMemory(setRenamed);
      }
    }
  },

  updateSetsListWithPersistence: async (pressedClassIdsObj, screenName) => {
    const { isSaveScreen } = useSetsListStore.getState().getSetsListFromScreenName(screenName);
    const setCardEditedId = useSetsListStore.getState().setCardEditedId;

    useSetsListStore.getState().updateSetsList(pressedClassIdsObj, screenName);

    if (isSaveScreen) {
      const setUpdated = useSetsListStore.getState().setsListSaved.find((set) => set.id === setCardEditedId);
      if (setUpdated) {
        await useSetsPersistenceStore.getState().updateSetInMemory(setUpdated);
      }
    }
  },

  exportSet: (id, screenName) => {
    const { setsList } = useSetsListStore.getState().getSetsListFromScreenName(screenName);

    const setObjToExport = setsList.find((set) => set.id === id);
    if (!setObjToExport) {
      throw new Error("Le set à exporter n'existe pas.");
    }

    const { name, classIds } = setObjToExport;
    const json = JSON.stringify({ name, classIds });
    Clipboard.setStringAsync(json);
  },

  importSet: (clipboardContent: string, screenName: ScreenName) => {
    let parsedSet: unknown;

    try {
      parsedSet = JSON.parse(clipboardContent);
    } catch (err) {
      throw new Error("IncorrectFormat");
    }

    if (!checkFormatSetImported(parsedSet)) {
      throw new Error("IncorrectFormat");
    }

    const stats = getSetStatsFromClassIds(parsedSet.classIds);
    const set = { ...parsedSet, id: nanoid(8), stats };

    if (screenName === "search") {
      get().loadSetToSearch(set);
    } else if (screenName === "display") {
      useSetsListStore.getState().addSetToDisplay(set);
    } else {
      useSetsListStore.getState().addSetToSaved(set);
      useSetsPersistenceStore.getState().saveSetInMemory(set);
    }
  },

  initializeSavedSets: async () => {
    const setsDataParsed = await useSetsPersistenceStore.getState().fetchSetsSaved();
    useSetsListStore.getState().setSetsListSaved(setsDataParsed);
    await useSetsPersistenceStore.getState().loadSortNumberFromMemory();
  },

  deleteAllSavedSetsComplete: async () => {
    useSetsListStore.getState().setSetsListSaved([]);
    await useSetsPersistenceStore.getState().deleteAllSavedSets();
  },
}));

export default useSetsActionsStore;
