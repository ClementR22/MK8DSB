import React, { createContext, useContext, useState } from "react";
import { elementsAllInfosList } from "../data/data";

// Fonction pour initialiser l'état pressableImagesList
const initializePressableImagesList = (defaultSelectedImages) => {
  // Crée une copie avec les propriétés supplémentaires
  const pressableImagesList = elementsAllInfosList.map((item) => ({
    ...item,
    pressed: false, // Initialise toutes les images comme non pressées
  }));

  if (defaultSelectedImages) {
    // Exemple de configuration par défaut
    pressableImagesList[0].pressed = true;
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
  const handlePressImage = (id) => {
    setPressableImagesList((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, pressed: !item.pressed } : item
      )
    );
    // initializePressableImagesByCategory est executé automatiquement
    // donc pressableImagesByCategory est mis à jour
  };

  // Fonction pour gérer l'état d'une image unique pressée
  const handlePressImageUnique = (category, classId, imageIndex) => {
    setPressableImagesList((prev) =>
      prev
        .map((item) =>
          item.category === category && item.classId === classId
            ? { ...item, pressed: false }
            : item
        )
        .map((item, index) =>
          index === imageIndex ? { ...item, pressed: true } : item
        )
    );
  };

  return (
    <PressableImagesContext.Provider
      value={{
        pressableImagesList,
        pressableImagesByCategory,
        handlePressImage,
        handlePressImageUnique,
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
