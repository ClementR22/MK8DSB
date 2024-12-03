import React, { createContext, useContext, useState } from "react";
import { elementsImages } from "../data/data";

// Fonction pour initialiser l'état pressableImages
const initializePressableImages = (defaultSelectedImages) => {
  const pressableImages = {};
  Object.entries(elementsImages).forEach(([categoryKey, classes]) => {
    pressableImages[categoryKey] = {};
    Object.entries(classes).forEach(([classKey, imagesValues]) => {
      pressableImages[categoryKey][classKey] = {};
      Object.entries(imagesValues).forEach(([imageKey, { name, uri }]) => {
        pressableImages[categoryKey][classKey][imageKey] = {
          name,
          uri,
          pressed: false,
        };
      });
    });
  });

  if (defaultSelectedImages) {
    pressableImages["character"][9]["image1"].pressed = true;
    pressableImages["kart"][0]["image1"].pressed = true;
    pressableImages["wheels"][0]["image1"].pressed = true;
    pressableImages["glider"][0]["image1"].pressed = true;
  }
  return pressableImages;
};

// Créer le contexte
const PressableImagesContext = createContext();

// Fournisseur du contexte
export const PressableImagesProvider = ({
  children,
  defaultSelectedImages = false,
}) => {
  const [pressableImages, setPressableImages] = useState(
    initializePressableImages(defaultSelectedImages)
  );

  // Fonction pour gérer l'état d'une image pressée
  const handlePressImage = (categoryKey, classKey, imageKey) => {
    setPressableImages((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        [classKey]: {
          ...prev[categoryKey][classKey],
          [imageKey]: {
            ...prev[categoryKey][classKey][imageKey],
            pressed: !prev[categoryKey][classKey][imageKey].pressed,
          },
        },
      },
    }));
  };

  // Fonction pour gérer l'état d'une image unique pressée
  const handlePressImageUnique = (categoryKey, classKey, imageKey) => {
    setPressableImages((prev) => {
      const updatedImages = { ...prev };

      // Catégories combinées
      const combinedCategories = ["kart", "bike", "sportBike", "ATV"];

      // Fonction pour activer/désactiver les images
      const refreshImages = (
        categories,
        selectedClassKey,
        selectedImageKey
      ) => {
        categories.forEach((category) => {
          Object.values(updatedImages[category]).forEach((classImages) => {
            Object.entries(classImages).forEach(([imgKey, imgValue]) => {
              imgValue.pressed =
                classImages === updatedImages[category][selectedClassKey] &&
                imgKey === selectedImageKey;
            });
          });
        });
      };

      refreshImages(
        combinedCategories.includes(categoryKey)
          ? combinedCategories
          : [categoryKey],
        classKey,
        imageKey
      );

      return updatedImages;
    });
  };

  return (
    <PressableImagesContext.Provider
      value={{
        pressableImages,
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
