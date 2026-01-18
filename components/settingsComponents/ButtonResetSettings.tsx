import React from "react";
import ButtonAndModalConfirm from "../modal/ButtonAndModalConfirm";
import { useResetSettings } from "@/hooks/useResetSettings";
import showToast from "@/utils/showToast";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonResetSettings = () => {
  const resetSettings = useResetSettings();

  const handleResetSettings = () => {
    resetSettings();
    showToast("toast:theSettingsHaveBeenReset", "success", 3000);
  };

  return (
    <ButtonAndModalConfirm
      title="resetSettings"
      iconProps={{ name: "rotate-ccw", type: IconType.Feather }}
      tooltipText="resetSettings"
      text="resetSettingsText"
      isWarning={true}
      onPress={handleResetSettings}
    />
  );
};

export default React.memo(ButtonResetSettings);
