import React, { createContext, useContext, useEffect, useState } from "react";
import { bodyTypeNames, elementsAllInfosList } from "../data/data";
import { translate } from "../i18n/translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "./toast";
import { usePressableImages } from "./PressableImagesContext";

// Créer le contexte
const SetsListContext = createContext();

// Fournisseur du contexte
export const SetsListProvider = ({ children }) => {
  const setDefault = { name: null, classIds: [9, 16, 30, 39] };

  const [setsList, setSetsList] = useState([
    { ...setDefault, classIds: [...setDefault.classIds] },
  ]);
  const [setsSavedList, setSetsSavedList] = useState([]);

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
      setSetsSavedList(savedSets);
    };

    fetchSavedSets();
  }, []);

  const [setCardActiveIndex, setSetCardActiveIndex] = useState(0); // Stocke l'ID de la `SetCardChosen` active

  const addSet = (
    newSet = { ...setDefault, classIds: [...setDefault.classIds] }
  ) => {
    setSetsList((prev) => [...prev, newSet]);
  };

  const removeSet = (setCardSelectedIndex, situation) => {
    const listToModify = situation == "display" ? setsList : setsSavedList;
    const setListUpdater =
      situation == "display" ? setSetsList : setSetsSavedList;

    if (situation == "display" && listToModify.length === 1) {
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

  const loadSet = (setCardSelectedIndex) => {
    const setCardSelected = setsSavedList[setCardSelectedIndex];
    const setCardSelectedName = setCardSelected.name;
    const setsDisplayedNames = setsList.map((set) => set.name);
    if (
      setCardSelectedName == null ||
      setsDisplayedNames.includes(setCardSelectedName)
    ) {
      showToast("Erreur", "Changer le nom du set SVP");
    } else {
      addSet(setCardSelected);
    }
  };

  const saveSet = async (setCardSelectedIndex) => {
    const setCardSelected = setsList[setCardSelectedIndex];
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

        setSetsSavedList((prev) => [...prev, setCardSelected]);

        showToast("Succès", "Le set est enregistré");
      } catch (err) {
        alert(err);
      }
    }
  };

  const renameSet = (newName) => {
    setSetsList((prev) =>
      prev.map((set, index) => {
        return index === setCardActiveIndex ? { ...set, name: newName } : set;
      })
    );
  };

  const updateSetsList = (pressedClassIds, situation) => {
    const pressedClassIdsList = Object.values(pressedClassIds);
    const updateList = situation === "display" ? setSetsList : setSetsSavedList;

    updateList((prev) => {
      return prev.map((set, index) =>
        index === setCardActiveIndex
          ? { ...set, classIds: pressedClassIdsList }
          : set
      );
    });
  };

  return (
    <SetsListContext.Provider
      value={{
        setsList,
        setsSavedList,
        setSetsSavedList,
        addSet,
        loadSet,
        removeSet,
        saveSet,
        renameSet,
        updateSetsList,
        setCardActiveIndex,
        setSetCardActiveIndex,
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
