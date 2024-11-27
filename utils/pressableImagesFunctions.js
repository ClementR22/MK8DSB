import { elementsImages } from "../data/data";
// Fonction pour initialiser l'état pressableImages basé sur la structure des elementsImages
export const initializePressableImages = (defaultSelectedImages) => {
  const pressableImages = {};
  Object.entries(elementsImages).forEach(([categoryKey, classes]) => {
    pressableImages[categoryKey] = {};
    Object.entries(classes).forEach(([classKey, imagesValues]) => {
      pressableImages[categoryKey][classKey] = {};
      Object.entries(imagesValues).forEach(([imageKey, { name, uri }]) => {
        pressableImages[categoryKey][classKey][imageKey] = {
          name: name,
          uri: uri,
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

export const handlePressImage = (
  setPressableImages,
  categoryKey,
  classKey,
  imageKey
) => {
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

export const handlePressImageUnique = (
  setPressableImages,
  categoryKey,
  classKey,
  imageKey
) => {
  setPressableImages((prev) => {
    const updatedImages = { ...prev };

    // Catégories combinées
    const combinedCategories = ["kart", "bike", "sportBike", "ATV"];

    // Fonction pour activer/désactiver les images
    const refreshImages = (categories, selectedClassKey, selectedImageKey) => {
      categories.forEach((category) => {
        Object.values(updatedImages[category]).forEach((classImages) => {
          Object.entries(classImages).forEach(([imgKey_i, imgValue_i]) => {
            imgValue_i.pressed =
              classImages === updatedImages[category][selectedClassKey] &&
              imgKey_i === selectedImageKey;
          });
        });
      });
    };

    // activer/désactiver les images en fonction de la catégorie
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
