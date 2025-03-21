import React, { createContext, useContext, useEffect, useState } from "react";
import { bodyTypeNames, elementsAllInfosList } from "../data/data";
import { translate } from "../i18n/translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "./toast";
import { usePressableImages } from "./PressableImagesContext";
import { useOrderNumber } from "./OrderNumberContext";

// Créer le contexte
const SetsListContext = createContext();

// Fournisseur du contexte
export const SetsListProvider = ({ children }) => {
  const setDefault = { name: null, classIds: [9, 16, 30, 39] };

  const [setsListDisplayed, setSetsListDisplayed] = useState([
    { ...setDefault, classIds: [...setDefault.classIds] },
  ]);
  const [setsListSaved, setSetsListSaved] = useState([]);

  const [setsListFound, setSetsListFound] = useState([]);

  const { setChosenStats, searchSetStatsFromElementsIds } = useOrderNumber();

  const getSetsSavedNamesAndClassIds = async (onlyNames = false) => {
    try {
      const names = await AsyncStorage.getAllKeys();
      if (onlyNames) {
        return names;
      } else {
        const keyValuePairs = (await AsyncStorage.multiGet(names)).map(
          (keyValuePair) => {
            const setSaved = JSON.parse(keyValuePair[1]);
            return setSaved;
          }
        );
        return keyValuePairs;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchSavedSets = async () => {
      const savedSets = await getSetsSavedNamesAndClassIds();
      setSetsListSaved(savedSets);
    };

    fetchSavedSets();
  }, []);

  const [setCardActiveIndex, setSetCardActiveIndex] = useState(0); // Stocke l'ID de la `SetCardChosen` active

  const addSet = (
    newSet = { ...setDefault, classIds: [...setDefault.classIds] }
  ) => {
    setSetsListDisplayed((prev) => [...prev, newSet]);
  };

  const removeSet = (setCardSelectedIndex, situation) => {
    const setsListConcerned =
      situation == "display" ? setsListDisplayed : setsListSaved;
    const setListUpdater =
      situation == "display" ? setSetsListDisplayed : setSetsListSaved;

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

  const loadSetToSearch = (setCardSelectedIndex) => {
    const setCardSelected = setsListSaved[setCardSelectedIndex];
    const setCardSelectedClassIds = setCardSelected.classIds;
    const setCardSelectedStatList = searchSetStatsFromElementsIds(
      setCardSelectedClassIds
    );
    setChosenStats((prev) =>
      prev.map((chosenStat, index) => {
        chosenStat.value = setCardSelectedStatList[index];
        return chosenStat;
      })
    );
    showToast("Succès", "Les stats du set ont été chargéés");
  };

  const loadSetToDisplay = (setCardSelectedIndex) => {
    const setCardSelected = setsListSaved[setCardSelectedIndex];
    const setCardSelectedName = setCardSelected.name;
    const setsDisplayedNames = setsListDisplayed.map((set) => set.name);
    if (
      setCardSelectedName == null ||
      setsDisplayedNames.includes(setCardSelectedName)
    ) {
      showToast("Erreur", "Changer le nom du set SVP");
    } else {
      addSet(setCardSelected);
      showToast("Succès", "Le set a été chargé");
    }
  };

  const saveSet = async (setCardSelectedIndex, situation) => {
    const setsListConcerned =
      situation == "search" ? setsListFound : setsListDisplayed;
    const setCardSelected = setsListConcerned[setCardSelectedIndex];
    const setCardSelectedName = setCardSelected.name;
    const setsSavedNames = await getSetsSavedNamesAndClassIds(true);
    if (
      !setCardSelectedName?.trim() ||
      setsSavedNames.includes(setCardSelectedName)
    ) {
      showToast("Erreur", "Changer le nom du set SVP");
      return false;
    } else {
      try {
        await AsyncStorage.setItem(
          setCardSelectedName,
          JSON.stringify(setCardSelected)
        );

        setSetsListSaved((prev) => [...prev, setCardSelected]);

        showToast("Succès", "Le set est enregistré");
        return true;
      } catch (err) {
        alert(err);
        return false;
      }
    }
  };

  const saveSetFromFound = async (setCardSelectedIndex) => {
    const setCardSelected = setsListFound[setCardSelectedIndex];
    const setCardSelectedName = setCardSelected.name;
    const setsSavedNames = await getSetsSavedNamesAndClassIds(true);
    if (
      setCardSelectedName == null ||
      setsSavedNames.includes(setCardSelectedName)
    ) {
      showToast("Erreur", "Changer le nom du set SVP");
    } else {
      try {
        await AsyncStorage.setItem(
          setCardSelectedName,
          JSON.stringify(setCardSelected)
        );

        setSetsListSaved((prev) => [...prev, setCardSelected]);

        showToast("Succès", "Le set est enregistré");
      } catch (err) {
        alert(err);
      }
    }
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
        return index === setCardIndex ? { ...set, name: newName } : set;
      })
    );
  };

  const updateSetsList = (pressedClassIds, situation) => {
    const pressedClassIdsList = Object.values(pressedClassIds);
    const setsListConcerned =
      situation === "display" ? setSetsListDisplayed : setSetsListSaved;

    setsListConcerned((prev) => {
      return prev.map((set, index) =>
        index === setCardActiveIndex
          ? { ...set, classIds: pressedClassIdsList }
          : set
      );
    });
  };

  const updateAllSetsListFound = (setsFoundClassIds) => {
    setsFoundWithName = setsFoundClassIds.map((setsFoundClassIds) => ({
      name: null,
      classIds: setsFoundClassIds.classIds,
    }));
    setSetsListFound(setsFoundWithName);
  };

  const updateMemory = async () => {
    try {
      await AsyncStorage.clear();

      const savePromises = setsListSaved.map((setSaved) =>
        AsyncStorage.setItem(setSaved.name, JSON.stringify(setSaved))
      );

      await Promise.all(savePromises); // Attendre que tous les `setItem` soient complétés
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SetsListContext.Provider
      value={{
        setsListDisplayed,
        setsListSaved,
        setsListFound,
        updateAllSetsListFound,
        addSet,
        loadSetToSearch,
        loadSetToDisplay,
        removeSet,
        saveSet,
        saveSetFromFound,
        renameSet,
        updateSetsList,
        setCardActiveIndex,
        setSetCardActiveIndex,
        updateMemory,
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
