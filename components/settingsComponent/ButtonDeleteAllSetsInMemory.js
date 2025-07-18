import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { Text } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const ButtonDeleteAllSetsInMemory = ({ deleteAllSavedSets }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonAndModal
      triggerButtonText="DeleteAllSetsInMemory"
      secondButtonProps={{ text: "Confirm", onPress: deleteAllSavedSets }}
      secondButtonType="danger"
      closeButtonText="Cancel"
      buttonColor={theme.error}
      buttonTextColor={theme.on_error}
    >
      <Text style={{ margin: 24, fontSize: 16, fontWeight: 500 }}>{translate("DeleteAllSetsInMemoryText")}</Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonDeleteAllSetsInMemory);
