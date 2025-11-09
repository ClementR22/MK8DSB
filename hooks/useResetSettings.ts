import { useSettingsMap } from "@/config/settingsMap";
import showToast from "@/utils/showToast";

export const useResetSettings = () => {
  const settingsMap = useSettingsMap();

  return () => {
    Object.values(settingsMap).forEach(({ setState, defaultValue }) => {
      return setState(defaultValue);
    });

    showToast("toast:theSettingsHaveBeenReset", "success");
  };
};
