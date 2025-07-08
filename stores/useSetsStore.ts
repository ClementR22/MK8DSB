// Third-party libraries
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

// Data and Types
import { statNames } from "@/data/stats/statsData";
import { ScreenName } from "@/contexts/ScreenContext";
import { ResultStats } from "@/contexts/ResultStatsContext";
import { Stat } from "@/data/stats/statsTypes";

// Utilities
import showToast from "@/utils/toast";
import { getSetStatsFromClassIds } from "@/utils/getSetStatsFromClassIds";
import {
  deleteAllSavedSetsInMemory,
  getOnlySetsSavedKeysFromMemory,
  saveThingInMemory,
} from "@/utils/asyncStorageOperations";

const MAX_NUMBER_SETS_DISPLAY = 10;
export interface ChosenStat {
  name: Stat;
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
  setsListDisplayed: SetObject[];
  setsListSaved: SetObject[];
  setsListFound: SetFoundObject[];
  setCardEditedId: string;
  setKeyInDisplay: number;

  setChosenStats: (newChosenStats: ChosenStat[]) => void;
  setSetsListFound: (newSetsList: SetFoundObject[]) => void;
  setSetCardEditedId: (id: string) => void;
  updateStatValue: (name: string, newValue: number) => void;
  syncWithChosenStats: (setResultStats: (list: ResultStats) => void) => void;
  setStatFilterNumber: (statName: string, newState: number) => void;
  fetchSetsSavedKeys: () => Promise<string[]>;
  fetchSavedSets: () => Promise<void>;
  addNewSetInDisplay: () => void;
  loadSetToDisplay: (setToLoad: SetObject) => boolean; // Modifié pour refléter le retour de checkNameUnique
  loadSetToSave: (setToLoad: SetObject) => void;
  removeSet: (id: string, screenName: ScreenName) => void;
  removeSetInMemory: (keyToRemove: string) => Promise<void>;
  loadSetToSearch: (set: SetObject) => void;
  loadSetSaveToSearch: (id: string) => void;
  loadSetDisplayToSearch: (id: string) => void;
  loadSetSaveToDisplay: (id: string) => void;
  loadSetSearchToDisplay: (id: string) => void;
  checkNameUnique: (name: string, screenName: ScreenName) => boolean;
  saveSet: (screenName: ScreenName, id: string) => boolean;
  saveSetInMemory: (setToSave: SetObject) => Promise<void>;
  renameSet: (newName: string, screenName: ScreenName, id: string) => boolean;
  updateSetsList: (pressedClassIds: Record<string, number>, screenName: ScreenName) => Promise<void>;
  setSetInMemory: (setObj: SetObject) => Promise<void>;
  exportSet: (id: string, screenName: ScreenName) => void;
  importSet: (clipboardContent: string, screenName: ScreenName) => void;
  deleteAllSavedSets: () => void;
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
  stats: [4, 3.75, 4.25, 4.5, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 4],
};

const useSetsStore = create<SetsStoreState>((set, get) => ({
  chosenStats: statNames.map((statName, index) => ({
    name: statName,
    checked: index === 0,
    value: 0,
    statFilterNumber: 0,
  })),

  setsListDisplayed: [{ ...setDefault }, { ...setDefault2 }],
  setsListSaved: [],
  setsListFound: [],
  setCardEditedId: null,
  setKeyInDisplay: 1,

  setChosenStats: (newChosenStats) => {
    set({ chosenStats: newChosenStats });
  },

  setSetsListFound: (newSetsList) => set({ setsListFound: newSetsList }),

  setSetCardEditedId: (id) => {
    set({ setCardEditedId: id });
  },

  updateStatValue: (name, newValue) =>
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) => (stat.name === name ? { ...stat, value: newValue } : stat)),
    })),

  syncWithChosenStats: (setResultStats) => {
    setResultStats(get().chosenStats);
  },

  setStatFilterNumber: (statName, newState) => {
    set((state) => ({
      chosenStats: state.chosenStats.map((stat) =>
        stat.name === statName ? { ...stat, statFilterNumber: newState } : stat
      ),
    }));
  },

  fetchSetsSavedKeys: async () => {
    const setsKeys = await getOnlySetsSavedKeysFromMemory();
    return setsKeys;
  },

  fetchSavedSets: async () => {
    const setsKeys = await get().fetchSetsSavedKeys();
    // Utilise Promise.all pour récupérer tous les sets en parallèle
    const setsData = await AsyncStorage.multiGet(setsKeys);
    const parsed: SetObject[] = setsData
      .map(([, value]) => {
        try {
          return value ? JSON.parse(value) : null;
        } catch (e) {
          console.error("Error parsing saved set:", e);
          return null;
        }
      })
      .filter((set) => set !== null) as SetObject[]; // Filtrer les null et caster

    set({ setsListSaved: parsed });
  },

  addNewSetInDisplay: () => {
    if (get().setsListDisplayed.length < MAX_NUMBER_SETS_DISPLAY) {
      let newIndex = get().setKeyInDisplay;
      let newName: string;
      do {
        newIndex++;
        newName = `Set ${newIndex}`;
      } while (!get().checkNameUnique(newName, "display")); // La fonction checkNameUnique affiche un toast, ce qui est OK ici

      set((state) => {
        return {
          setKeyInDisplay: newIndex,
          setsListDisplayed: [...state.setsListDisplayed, { ...setDefault, id: nanoid(8), name: newName }], // Utiliser newName
        };
      });
    } else {
      showToast("Erreur" + " " + "Vous ne pouvez pas comparer plus de " + MAX_NUMBER_SETS_DISPLAY + " sets.");
    }
  },

  loadSetToDisplay: (setToLoad) => {
    // La fonction `checkNameUnique` affiche déjà un toast d'erreur si le nom n'est pas unique.
    const isNameUnique = get().checkNameUnique(setToLoad.name, "display");
    if (!isNameUnique) {
      // Si le nom n'est pas unique, on ne charge pas le set et on retourne false
      return false;
    }

    if (get().setsListDisplayed.length < MAX_NUMBER_SETS_DISPLAY) {
      const setToLoadWithNewId = { ...setToLoad, id: nanoid(8) };
      set((state) => ({
        setsListDisplayed: [...state.setsListDisplayed, setToLoadWithNewId],
      }));
      showToast("Succès" + " " + "Le set a été ajouté à l'écran de comparaison");
      return true;
    } else {
      showToast("Erreur" + " " + "Vous ne pouvez pas comparer plus de " + MAX_NUMBER_SETS_DISPLAY + " sets.");
      return false;
    }
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
    showToast("Succès" + " " + "Le set a été chargé dans les favoris");
  },

  removeSet: (id, screenName) => {
    const isSave = screenName === "save";
    const targetList = !isSave ? get().setsListDisplayed : get().setsListSaved;
    const listName = !isSave ? "setsListDisplayed" : "setsListSaved";

    if (isSave) {
      get().removeSetInMemory(id); // Supprime de AsyncStorage
    }

    // Filtrer la liste en mémoire
    const newList = targetList.filter((set) => set.id !== id);
    set({
      [listName]: newList,
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
    showToast("Succès" + " " + "Les stats du set ont été chargées");
  },

  loadSetSaveToSearch: (id) => {
    const setFromSaved = get().setsListSaved.find((set) => set.id === id);
    if (setFromSaved) {
      get().loadSetToSearch(setFromSaved);
    } else {
      showToast("Erreur" + " " + "Le set sauvegardé n'a pas été trouvé.");
    }
  },

  loadSetDisplayToSearch: (id) => {
    const setFromDisplay = get().setsListDisplayed.find((set) => set.id === id);
    if (setFromDisplay) {
      get().loadSetToSearch(setFromDisplay);
    } else {
      showToast("Erreur" + " " + "Le set affiché n'a pas été trouvé.");
    }
  },

  loadSetSaveToDisplay: (id) => {
    const setFromSaved = get().setsListSaved.find((set) => set.id === id);
    if (setFromSaved) {
      get().loadSetToDisplay(setFromSaved);
    } else {
      showToast("Erreur" + " " + "Le set sauvegardé n'a pas été trouvé.");
    }
  },

  loadSetSearchToDisplay: (id) => {
    const setSelected = get().setsListFound.find((set) => set.id === id);
    if (setSelected) {
      const { percentage, ...setToLoad } = setSelected; // Destructurer percentage si présent
      get().loadSetToDisplay(setToLoad);
    } else {
      showToast("Erreur" + " " + "Le set trouvé n'a pas été trouvé.");
    }
  },

  checkNameUnique: (name, screenName) => {
    const targetList =
      screenName === "search"
        ? get().setsListFound
        : screenName === "display"
        ? get().setsListDisplayed
        : get().setsListSaved;

    const setsNames = targetList.map((set) => set.name);

    if (setsNames.includes(name)) {
      showToast("Erreur" + " " + "Ce nom de set existe déjà");
      return false;
    }
    return true;
  },

  saveSet: (screenName, id) => {
    const list = screenName === "search" ? get().setsListFound : (get().setsListDisplayed as SetFoundObject[]);

    try {
      const setSelected = list.find((set) => set.id === id);
      if (!setSelected) {
        showToast("Erreur" + " " + "Le set n'existe pas"); // Utilisez showToast au lieu de throw
        return false;
      }
      const { percentage, ...setToSave } = setSelected; // Destructurer percentage si présent

      // checkNameUnique affichera un toast si le nom n'est pas unique
      const isNameUnique = get().checkNameUnique(setToSave.name, "save");
      if (!isNameUnique) return false;

      get().loadSetToSave(setToSave);
      showToast("Succès" + " " + "Le set a été enregistré");
      return true;
    } catch (e) {
      console.error("Error saving set:", e); // Log l'erreur
      showToast("Erreur" + " " + "Une erreur est survenue lors de l'enregistrement du set.");
      return false;
    }
  },

  saveSetInMemory: async (setToSave) => {
    await saveThingInMemory(setToSave.id, setToSave);
  },

  renameSet: (newName, screenName, setToShowId) => {
    // Assurez-vous que le nouveau nom n'est pas déjà utilisé dans la liste CIBLE (sauf pour le set que l'on renomme)
    const setsListName =
      screenName === "search" ? "setsListFound" : screenName === "display" ? "setsListDisplayed" : "setsListSaved";
    const setsList = get()[setsListName] as SetObject[] | SetFoundObject[];

    // Vérifier l'unicité du nom en ignorant le set en cours d'édition
    const isNewNameUniqueExceptCurrent = setsList.every((set) => {
      return set.name !== newName;
    });

    if (!isNewNameUniqueExceptCurrent) {
      showToast("Erreur" + " " + "Ce nom de set existe déjà dans cette liste.");
      return false;
    }

    const setsListUpdated = setsList.map((set: SetObject) => {
      if (set.id === setToShowId) {
        const newSet = { ...set, name: newName };

        if (screenName === "save") {
          get().setSetInMemory(newSet);
        } else {
          console.warn("Key not found for set to rename in AsyncStorage.");
        }

        return newSet;
      }
      return set;
    });
    set({ [setsListName]: setsListUpdated } as any);
    showToast("Succès" + " " + "Set renommé !");
    return true;
  },

  updateSetsList: async (pressedClassIdsObj, screenName) => {
    const setsListName = screenName === "display" ? "setsListDisplayed" : "setsListSaved";
    const setsList = get()[setsListName as keyof SetsStoreState] as SetObject[];
    const newClassIds = Object.values(pressedClassIdsObj);
    const setCardEditedId = get().setCardEditedId;

    const setsListUpdated = setsList.map((set) => {
      if (set.id === setCardEditedId) {
        const newSet = {
          ...set,
          classIds: newClassIds,
          stats: getSetStatsFromClassIds(newClassIds), // Recalcule les stats
        };
        if (screenName === "save") {
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
    const list =
      screenName === "search"
        ? get().setsListFound
        : screenName === "display"
        ? get().setsListDisplayed
        : get().setsListSaved;

    const setObjToExport = list.find((set) => set.id === id);
    if (!setObjToExport) {
      showToast("Erreur" + " " + "Le set à exporter n'existe pas.");
      return;
    }

    // Exporter uniquement le nom et les classIds comme indiqué dans votre exemple précédent
    const { name, classIds } = setObjToExport;
    const json = JSON.stringify({ name, classIds });
    Clipboard.setStringAsync(json);
    showToast("Succès" + " " + "le set a été copié dans le presse-papier !");
  },

  importSet: (clipboardContent: string, screenName: ScreenName) => {
    let parsedSet;

    try {
      parsedSet = JSON.parse(clipboardContent);
    } catch (err) {
      throw new Error("IncorrectFormat");
    }

    if (typeof parsedSet !== "object" || Array.isArray(parsedSet) || parsedSet === null) {
      throw new Error("IncorrectFormat");
    }

    const { name, classIds } = parsedSet;

    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("IncorrectFormat");
    }

    if (!Array.isArray(classIds) || classIds.some((id) => typeof id !== "number")) {
      throw new Error("IncorrectFormat");
    }

    const stats = getSetStatsFromClassIds(classIds);
    if (!stats || stats.length === 0) {
      throw new Error("ThisSetDoesNotExist");
    }

    const set = { ...parsedSet, id: nanoid(8), stats };

    // Ici, fais ce que tu veux : addToStore, update, etc.
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
    showToast("Succès" + " " + "Tous les sets sauvegardés ont été supprimés !");
  },
}));

export default useSetsStore;
