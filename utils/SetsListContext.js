import React, { createContext, useContext, useEffect, useState } from "react";
import { statNames } from "@/data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "./toast";
import { searchSetStatsFromElementsIds } from "./searchSetStatsFromElementsIds";

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
            prevStats.map((stat) =>
              stat.name === statName
                ? { ...stat, statFilterNumber: newState }
                : stat
            )
          );
        },
      };
    })
  );

  const setDefault = {
    name: "Set 0",
    classIds: [9, 16, 30, 39],
    stats: [4, 3.75, 4.25, 4.5, 3.5, 3.5, 3.5, 3.5, 3, 3.5, 3.5, 4],
  };

  const [setsListDisplayed, setSetsListDisplayed] = useState([
    { ...setDefault },
  ]);

  const [setsListSaved, setSetsListSaved] = useState([]);

  const [setsListFound, setSetsListFound] = useState([]);

  const [setCardActiveIndex, setSetCardActiveIndex] = useState(0); // Stocke l'ID de la `SetCardChosen` active

  const [setsSavedKeys, setSetsSavedKeys] = useState([]);

  const sortKeys = (keys) => {
    return keys.sort((a, b) => b.localeCompare(a));
  };

  const getSetsSavedKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return sortKeys(keys);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    }
  };

  const getSetsSavedValues = async (setsSavedKeys) => {
    try {
      const setsSavedKeysAndValues = await AsyncStorage.multiGet(setsSavedKeys);
      return setsSavedKeysAndValues.map((keyAndValue) =>
        JSON.parse(keyAndValue[1])
      );
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

  const addSet = () => {
    const setsListDisplayedNames = setsListDisplayed.map((set) => set.name);

    let newSetNumber = 0;
    while (setsListDisplayedNames.includes(`Set ${newSetNumber}`)) {
      newSetNumber += 1;
    }
    const newSet = { ...setDefault, name: `Set ${newSetNumber}` };

    setSetsListDisplayed((prev) => [...prev, newSet]);
  };

  const removeSet = (setCardSelectedIndex, situation) => {
    const setsListConcerned =
      situation === "display" ? setsListDisplayed : setsListSaved;
    const setListUpdater =
      situation === "display" ? setSetsListDisplayed : setSetsListSaved;

    if (situation == "display" && setsListConcerned.length === 1) {
      showToast("Erreur", "Vous devez garder au moins 1 set");
    } else {
      setListUpdater((prev) =>
        prev.filter((set, index) => index !== setCardSelectedIndex)
      );

      if (setCardSelectedIndex < setCardActiveIndex) {
        setSetCardActiveIndex(setCardActiveIndex - 1);
      } else if (setCardSelectedIndex === setCardActiveIndex) {
        setSetCardActiveIndex(Math.max(0, setCardActiveIndex - 1));
      }
    }
  };

  const removeSetInMemory = async (setCardSelectedIndex) => {
    const keyToRemove = setsSavedKeys[setCardSelectedIndex];

    await AsyncStorage.removeItem(keyToRemove);

    setSetsSavedKeys((prevKeys) =>
      prevKeys.filter((key) => key !== keyToRemove)
    );

    removeSet(setCardSelectedIndex, "save");
  };

  const loadSetSaveToSearch = (setCardSelectedIndex) => {
    const setCardSelected = setsListSaved[setCardSelectedIndex];
    const setCardSelectedStatList = setCardSelected.stats;

    setChosenStats((prev) =>
      prev.map((chosenStat, index) => {
        chosenStat.value = setCardSelectedStatList[index];
        return chosenStat;
      })
    );
    showToast("Succès", "Les stats du set ont été chargéés");
  };

  const loadSetSaveToDisplay = (setCardSelectedIndex) => {
    const setCardSelected = setsListSaved[setCardSelectedIndex];
    addSet(setCardSelected);
    showToast("Succès", "Le set a été chargé");
  };

  const loadSetSearchToDisplay = (setCardSelectedIndex) => {
    const setCardSelected = setsListFound[setCardSelectedIndex];
    addSet(setCardSelected);
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
    setItemInMemory(key, set);
  };

  const saveSetFromDisplay = async (setCardSelectedIndex) => {
    const setCardSelected = setsListDisplayed[setCardSelectedIndex];
    await saveSet(setCardSelected);
  };

  const saveSetFromFound = async (setCardSelectedIndex) => {
    const setCardSelected = setsListFound[setCardSelectedIndex];
    await saveSet(setCardSelected);
  };

  const renameSet = (newName, situation, setCardIndex) => {
    const setsListConcerned =
      situation === "search"
        ? setSetsListFound
        : situation === "display"
        ? setSetsListDisplayed
        : setSetsListSaved;
    setsListConcerned((prev) =>
      prev.map((set, index) => {
        if (index === setCardIndex) {
          const setWithNewName = { ...set, name: newName };

          if (situation == "save" || situation == "load") {
            setItemInMemory(setCardIndex, setWithNewName);
          }

          return setWithNewName;
        } else {
          return set;
        }
      })
    );
  };

  const updateSetsList = async (pressedClassIds, situation) => {
    const pressedClassIdsList = Object.values(pressedClassIds);
    const setSetsListConcerned =
      situation === "display" ? setSetsListDisplayed : setSetsListSaved;
    setSetsListConcerned((prev) => {
      return prev.map((set, index) => {
        if (index === setCardActiveIndex) {
          const newSet = {
            ...set,
            classIds: pressedClassIdsList,
            stats: searchSetStatsFromElementsIds(pressedClassIdsList),
          };
          if (situation === "save") {
            const key = setsSavedKeys[index];
            setItemInMemory(key, newSet);
          }
          return newSet;
        } else {
          return set;
        }
      });

      // Une fois que tout est prêt, tu mets à jour
    });
  };

  const updateEntireSetsListFound = (setsFoundClassIds) => {
    let setsFoundWithName = setsFoundClassIds.map((setsFoundClassIds) => ({
      name: null,
      ...setsFoundClassIds,
    }));
    setSetsListFound(setsFoundWithName);
  };

  const setItemInMemory = async (key, set) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(set));
    } catch (err) {
      alert(err);
    }
  };

  const sortSetsSavedKeys = () => {
    setSetsSavedKeys((prevKeys) => {
      const keyToName = {};
      prevKeys.forEach((key, i) => {
        keyToName[key] = setsListSaved[i].name;
      });

      const keysSorted = [...prevKeys].sort((a, b) => {
        return keyToName[a].localeCompare(keyToName[b]);
      });

      const setsListSavedSorted = keysSorted.map((key) => {
        const index = prevKeys.indexOf(key);
        return setsListSaved[index];
      });
      setSetsListSaved(setsListSavedSorted);

      sortSetsInMemory(keysSorted);
      return keysSorted;
    });
  };

  const sortSetsInMemory = (setsSavedKeysSorted) => {
    setsSavedKeysSorted.forEach((key, index) => {
      const set = setsListSaved[index];
      setItemInMemory(key, set);
    });
  };

  return (
    <SetsListContext.Provider
      value={{
        chosenStats,
        setChosenStats,
        setsListDisplayed,
        setsListSaved,
        setsListFound,
        updateEntireSetsListFound,
        addSet,
        loadSetSaveToSearch,
        loadSetSaveToDisplay,
        loadSetSearchToDisplay,
        removeSet,
        removeSetInMemory,
        saveSetFromDisplay,
        saveSetFromFound,
        renameSet,
        updateSetsList,
        setCardActiveIndex,
        setSetCardActiveIndex,
        sortSetsSavedKeys,
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
