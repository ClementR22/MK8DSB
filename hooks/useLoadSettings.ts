import { useEffect } from "react";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";
import { useSettingsMap } from "@/hooks/useSettingsMap";
import { getLanguageToUse } from "@/translations";
import i18next from "i18next";

export const useLoadSettings = () => {
  const settingsMap = useSettingsMap();

  const loadLanguage = async () => {
    const language = await getLanguageToUse();
    await i18next.changeLanguage(language);
  };

  useEffect(() => {
    loadLanguage();

    Object.entries(settingsMap).forEach(([key, { setState }]) => {
      loadThingFromMemory(key, setState);
    });
  }, []);
};
