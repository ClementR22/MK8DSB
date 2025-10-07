import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { useThemeStore } from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";

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
      <Text role="body" size="large" weight="semibold" style={{ padding: 20 }}>
        {translate("ResetSettingsText")}
      </Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonResetSettings);
