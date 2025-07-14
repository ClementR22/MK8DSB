import React, { useEffect } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import useGeneralStore from "@/stores/useGeneralStore"; // Assurez-vous que le chemin est correct

const TabBarHeightUpdater = () => {
  const tabBarHeight = useBottomTabBarHeight(); // Récupère la hauteur ici, là où le hook fonctionne
  const setTabBarHeight = useGeneralStore((state) => state.setTabBarHeight);

  useEffect(() => {
    // Met à jour la hauteur dans le store chaque fois qu'elle change
    setTabBarHeight(tabBarHeight);
  }, [tabBarHeight, setTabBarHeight]);

  return null; // Ce composant ne rend aucune interface utilisateur visible
};

export default TabBarHeightUpdater;
