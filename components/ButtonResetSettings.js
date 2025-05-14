import React from "react";
import Button from "@/components/Button";
import { useSettings } from "@/contexts/SettingsContext";
import { translate } from "@/translations/translations";

const ButtonResetSettings = () => {
  const { resetSettings } = useSettings();

  return <Button onPress={() => resetSettings()}>{translate("ResetSettings")}</Button>;
};

export default ButtonResetSettings;
