import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { Text } from "react-native";

const ButtonDeleteAllSetsInMemory = ({ deleteAllSavedSets }) => {
  return (
    <ButtonAndModal
      triggerButtonText="DeleteAllSetsInMemory"
      secondButtonProps={{ text: "Confirm", onPress: deleteAllSavedSets }}
      closeButtonText="Cancel"
    >
      <Text>{translate("DeleteAllSetsInMemoryText")}</Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonDeleteAllSetsInMemory);
