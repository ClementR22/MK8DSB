import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { Text } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const ButtonResetSettings = ({ resetSettings }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonAndModal
      triggerButtonText="ResetSettings"
      secondButtonProps={{
        text: "Confirm",
        onPress: resetSettings,
        buttonColor: theme.error,
        buttonTextColor: theme.on_error,
      }}
      secondButtonType="danger"
      closeButtonText="Cancel"
      buttonColor={theme.error}
      buttonTextColor={theme.on_error}
    >
      <Text style={{ margin: 24, fontSize: 16, fontWeight: 500 }}>{translate("ResetSettingsText")}</Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonResetSettings);
