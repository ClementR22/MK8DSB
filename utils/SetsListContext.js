import React, { createContext, useContext, useEffect, useState } from "react";
import { bodyTypeNames, elementsAllInfosList } from "../data/data";
import { translate } from "../i18n/translations";
import { getSetsSavedKeysAndValues } from "../data/setsSaved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "./toast";

// Créer le contexte
const SetsListContext = createContext();

// Fournisseur du contexte
export const SetsListProvider = ({ children }) => {
  const setDefault = { name: null, classIds: [9, 16, 30, 39] };

  const [setsList, setSetsList] = useState([
    { ...setDefault, classIds: [...setDefault.classIds] },
  ]);
  const [setsSavedList, setSetsSavedList] = useState([]);

  useEffect(() => {
    const fetchSavedSets = async () => {
      const savedSets = await getSetsSavedKeysAndValues();
      setSetsSavedList(savedSets);
    };

    fetchSavedSets();
  }, []);

  const [setCardActiveIndex, setSetCardActiveIndex] = useState(0); // Stocke l'ID de la `SetCardChosen` active

  const addSet = () => {
    setSetsList((prev) => [
      ...prev,
      { ...setDefault, classIds: [...setDefault.classIds] },
    ]);
  };

  const removeSet = (setCardSelectedIndex) => {
    if (setsList.length != 1) {
      setSetsList((prev) =>
        prev.filter((set, index) => index != setCardSelectedIndex)
      );
      if (setCardSelectedIndex < setCardActiveIndex) {
        setSetCardActiveIndex(setCardActiveIndex - 1);
      } else if (setCardSelectedIndex == setCardActiveIndex) {
        setSetCardActiveIndex(Math.max(0, setCardActiveIndex - 1));
      }
    } else {
      showToast("Erreur", "Vous devez garder au moins 1 set");
    }
  };

  const saveSet = async (setCardSelectedIndex) => {
    const setCardSelected = setsList[setCardSelectedIndex];
    const setCardSelectedName = setCardSelected.name;
    const setsSavedKeys = getSetsSavedKeysAndValues(true);
    if (
      setCardSelectedName == null ||
      (await setsSavedKeys).includes(setCardSelectedName)
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

  const updateSetsList = (pressableImagesList) => {
    const pressedClassIds = pressableImagesList
      .filter((element) => element.pressed)
      .map((element) => {
        return element.classId;
      });

    const pressedClassIdsWithoutRepetition = [...new Set(pressedClassIds)];

    setSetsList((prev) =>
      prev.map((set, index) => {
        return index === setCardActiveIndex
          ? { ...set, classIds: pressedClassIdsWithoutRepetition }
          : set;
      })
    );
  };

  return (
    <SetsListContext.Provider
      value={{
        setsList,
        setsSavedList,
        setSetsSavedList,
        addSet,
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
