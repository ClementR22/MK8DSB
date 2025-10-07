import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { useThemeStore } from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
      <MaterialIcons style={{alignSelf: "center", paddingTop: 12}} name="warning-amber" size={48} color={theme.error} />
      <Text role="headline" size="large" color={theme.error} textAlign="center">
        {translate("Warning")}
      </Text>
      <Text role="body" size="large" weight="regular" textAlign="center" color={theme.on_error_container} style={{ padding: 20 }}>
        {translate("ResetSettingsText")}
      </Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonResetSettings);
