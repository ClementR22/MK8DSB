import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { Text } from "react-native";

const ButtonResetSettings = ({ resetSettings }) => {
  return (
    <ButtonAndModal
      triggerButtonText="ResetSettings"
      secondButtonProps={{ text: "Confirm", onPress: resetSettings }}
      closeButtonText="Cancel"
    >
      <Text>{translate("ResetSettingsText")}</Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonResetSettings);
