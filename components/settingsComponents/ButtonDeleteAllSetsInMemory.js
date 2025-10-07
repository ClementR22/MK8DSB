import React from "react";
import { translate } from "@/translations/translations";
import ButtonAndModal from "../modal/ButtonAndModal";
import { useThemeStore } from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
      <MaterialIcons style={{alignSelf: "center", paddingTop: 12}} name="warning-amber" size={48} color={theme.error} />
      <Text role="headline" size="large" color={theme.error} textAlign="center">
        {translate("Warning")}
      </Text>
      <Text role="body" size="large" weight="regular" textAlign="center" color={theme.on_error_container} style={{ padding: 20 }}>
        {translate("DeleteAllSetsInMemoryText")}
      </Text>
    </ButtonAndModal>
  );
};

export default React.memo(ButtonDeleteAllSetsInMemory);
