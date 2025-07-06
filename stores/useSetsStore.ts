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
  setsSavedKeys: string[];
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
  loadSetToSave: (setTOLoad: SetObject) => void;
  removeSet: (id: string, screenName: ScreenName) => void;
  removeSetInMemory: (id: string) => Promise<void>;
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
  setSetInMemory: (key: string | number, setObj: SetObject) => Promise<void>;
  sortSetsSavedKeys: () => void;
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

const useSetsStore = create<SetsStoreState>((set, get) => ({
  chosenStats: statNames.map((statName, index) => ({
    name: statName,
    checked: index === 0,
    value: 0,
    statFilterNumber: 0,
  })),

  setsListDisplayed: [{ ...setDefault }],
  setsListSaved: [],
  setsListFound: [],
  setsSavedKeys: [],
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
    const sorted = setsKeys.sort((a, b) => a.localeCompare(b));
    set({ setsSavedKeys: sorted });
    return sorted;
  },

  fetchSavedSets: async () => {
    const keys = await get().fetchSetsSavedKeys();
    // Utilise Promise.all pour récupérer tous les sets en parallèle
    const setsData = await AsyncStorage.multiGet(keys);
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
      set((state) => ({
        setsListDisplayed: [...state.setsListDisplayed, setToLoad],
      }));
      showToast("Succès" + " " + "Le set a été ajouté à l'écran de comparaison");
      return true;
    } else {
      showToast("Erreur" + " " + "Vous ne pouvez pas comparer plus de " + MAX_NUMBER_SETS_DISPLAY + " sets.");
      return false;
    }
  },

  loadSetToSave: (setToLoad) => {
    let nameToUse = setToLoad.name;
    let newIndex = 0; // Commencer l'indexation pour les noms dupliqués
    // Vérifier l'unicité du nom en mode 'save'
    while (!get().checkNameUnique(nameToUse, "save")) {
      nameToUse = `${setToLoad.name} (${newIndex})`; // Ajouter un suffixe comme "(0)", "(1)"
      newIndex++;
    }
    // Une fois qu'un nom unique est trouvé, utilisez-le
    const finalSetToLoad = { ...setToLoad, name: nameToUse };

    set((state) => ({
      setsListSaved: [...state.setsListSaved, finalSetToLoad],
    }));
    get().saveSetInMemory(finalSetToLoad); // Sauvegarder immédiatement le set avec le nouveau nom unique
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

  removeSetInMemory: async (id) => {
    const keyToRemove = id;
    if (keyToRemove) {
      await AsyncStorage.removeItem(keyToRemove);
      set((state) => ({
        setsSavedKeys: state.setsSavedKeys.filter((key) => key !== id), // Filtrer par index pour garder la cohérence
      }));
    } else {
      console.warn(`Attempted to remove set ${id}, but no key found.`);
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

      set((state) => ({
        setsListSaved: [...state.setsListSaved, setToSave],
      }));
      get().saveSetInMemory(setToSave); // Appeler la fonction pour sauvegarder dans AsyncStorage
      showToast("Succès" + " " + "Le set a été enregistré");
      return true;
    } catch (e) {
      console.error("Error saving set:", e); // Log l'erreur
      showToast("Erreur" + " " + "Une erreur est survenue lors de l'enregistrement du set.");
      return false;
    }
  },

  saveSetInMemory: async (setToSave) => {
    // Générer une clé unique simple si vous n'avez pas d'ID stable pour le set
    let key = 0;
    const existingKeys = await getOnlySetsSavedKeysFromMemory(); // Récupérer les clés actuelles de l'AsyncStorage
    // Chercher la première clé numérique non utilisée
    while (existingKeys.includes(String(key))) {
      key++;
    }
    const newKey = String(key);
    // Mettre à jour l'état `setsSavedKeys` AVANT de sauvegarder
    set((state) => ({
      setsSavedKeys: [...state.setsSavedKeys, newKey],
    }));
    await saveThingInMemory(newKey, setToSave);
  },

  renameSet: (newName, screenName, setToShowId) => {
    // Assurez-vous que le nouveau nom n'est pas déjà utilisé dans la liste CIBLE (sauf pour le set que l'on renomme)
    const listName =
      screenName === "search" ? "setsListFound" : screenName === "display" ? "setsListDisplayed" : "setsListSaved";
    const list = get()[listName] as SetObject[] | SetFoundObject[];

    // Vérifier l'unicité du nom en ignorant le set en cours d'édition
    const isNewNameUniqueExceptCurrent = list.every((set) => {
      return set.name !== newName;
    });

    if (!isNewNameUniqueExceptCurrent) {
      showToast("Erreur" + " " + "Ce nom de set existe déjà dans cette liste.");
      return false;
    }

    const updated = list.map((set: SetObject) => {
      if (set.id === setToShowId) {
        const renamed = { ...set, name: newName };

        if (screenName === "save") {
          // Si le set est renommé dans la liste sauvegardée, mettez à jour AsyncStorage
          const key = get().setsSavedKeys[setToShowId];
          if (key) {
            get().setSetInMemory(key, renamed);
          } else {
            console.warn("Key not found for set to rename in AsyncStorage.");
          }
        }
        return renamed;
      }
      return set;
    });
    set({ [listName]: updated } as any);
    showToast("Succès" + " " + "Set renommé !");
    return true;
  },

  updateSetsList: async (pressedClassIdsObj, screenName) => {
    const listName = screenName === "display" ? "setsListDisplayed" : "setsListSaved";
    const list = get()[listName as keyof SetsStoreState] as SetObject[];
    const classIds = Object.values(pressedClassIdsObj);
    const setCardEditedId = get().setCardEditedId;

    const updated = list.map((set) => {
      if (set.id === setCardEditedId) {
        const newSet = {
          ...set,
          classIds,
          stats: getSetStatsFromClassIds(classIds), // Recalcule les stats
        };
        if (screenName === "save") {
          // Si le set est mis à jour dans la liste sauvegardée, mettez à jour AsyncStorage
          const key = get().setsSavedKeys[setCardEditedId];
          if (key) {
            get().setSetInMemory(key, newSet);
          } else {
            console.warn("Key not found for set to update in AsyncStorage.");
          }
        }
        return newSet;
      }
      return set;
    });

    set({ [listName]: updated } as any);
    showToast("Succès" + " " + "Set mis à jour !");
  },

  setSetInMemory: async (key, setObj) => {
    await saveThingInMemory(String(key), setObj);
  },

  sortSetsSavedKeys: () => {
    const keys = get().setsSavedKeys;
    const sets = get().setsListSaved;

    // Créer une map temporaire pour associer les clés aux noms de set (pour le tri)
    const keyToNameMap = new Map<string, string>();
    sets.forEach((setObj, index) => {
      const key = keys[index]; // Utilisez la clé actuelle à cet index
      if (key) {
        keyToNameMap.set(key, setObj.name);
      }
    });

    // Trier les clés en fonction des noms de set associés
    const sortedKeys = [...keys].sort((a, b) => {
      const nameA = keyToNameMap.get(a) || "";
      const nameB = keyToNameMap.get(b) || "";
      return nameA.localeCompare(nameB);
    });

    // Recréer setsListSaved dans le nouvel ordre
    const sortedSetsListSaved = sortedKeys
      .map((key) => sets.find((setObj, index) => keys[index] === key)) // Trouver le set original par sa clé
      .filter(Boolean) as SetObject[]; // Filtrer les éléments undefined/null et caster

    set({
      setsSavedKeys: sortedKeys,
      setsListSaved: sortedSetsListSaved,
    });

    // Optionnel: Re-sauvegarder les sets si vous voulez garantir que l'ordre des clés dans AsyncStorage correspond à setsSavedKeys
    // Attention: Si vos clés sont des IDs uniques qui ne changent JAMAIS, cette boucle est inutile.
    // Si vos clés sont basées sur l'index (comme "0", "1", "2"), alors vous devrez peut-être revoir la logique
    // de gestion des clés lors de la sauvegarde et suppression pour qu'elles restent contigües et triées.
    // Pour l'instant, cette boucle met à jour le contenu de la clé existante dans l'AsyncStorage.
    sortedKeys.forEach((key, i) => {
      const setObj = sortedSetsListSaved[i];
      if (setObj) {
        get().setSetInMemory(key, setObj);
      }
    });
    showToast("Succès" + " " + "Sets triés !");
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
    // Réini tialiser les listes et les clés dans l'état du store
    set({ setsListSaved: [], setsSavedKeys: [] });
    // Appeler la fonction utilitaire pour supprimer de l'AsyncStorage
    deleteAllSavedSetsInMemory();
    showToast("Succès" + " " + "Tous les sets sauvegardés ont été supprimés !");
  },
}));

export default useSetsStore;
