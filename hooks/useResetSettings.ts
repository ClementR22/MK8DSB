import { useSettingsMap } from "@/config/settingsMap";
import { translate } from "@/translations/translations";
import showToast from "@/utils/showToast";

export const useResetSettings = () => {
  const settingsMap = useSettingsMap();

  const text = translate("TheSettingsHaveBeenReset");

  return () => {
    Object.values(settingsMap).forEach(({ setState, defaultValue }) => {
      return setState(defaultValue);
    });

    showToast(text);
  };
};
