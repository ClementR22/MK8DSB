import React, { createContext, useContext, useState } from "react";
import { bodyTypeNames, elementsAllInfosList } from "../data/data";

// Fonction pour initialiser l'état pressableImagesList
const initializePressableImagesList = (isDefaultSelectedImages) => {
  // Crée une copie avec les propriétés supplémentaires
  const pressableImagesList = elementsAllInfosList.map((item) => ({
    ...item,
    pressed: false, // Initialise toutes les images comme non pressées
  }));

  if (isDefaultSelectedImages) {
    // Exemple de configuration par défaut
    pressableImagesList[0].pressed = true;
    pressableImagesList[90].pressed = true;
    pressableImagesList[100].pressed = true;
    pressableImagesList[115].pressed = true;
  }

  return pressableImagesList;
};

// Fonction pour initialiser pressableImagesByCategory
const initializePressableImagesByCategory = (pressableImagesList) => {
  const pressableImagesByCategory = {};

  pressableImagesList.forEach((element) => {
    const { category, classId } = element;

    if (!pressableImagesByCategory[category]) {
      pressableImagesByCategory[category] = {};
    }

    if (!pressableImagesByCategory[category][classId]) {
      pressableImagesByCategory[category][classId] = [];
    }

    pressableImagesByCategory[category][classId].push(element);
  });

  return pressableImagesByCategory;
};

// Créer le contexte
const PressableImagesContext = createContext();

// Fournisseur du contexte
export const PressableImagesProvider = ({
  children,
  isDefaultSelectedImages = false,
}) => {
  const [pressableImagesList, setPressableImagesList] = useState(
    initializePressableImagesList(isDefaultSelectedImages)
  );

  const pressableImagesByCategory =
    initializePressableImagesByCategory(pressableImagesList);

  // Fonction pour gérer l'état d'une image pressée
  const handlePressImage = (id, category) => {
    setPressableImagesList((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, pressed: !item.pressed } : item
      )
    );
    // initializePressableImagesByCategory est executé automatiquement
    // donc pressableImagesByCategory est mis à jour
  };

  // Fonction pour gérer l'état d'une image unique pressée
  const handlePressImageUnique = (id, category, activeSetCard, setSetsList) => {
    const categoryList = bodyTypeNames.includes(category)
      ? bodyTypeNames
      : [category];
    // categoryList = ["kart", "bike", "sportBike", "ATV"] ou bien ["character"] ou bien ["wheels"] ou bien ["glider"]
    // on met tous les chip de la category sur false
    // puis on selectionne le chip
    setPressableImagesList((prev) =>
      prev.map((item) =>
        categoryList.includes(item.category)
          ? { ...item, pressed: false }
          : item
      )
    );
    setPressableImagesList((prev) => {
      const updatedPressableImagesList = prev.map((item) =>
        item.id === id ? { ...item, pressed: true } : item
      );
      updateSetsList(activeSetCard, setSetsList, updatedPressableImagesList);
      return updatedPressableImagesList;
    });
  };

  const updateSetsList = (activeSetCard, setSetsList, pressableImagesList) => {
    const pressedElementsIds = pressableImagesList
      .filter((element) => element.pressed)
      .map((element) => {
        return element.classId;
      });

    if (activeSetCard !== null) {
      setSetsList((prev) => {
        return prev.map((item) => {
          return item.id === activeSetCard
            ? { ...item, setElementIds: pressedElementsIds }
            : item;
        });
      });
    }
  };

  return (
    <PressableImagesContext.Provider
      value={{
        pressableImagesList,
        pressableImagesByCategory,
        handlePressImage,
        handlePressImageUnique,
        setPressableImagesList,
      }}
    >
      {children}
    </PressableImagesContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const usePressableImages = () => {
  return useContext(PressableImagesContext);
};
