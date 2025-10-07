import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { useThemeStore } from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";

const ButtonDeleteAllSetsInMemory = ({ deleteAllSavedSets }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonAndModal
      triggerButtonText="DeleteAllSetsInMemory"
      secondButtonProps={{
        text: "Confirm",
        onPress: deleteAllSavedSets,
        buttonColor: theme.error,
        buttonTextColor: theme.on_error,
      }}
      secondButtonType="danger"
      closeButtonText="Cancel"
      buttonColor={theme.error}
      buttonTextColor={theme.on_error}
    >
      <Text role="body" size="large" weight="semibold" style={{ padding: 20 }}>
        {translate("DeleteAllSetsInMemoryText")}
      </Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonDeleteAllSetsInMemory);
