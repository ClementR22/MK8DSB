// Third-party libraries
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

// Data and Types
import { statNames } from "@/data/stats/statsData";
import { ScreenName } from "@/contexts/ScreenContext";
import { StatName } from "@/data/stats/statsTypes";

// Utilities
import showToast from "@/utils/showToast";
import { getSetStatsFromClassIds } from "@/utils/getSetStatsFromClassIds";
import {
  deleteAllSavedSetsInMemory,
  getOnlySetsSavedKeysFromMemory,
  loadThingFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";
import { SortableElement, sortElements } from "@/utils/sortElements";
import { CHOSEN_STATS_DEFAULT_SELECTED, SORT_NUMBER_SAVED_SETS_DEFAULT } from "@/constants/constants";
import { arraysEqual } from "@/utils/deepCompare";
import { router } from "expo-router";
import useGeneralStore from "./useGeneralStore";
import { checkFormatSetImported } from "@/utils/checkFormatSetImported";

export const MAX_NUMBER_SETS_DISPLAY = 10;
export interface ChosenStat {
  name: StatName;
  checked: boolean;
  value: number | null;
  statFilterNumber: number;
}

export interface SetObject {
  id: string;
  name: string;
  classIds: number[];
  stats: number[];
}

export interface SetFoundObject extends SetObject {
  percentage: number;
}

export interface SetsStoreState {
  chosenStats: ChosenStat[];
  setsListFound: SetFoundObject[];
  setsListDisplayed: SetObject[];
  setsListSaved: SetObject[];
  setCardEditedId: string;
  setKeyInDisplay: number;
  sortNumberSavedSets: number;

  setChosenStats: (newChosenStats: ChosenStat[]) => void;
  getSetsListFromScreenName: (screenName: ScreenName) => {
    setsList: SetObject[] | SetFoundObject[];
    setsListName: string;
    isSaveScreen: boolean;
  };
  setSetsListFound: (newSetsList: SetFoundObject[]) => void;
  setSetCardEditedId: (id: string) => void;
  updateStatValue: (name: StatName, newValue: number) => void;
  removeStat: (name: StatName) => void;
  setStatFilterNumber: (statName: string, newState: number) => void;
  setSortNumberSavedSets: (newSortNumberSavedSets: number) => Promise<void>;
  fetchSetsSavedKeys: () => Promise<string[]>;
  fetchSetsSaved: () => Promise<void>;
  addNewSetInDisplay: () => void;
  loadSetToDisplay: (setToLoad: SetObject) => void;
  loadSetToSave: (setToLoad: SetObject) => void;
  removeSet: (id: string, screenName: ScreenName) => void;
  removeSetInMemory: (keyToRemove: string) => Promise<void>;
  loadSetToSearch: (set: SetObject) => void;
  loadSetSaveToSearch: (id: string) => void;
  loadSetDisplayToSearch: (id: string) => void;
  loadSetSaveToDisplay: (id: string) => void;
  loadSetSearchToDisplay: (id: string) => void;
  checkNameUnique: (name: string, screenName: ScreenName) => boolean;
  saveSet: (screenName: ScreenName, id: string) => void;
  unSaveSet: (screenName: ScreenName, id: string) => void;
  saveSetInMemory: (setToSave: SetObject) => Promise<void>;
  renameSet: (newName: string, screenName: ScreenName, id: string) => void;
  updateSetsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => Promise<void>;
  setSetInMemory: (setObj: SetObject) => Promise<void>;
  exportSet: (id: string, screenName: ScreenName) => void;
  importSet: (clipboardContent: string, screenName: ScreenName) => void;
  deleteAllSavedSets: () => void;
  sortSetsList: (screenName: ScreenName, sortNumber: number) => void;
}

const setDefault: SetObject = {
  id: nanoid(8),
  name: "Set 1",
  classIds: [9, 16, 30, 39],
  stats: [4, 3.75, 4.25, 4.5, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 4],
};

const setDefault2: SetObject = {
  id: nanoid(8),
  name: "Set 2",
  classIds: [15, 22, 31, 42],
  stats: [5.25, 4.75, 4.25, 4, 1.75, 5.5, 1, 1, 1.5, 1.5, 3.75, 2.75],
};

const useSetsStore = create<SetsStoreState>((set, get) => ({
  chosenStats: statNames.map((statName) => ({
    name: statName,
    checked: CHOSEN_STATS_DEFAULT_SELECTED.includes(statName),
    value: 0,
    statFilterNumber: 0,
  })),

  setsListFound: [],
  setsListDisplayed: [{ ...setDefault }, { ...setDefault2 }],
  setsListSaved: [],

  setCardEditedId: null,
  setKeyInDisplay: 2,

  sortNumberSavedSets: SORT_NUMBER_SAVED_SETS_DEFAULT,

  setChosenStats: (newChosenStats) => {
    set({ chosenStats: newChosenStats });
  },

  getSetsListFromScreenName: (screenName) => {
    let setsListName: string;
    let isSaveScreen = false;

    switch (screenName) {
      case "search":
        setsListName = "setsListFound";
        break;
      case "display":
        setsListName = "setsListDisplayed";
        break;
      case "save":
        setsListName = "setsListSaved";
        isSaveScreen = true;
        break;
    }

    const setsList = get()[setsListName];

    return { setsList, setsListName, isSaveScreen };
  },

  setSetsListFound: (newSetsList) => set({ setsListFound: newSetsList }),

  setSetCardEditedId: (id) => {
    set({ setCardEditedId: id });
  },

  updateStatValue: (name, newValue) =>
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) => (stat.name === name ? { ...stat, value: newValue } : stat)),
    })),

  removeStat: (name) => {
    set((state) => {
      const newChosenStats = state.chosenStats.map((stat) =>
        stat.name === name ? { ...stat, checked: false, value: null, statFilterNumber: 0 } : stat
      );
      const hasChecked = newChosenStats.some((stat) => stat.checked);
      return hasChecked ? { ...state, chosenStats: newChosenStats } : state;
    });
  },

  setStatFilterNumber: (statName, newState) => {
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) =>
        stat.name === statName ? { ...stat, statFilterNumber: newState } : stat
      ),
    }));
  },

  setSortNumberSavedSets: async (newSortNumberSavedSets) => {
    await saveThingInMemory("sortNumberSavedSets", newSortNumberSavedSets);
    set({ sortNumberSavedSets: newSortNumberSavedSets });
  },

  fetchSetsSavedKeys: async () => {
    const setsKeys = await getOnlySetsSavedKeysFromMemory();
    return setsKeys;
  },

  fetchSetsSaved: async () => {
    const setsKeys = await get().fetchSetsSavedKeys();
    const setsData = await AsyncStorage.multiGet(setsKeys);
    const setsDataParsed: SetObject[] = setsData
      .map(([, value]) => {
        try {
          return value ? JSON.parse(value) : null;
        } catch (e) {
          console.error("Error parsing saved set:", e);
          return null;
        }
      })
      .filter((set) => set !== null) as SetObject[]; // Filtrer les null et caster

    set({ setsListSaved: setsDataParsed });
    loadThingFromMemory("sortNumberSavedSets", get().setSortNumberSavedSets);
  },

  addNewSetInDisplay: () => {
    if (get().setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY) {
      throw new Error("SetLimitReached");
    }

    let newIndex = get().setKeyInDisplay;
    let newName: string;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // Protection contre boucle infinie

    do {
      newIndex++;
      newName = `Set ${newIndex}`;
      attempts++;

      if (attempts > MAX_ATTEMPTS) {
        throw new Error("CannotGenerateUniqueName");
      }
    } while (!get().checkNameUnique(newName, "display"));

    set((state) => {
      return {
        setKeyInDisplay: newIndex,
        setsListDisplayed: [...state.setsListDisplayed, { ...setDefault, id: nanoid(8), name: newName }],
      };
    });
  },

  loadSetToDisplay: (setToLoad) => {
    const isNameUnique = get().checkNameUnique(setToLoad.name, "display");
    if (!isNameUnique) {
      throw new Error("NameAlreadyExists");
    }

    if (get().setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY) {
      throw new Error("SetLimitReached");
    }

    const setToLoadWithNewId = { ...setToLoad, id: nanoid(8) };
    set((state) => ({
      setsListDisplayed: [...state.setsListDisplayed, setToLoadWithNewId],
    }));
  },

  loadSetToSave: (setToLoad) => {
    let nameUnique = setToLoad.name;
    let newIndex = 0; // Commencer l'indexation pour les noms dupliqués
    // Vérifier l'unicité du nom en mode 'save'
    while (!get().checkNameUnique(nameUnique, "save")) {
      nameUnique = `${setToLoad.name} (${newIndex})`; // Ajouter un suffixe comme "(0)", "(1)"
      newIndex++;
    }
    // Une fois qu'un nom unique est trouvé, utilisez-le
    const setToLoadWithNewId = { ...setToLoad, name: nameUnique, id: nanoid(8) };

    set((state) => ({
      setsListSaved: [...state.setsListSaved, setToLoadWithNewId],
    }));
    get().saveSetInMemory(setToLoadWithNewId); // Sauvegarder immédiatement le set avec le nouveau nom unique
  },

  removeSet: (id, screenName) => {
    const { setsList, setsListName, isSaveScreen } = get().getSetsListFromScreenName(screenName);

    if (isSaveScreen) {
      get().removeSetInMemory(id); // Supprime de AsyncStorage
    }

    // Filtrer la liste en mémoire
    const newList = setsList.filter((set) => set.id !== id);
    set({
      [setsListName]: newList,
    } as any); // Le casting `as any` est souvent utilisé avec les noms de clés dynamiques en TypeScript
  },

  removeSetInMemory: async (keyToRemove) => {
    if (keyToRemove) {
      await AsyncStorage.removeItem(keyToRemove);
    } else {
      console.warn(`Attempted to remove set ${keyToRemove}, but no key found.`);
    }
  },

  loadSetToSearch: (setToLoad) => {
    // Crée une nouvelle liste de chosenStats en mettant à jour les valeurs avec celles du set
    const newChosenStats = get().chosenStats.map((stat, i) => ({
      ...stat,
      value: setToLoad.stats[i],
    }));
    set({ chosenStats: newChosenStats });

    router.push({ pathname: "/", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadSetSaveToSearch: (id) => {
    const setFromSaved = get().setsListSaved.find((set) => set.id === id);
    if (!setFromSaved) {
      throw new Error("Le set sauvegardé n'a pas été trouvé.");
    } else {
      get().loadSetToSearch(setFromSaved);
    }
  },

  loadSetDisplayToSearch: (id) => {
    const setFromDisplay = get().setsListDisplayed.find((set) => set.id === id);
    if (!setFromDisplay) {
      throw new Error("Le set affiché n'a pas été trouvé.");
    } else {
      get().loadSetToSearch(setFromDisplay);
    }
  },

  loadSetSaveToDisplay: (id) => {
    const setFromSaved = get().setsListSaved.find((set) => set.id === id);
    if (!setFromSaved) {
      throw new Error("Le set sauvegardé n'a pas été trouvé");
    } else {
      get().loadSetToDisplay(setFromSaved);
    }
  },

  loadSetSearchToDisplay: (id) => {
    const setSelected = get().setsListFound.find((set) => set.id === id);
    if (!setSelected) {
      throw new Error("Le set trouvé n'a pas été trouvé");
    } else {
      const { percentage, ...setToLoad } = setSelected; // Destructurer percentage si présent
      get().loadSetToDisplay(setToLoad);
    }
  },

  checkNameUnique: (name, screenName) => {
    const { setsList } = get().getSetsListFromScreenName(screenName);

    return !setsList.some((set) => set.name === name);
  },

  saveSet: (screenName, id) => {
    const { setsList } = get().getSetsListFromScreenName(screenName);

    const setSelected = setsList.find((set) => set.id === id);
    if (!setSelected) {
      throw new Error("Le set n'existe pas");
    }
    const { percentage, ...setToSave } = setSelected as SetFoundObject; // Destructurer percentage si présent

    const isNameUnique = get().checkNameUnique(setToSave.name, "save");
    if (!isNameUnique) {
      throw new Error("NameAlreadyExists");
    }

    get().loadSetToSave(setToSave);
  },

  saveSetInMemory: async (setToSave) => {
    await saveThingInMemory(setToSave.id, setToSave);
  },

  unSaveSet: (screenName: ScreenName, id) => {
    const { setsList } = get().getSetsListFromScreenName(screenName);
    const classIds = setsList.find((set) => set.id === id).classIds;

    const removeSet = get().removeSet;
    get().setsListSaved.forEach((set) => {
      if (arraysEqual(set.classIds, classIds)) removeSet(set.id, "save");
    });
  },

  renameSet: (newName, screenName, setToShowId) => {
    const { setsList, setsListName, isSaveScreen } = get().getSetsListFromScreenName(screenName);

    // Vérifier l'unicité du nom en ignorant le set en cours d'édition
    const isNewNameUniqueExceptCurrent = setsList.every((set) => {
      return set.name !== newName;
    });

    if (!isNewNameUniqueExceptCurrent) {
      throw new Error("NameAlreadyExists");
    }

    const setsListUpdated = setsList.map((set: SetObject) => {
      if (set.id === setToShowId) {
        const newSet = { ...set, name: newName };

        if (isSaveScreen) {
          get().setSetInMemory(newSet);
        }

        return newSet;
      }
      return set;
    });
    set({ [setsListName]: setsListUpdated } as any);
  },

  updateSetsList: async (pressedClassIdsObj, screenName) => {
    const { setsList, setsListName, isSaveScreen } = get().getSetsListFromScreenName(screenName);
    const newClassIds = Object.values(pressedClassIdsObj);
    const setCardEditedId = get().setCardEditedId;

    const setsListUpdated = setsList.map((set) => {
      if (set.id === setCardEditedId) {
        const newSet = {
          ...set,
          classIds: newClassIds,
          stats: getSetStatsFromClassIds(newClassIds), // Recalcule les stats
        };
        if (isSaveScreen) {
          get().setSetInMemory(newSet);
        }
        return newSet;
      }
      return set;
    });

    set({ [setsListName]: setsListUpdated } as any);
  },

  setSetInMemory: async (setObj) => {
    await saveThingInMemory(String(setObj.id), setObj);
  },

  exportSet: (id, screenName) => {
    const { setsList } = get().getSetsListFromScreenName(screenName);

    const setObjToExport = setsList.find((set) => set.id === id);
    if (!setObjToExport) {
      throw new Error("Le set à exporter n'existe pas.");
    }

    // Exporter uniquement le nom et les classIds comme indiqué dans votre exemple précédent
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

    const loadSet =
      screenName === "search"
        ? get().loadSetToSearch
        : screenName === "display"
        ? get().loadSetToDisplay
        : get().loadSetToSave;
    loadSet(set);
  },

  deleteAllSavedSets: () => {
    // Réinitialiser les listes dans l'état du store
    set({ setsListSaved: [] });
    // Appeler la fonction utilitaire pour supprimer de l'AsyncStorage
    deleteAllSavedSetsInMemory();
  },

  sortSetsList: (screenName, sortNumber) => {
    const { setsList, setsListName } = get().getSetsListFromScreenName(screenName);

    const setsListSortable: SortableElement[] = setsList.map((setObj: SetObject) => {
      const statsArray = setObj.stats;

      const mappedStats: Partial<SortableElement> = {};

      statNames.forEach((statName, index) => {
        mappedStats[statName] = statsArray[index];
      });

      return {
        id: setObj.id,
        name: setObj.name,
        classIds: setObj.classIds,
        stats: setObj.stats,
        ...mappedStats,
      } as SortableElement;
    });

    const setsListSorted = sortElements(setsListSortable, sortNumber);
    const setsListSortedLight = setsListSorted.map((setSorted) => ({
      id: setSorted.id,
      name: setSorted.name,
      classIds: setSorted.classIds,
      stats: setSorted.stats,
    }));

    set({ [setsListName]: setsListSortedLight });
  },
}));

export default useSetsStore;
