import React, { createContext, useContext, useEffect, useState } from "react";
import { bodyTypeNames, elementsAllInfosList } from "../data/data";
import { translate } from "../i18n/translations";

// Fonction pour initialiser l'état pressableImagesList
const initializePressableImagesList = (isDefaultSelectedImages) => {
  // Crée une copie avec les propriétés supplémentaires
  const pressableImagesList = elementsAllInfosList.map(
    ({ id, name, category, classId, image }) => {
      return {
        id: id,
        name: translate(name),
        category: category,
        classId: classId,
        image: image,
        pressed: false, // Initialise toutes les images comme non pressées
      };
    }
  );

  if (isDefaultSelectedImages) {
    // Exemple de configuration par défaut
    pressableImagesList[0].pressed = true;
    pressableImagesList[52].pressed = true;
    pressableImagesList[93].pressed = true;
    pressableImagesList[115].pressed = true;
  }

  return pressableImagesList;
};

// Fonction pour initialiser pressableImagesByCategory
const initializePressableImagesByCategory = (pressableImagesList) => {
  const pressableImagesByCategory = {};

  pressableImagesList.forEach((element) => {
    const { category, classId } = element;

    const changedCategory = bodyTypeNames.includes(category)
      ? "body"
      : category;

    if (!pressableImagesByCategory[changedCategory]) {
      pressableImagesByCategory[changedCategory] = {};
    }

    if (!pressableImagesByCategory[changedCategory][classId]) {
      pressableImagesByCategory[changedCategory][classId] = [];
    }

    pressableImagesByCategory[changedCategory][classId].push(element);
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

  const handlePressImageByClass = (
    classId,
    category,
    activeSetCardFound = null,
    setSetsList
  ) => {
    const categoryList = bodyTypeNames.includes(category)
      ? bodyTypeNames
      : [category];
    // categoryList = ["kart", "bike", "sportBike", "ATV"] ou bien ["character"] ou bien ["wheels"] ou bien ["glider"]
    // on met tous les chip de la category sur false
    // puis on selectionne le chip
    setPressableImagesList((prev) =>
      prev.map((item) =>
        categoryList.includes(item.category)
          ? { ...item, pressed: item.classId === classId }
          : item
      )
    );
  };

  const handlePressSetUpdatePressableImagesList = (setClassIds) => {
    setPressableImagesList((prev) =>
      prev.map((item) => ({
        ...item,
        pressed: setClassIds.includes(item.classId),
      }))
    );
  };

  return (
    <PressableImagesContext.Provider
      value={{
        pressableImagesList,
        pressableImagesByCategory,
        handlePressImage,
        handlePressImageByClass,
        setPressableImagesList,
        handlePressSetUpdatePressableImagesList,
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
