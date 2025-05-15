import React from "react";
import Button from "@/components/Button";
import { translate } from "@/translations/translations";

const ButtonResetSettings = ({ resetSettings }) => {
  return <Button onPress={() => resetSettings()}>{translate("ResetSettings")}</Button>;
};

export default ButtonResetSettings;
