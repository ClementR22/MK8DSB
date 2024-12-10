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
  const handlePressImageUnique = (
    id,
    category,
    activeSetCard = null,
    setsList,
    setSetsList
  ) => {
    //console.log("dans setPressableImagesList");
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
    setPressableImagesList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pressed: true } : item))
    );

    //console.log("dans unique");
    //console.log("activeSetCard", activeSetCard);
    //console.log("setsList", setsList);
    const pressedElements = pressableImagesList
      .filter((element) => element.pressed)
      .map((element) => {
        return element.classId;
      });
    //console.log("pressedElements", pressedElements);

    console.log("dans unique");
    console.log("setsList", setsList);
    console.log("activeSetCard", activeSetCard);
    if (activeSetCard !== null) {
      setSetsList((prev) => {
        console.log("prev", prev);
        const it = prev[0];
        console.log({ ...it, setElementIds: pressedElements });
        console.log(
          "le resultat sera",
          prev.map((item) => {
            item.id === activeSetCard
              ? { ...item, setElementIds: pressedElements }
              : item;
          })
        );
        console.log("stop");
        return prev.map((item) => {
          console.log("item", item);
          return item.id === activeSetCard
            ? { ...item, setElementIds: pressedElements }
            : item;
        });
      });
      console.log("fin");
      console.log("donc setsList", setsList);
      //console.log("et donc 1 setsList", setsList);
    }
    console.log("et donc setsList", setsList);
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
