import React from "react";
import ButtonAndModal from "../modal/ButtonAndModal";
import useThemeStore from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";

const ButtonResetSettings = ({ resetSettings }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonAndModal
      triggerComponent={
        <ButtonSettings
          title="resetSettings"
          iconProps={{ name: "rotate-ccw", type: IconType.Feather, color: theme.on_error }}
          backgroundColor={theme.error}
          tooltipText="resetSettings"
        />
      }
      secondButtonProps={{
        text: "confirm",
        tooltipText: "confirm",
        onPress: resetSettings,
        buttonColor: theme.error,
        buttonTextColor: theme.on_error,
      }}
    >
      <MaterialIcons
        style={{ alignSelf: "center", paddingTop: 12 }}
        name="warning-amber"
        size={48}
        color={theme.error}
      />
      <Text role="headline" size="large" color={theme.error} textAlign="center" namespace="text">
        warning
      </Text>
      <Text
        role="body"
        size="large"
        weight="regular"
        textAlign="center"
        color={theme.on_error_container}
        style={{ padding: 20 }}
        namespace="text"
      >
        resetSettingsText
      </Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonResetSettings);
