import React, { createContext, useContext, useEffect, useState } from "react";
import { statNames } from "@/data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "@/utils/toast";
import { getSetStatsFromElementsClassIds } from "@/utils/getSetStatsFromElementsClassIds";
import * as Clipboard from "expo-clipboard";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";

// Créer le contexte
const SetsListContext = createContext();

// Fournisseur du contexte
export const SetsListProvider = ({ children }) => {
  const [chosenStats, setChosenStats] = useState(
    statNames.map((statName, index) => {
      return {
        name: statName,
        checked: index === 0,
        value: index === 0 ? 0 : null,
        statFilterNumber: 0,
        setStatFilterNumber: (newState) => {
          setChosenStats((prevStats) =>
            prevStats.map((stat) => (stat.name === statName ? { ...stat, statFilterNumber: newState } : stat))
          );
        },
      };
    })
  );

  const syncWithChosenStats = (setStatsVisibleList) => setStatsVisibleList(chosenStats);

  const setDefault = {
    name: "Set 0",
    classIds: [9, 16, 30, 39],
    stats: [4, 3.75, 4.25, 4.5, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 4],
  };

  const [setsListDisplayed, setSetsListDisplayed] = useState([{ ...setDefault }]);

  const [setsListSaved, setSetsListSaved] = useState([]);

  const [setsListFound, setSetsListFound] = useState([]);

  const [setCardEdittedIndex, setSetCardEdittedIndex] = useState(0); // Stocke l'ID de la `SetCardChosen` active

  const [setsSavedKeys, setSetsSavedKeys] = useState([]);

  const sortKeys = (keys) => {
    return keys.sort((a, b) => a.localeCompare(b));
  };

  const getSetsSavedKeys = async () => {
    try {
      const excludedKeys = ["language", "theme", "statsVisibleConfig", "statsVisibleListDefault"];
      const keys = await AsyncStorage.getAllKeys();
      const onlySetsKeys = keys.filter((key) => !excludedKeys.includes(key));
      return sortKeys(onlySetsKeys);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    }
  };

  const getSetsSavedValues = async (setsSavedKeys) => {
    try {
      const setsSavedKeysAndValues = await AsyncStorage.multiGet(setsSavedKeys);
      return setsSavedKeysAndValues.map((keyAndValue) => JSON.parse(keyAndValue[1]));
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    }
  };

  const updateSetsSavedKeys = async () => {
    const newSetsSavedKeys = await getSetsSavedKeys();
    setSetsSavedKeys(newSetsSavedKeys);
    return newSetsSavedKeys;
  };

  // Au démarrage, charger les Savedsets depuis la mémoire
  const fetchSavedSets = async () => {
    const newSetsSavedKeys = await updateSetsSavedKeys();
    const savedSets = await getSetsSavedValues(newSetsSavedKeys);
    setSetsListSaved(savedSets);
  };

  useEffect(() => {
    fetchSavedSets();
  }, []);

  const addNewSetInDisplay = () => {
    const setsListDisplayedNames = setsListDisplayed.map((set) => set.name);

    let newSetNumber = 0;
    while (setsListDisplayedNames.includes(`Set ${newSetNumber}`)) {
      newSetNumber += 1;
    }
    const newSet = { ...setDefault, name: `Set ${newSetNumber}` };

    setSetsListDisplayed((prev) => [...prev, newSet]);
  };

  const loadSetToDisplay = (setCardSelected) => {
    setSetsListDisplayed((prev) => [...prev, setCardSelected]);
  };

  const removeSet = (setCardSelectedIndex, screenName) => {
    const setsListConcerned = screenName === "display" ? setsListDisplayed : setsListSaved;
    const setSetsListConcerned = screenName === "display" ? setSetsListDisplayed : setSetsListSaved;

    if (screenName == "display" && setsListConcerned.length === 1) {
      showToast("Erreur", "Vous devez garder au moins 1 set");
    } else {
      setSetsListConcerned((prev) => prev.filter((set, index) => index !== setCardSelectedIndex));

      if (setCardSelectedIndex < setCardEdittedIndex) {
        setSetCardEdittedIndex(setCardEdittedIndex - 1);
      } else if (setCardSelectedIndex === setCardEdittedIndex) {
        setSetCardEdittedIndex(Math.max(0, setCardEdittedIndex - 1));
      }
    }
  };

  const removeSetInMemory = async (setCardSelectedIndex) => {
    const keyToRemove = setsSavedKeys[setCardSelectedIndex];

    await AsyncStorage.removeItem(keyToRemove);

    setSetsSavedKeys((prevKeys) => prevKeys.filter((key) => key !== keyToRemove));

    removeSet(setCardSelectedIndex, "save");
  };

  const loadSetToSearch = (setCardSelected) => {
    const setCardSelectedStatList = setCardSelected.stats;
    setChosenStats((prev) =>
      prev.map((chosenStat, index) => {
        chosenStat.value = setCardSelectedStatList[index];
        return chosenStat;
      })
    );
    showToast("Succès", "Les stats du set ont été chargéés");
  };

  const loadSetSaveToSearch = (setCardSelectedIndex) => {
    const setCardSelected = setsListSaved[setCardSelectedIndex];
    loadSetToSearch(setCardSelected);
  };

  const loadSetDisplayToSearch = (setCardSelectedIndex) => {
    const setCardSelected = setsListDisplayed[setCardSelectedIndex];
    loadSetToSearch(setCardSelected);
  };

  const loadSetSaveToDisplay = (setCardSelectedIndex) => {
    const setCardSelected = setsListSaved[setCardSelectedIndex];
    loadSetToDisplay(setCardSelected);
    showToast("Succès", "Le set a été chargé");
  };

  const loadSetSearchToDisplay = (setCardSelectedIndex) => {
    const setCardSelected = setsListFound[setCardSelectedIndex];
    loadSetToDisplay(setCardSelected);
    showToast("Succès", "Le set a été ajouté à l'écran de comparaison");
  };

  const saveSet = async (setCardSelected) => {
    try {
      setSetsListSaved((prev) => [...prev, setCardSelected]);
      saveSetInMemory(setCardSelected);

      showToast("Succès", "Le set est enregistré");
      return true;
    } catch (err) {
      alert(err);
      return false;
    }
  };

  const saveSetInMemory = async (set) => {
    let key = 0;
    while (setsSavedKeys.includes(String(key))) {
      key += 1;
    }

    setSetsSavedKeys((prev) => [...prev, key]);
    setSetInMemory(key, set);
  };

  const saveSetFromDisplay = async (setCardSelectedIndex) => {
    const setCardSelected = setsListDisplayed[setCardSelectedIndex];
    await saveSet(setCardSelected);
  };

  const saveSetFromFound = async (setCardSelectedIndex) => {
    const setCardSelected = setsListFound[setCardSelectedIndex];
    await saveSet(setCardSelected);
  };

  const renameSet = (newName, screenName, setCardIndex) => {
    const setsListConcerned =
      screenName === "search" ? setSetsListFound : screenName === "display" ? setSetsListDisplayed : setSetsListSaved;
    setsListConcerned((prev) =>
      prev.map((set, index) => {
        if (index === setCardIndex) {
          const setWithNewName = { ...set, name: newName };

          if (screenName == "save") {
            const key = setsSavedKeys[index];
            setSetInMemory(key, setWithNewName);
          }

          return setWithNewName;
        } else {
          return set;
        }
      })
    );
  };

  const updateSetsList = async (pressedClassIds, screenName) => {
    const pressedClassIdsList = Object.values(pressedClassIds);
    const setSetsListConcerned = screenName === "display" ? setSetsListDisplayed : setSetsListSaved;
    setSetsListConcerned((prev) => {
      return prev.map((set, index) => {
        if (index === setCardEdittedIndex) {
          const newSet = {
            ...set,
            classIds: pressedClassIdsList,
            stats: getSetStatsFromElementsClassIds(pressedClassIdsList),
          };
          if (screenName === "save") {
            const key = setsSavedKeys[index];
            setSetInMemory(key, newSet);
          }
          return newSet;
        } else {
          return set;
        }
      });

      // Une fois que tout est prêt, tu mets à jour
    });
  };

  const setSetInMemory = async (key, set) => {
    await saveThingInMemory(key, set);
  };

  const sortSetsSavedKeys = () => {
    setSetsSavedKeys((prevKeys) => {
      const keyToName = {}; // a dict you ask a key and it answers the name of this set
      prevKeys.forEach((key, index) => {
        keyToName[key] = setsListSaved[index].name;
      });

      const keysSorted = [...prevKeys].sort((a, b) => {
        return keyToName[a].localeCompare(keyToName[b]);
      });

      const setsListSavedSorted = keysSorted.map((key) => {
        const index = prevKeys.indexOf(key);
        return setsListSaved[index];
      });

      setSetsListSaved(setsListSavedSorted);

      // dans la memoire
      setsListSavedSorted.forEach((set, index) => {
        setSetInMemory(index, set);
      });
      return keysSorted;
    });
  };

  const exportSet = (setCardIndex, screenName) => {
    const setsListConcerned =
      screenName === "search" ? setsListFound : screenName === "display" ? setsListDisplayed : setsListSaved;
    const { name, classIds } = setsListConcerned[setCardIndex];
    const json = JSON.stringify({ name, classIds });
    Clipboard.setStringAsync(json);
    showToast("Succès", "Set copié dans le presse-papier !");
  };

  const importSet = (setCard, screenName) => {
    const loadSet = screenName === "search" ? loadSetToSearch : screenName === "display" ? loadSetToDisplay : saveSet;
    loadSet(setCard);
  };

  return (
    <SetsListContext.Provider
      value={{
        chosenStats,
        setChosenStats,
        syncWithChosenStats,
        setsListDisplayed,
        setsListSaved,
        setsListFound,
        setSetsListFound,
        addNewSetInDisplay,
        loadSetSaveToSearch,
        loadSetSaveToDisplay,
        loadSetSearchToDisplay,
        loadSetDisplayToSearch,
        removeSet,
        removeSetInMemory,
        saveSetFromDisplay,
        saveSetFromFound,
        renameSet,
        updateSetsList,
        setCardEdittedIndex,
        setSetCardEdittedIndex,
        sortSetsSavedKeys,
        exportSet,
        importSet,
      }}
    >
      {children}
    </SetsListContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useSetsList = () => {
  return useContext(SetsListContext);
};
