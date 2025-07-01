import { useEffect } from "react";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";
import { useSettingsMap } from "@/config/settingsMap";

export const useLoadSettings = () => {
  const settingsMap = useSettingsMap();

  useEffect(() => {
    Object.entries(settingsMap).forEach(([key, { setState }]) => {
      loadThingFromMemory(key, setState);
    });
  }, []);
};
