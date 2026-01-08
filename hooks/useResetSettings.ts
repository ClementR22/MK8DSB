import { useSettingsMap } from "@/hooks/useSettingsMap";

export const useResetSettings = () => {
  const settingsMap = useSettingsMap();

  return () => {
    Object.values(settingsMap).forEach(({ setState, defaultValue }) => {
      return setState(defaultValue);
    });
  };
};
