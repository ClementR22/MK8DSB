import React, { createContext, useContext, useEffect, useState } from "react";
import { bodyTypeNames, elementsAllInfosList } from "../data/data";
import { translate } from "../i18n/translations";
import { useSetsList } from "./SetsListContext";

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
  situation,
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

  const [pressedClassIds, setPressedClassIds] = useState({
    character: 9,
    body: 16,
    wheels: 30,
    glider: 39,
  });

  const handlePressImageByClass = (classId, category7) => {
    console.log("handlePressImageByClass");
    console.log("classId", classId);
    let category4 = category7;
    let category4ElementList = [category7];

    if (bodyTypeNames.includes(category7)) {
      // si category7 est en fait un des bodyType
      category4 = "body";
      category4ElementList = bodyTypeNames;
    }

    // category4SelectedElementList = ["kart", "bike", "sportBike", "ATV"] ou bien ["character"] ou bien ["wheels"] ou bien ["glider"]
    setPressableImagesList((prev) =>
      prev.map((item) =>
        category4ElementList.includes(item.category)
          ? { ...item, pressed: item.classId === classId }
          : item
      )
    );
    setPressedClassIds((prev) => ({ ...prev, [category4]: classId }));
  };

  const updatePressableImagesList = (setClassIds) => {
    setPressableImagesList((prev) =>
      prev.map((item) => ({
        ...item,
        pressed: setClassIds.includes(item.classId),
      }))
    );
  };

  const { updateSetsList } = useSetsList();

  useEffect(() => {
    updateSetsList(pressedClassIds, situation); // Met à jour après le rendu
  }, [pressedClassIds]); // Déclenché uniquement quand pressedClassIds change

  return (
    <PressableImagesContext.Provider
      value={{
        pressableImagesList,
        pressableImagesByCategory,
        handlePressImage,
        handlePressImageByClass,
        setPressableImagesList,
        pressedClassIds,
        updatePressableImagesList,
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
