import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [isAllwaysSync, setIsAllwaysSync_] = useState(false);

  const setIsAllwaysSync = async (newIsAllwaysSync) => {
    setIsAllwaysSync_(newIsAllwaysSync);
    await saveIsAllwaysSyncInMemory(newIsAllwaysSync);
  };

  const saveIsAllwaysSyncInMemory = async (newIsAllwaysSync) => {
    try {
      await AsyncStorage.setItem("isAllwaysSync", newIsAllwaysSync);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde de isAllwaysSync :", e);
    }
  };

  useEffect(() => {
    const loadIsAllwaysSync = async () => {
      const savedIsAllwaysSync = await AsyncStorage.getItem("isAllwaysSync");
      if (savedIsAllwaysSync) {
        setIsAllwaysSync_(savedIsAllwaysSync === "true");
      }
    };
    loadIsAllwaysSync();
  }, []);

  return <SettingsContext.Provider value={{ isAllwaysSync, setIsAllwaysSync }}>{children}</SettingsContext.Provider>;
};
