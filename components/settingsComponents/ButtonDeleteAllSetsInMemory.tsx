import React from "react";
import ButtonAndModal from "../modal/ButtonAndModal";
import { useThemeStore } from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ButtonDeleteAllSetsInMemory = ({ deleteAllSavedSets }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonAndModal
      triggerButtonText="deleteAllSetsInMemory"
      secondButtonProps={{
        text: "confirm",
        onPress: deleteAllSavedSets,
        buttonColor: theme.error,
        buttonTextColor: theme.on_error,
      }}
      secondButtonType="danger"
      closeButtonText="cancel"
      buttonColor={theme.error}
      buttonTextColor={theme.on_error}
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
        deleteAllSetsInMemoryText
      </Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonDeleteAllSetsInMemory);
