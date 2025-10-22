// components/SetCard/SetCardHeader.tsx

import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";
import { ScreenName } from "@/contexts/ScreenContext";
import { ActionNamesList } from "@/hooks/useSetCardConfig";
import SetNameInput from "../textInput/SetNameInput";
import { BUTTON_SIZE } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";
import { useThemeStore } from "@/stores/useThemeStore";

interface SetCardHeaderProps {
  isNameEditable: boolean;
  name: string;
  screenName: ScreenName;
  id: string;
  setToShowPercentage?: number;
  moreActionNamesList?: ActionNamesList;
}

const SetCardHeader: React.FC<SetCardHeaderProps> = ({
  isNameEditable,
  name,
  screenName,
  id,
  setToShowPercentage,
  moreActionNamesList,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.headerContainer}>
      <SetNameInput name={name} id={id} editable={isNameEditable} />

      {setToShowPercentage && (
        <Text role="title" size="medium" weight="bold" color={theme.primary} namespace="not">
          {setToShowPercentage}%
        </Text>
      )}

      {moreActionNamesList && (
        <SetCardMoreActionsButton moreActionNamesList={moreActionNamesList} id={id} screenName={screenName} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: BUTTON_SIZE, // taille du buttonIcon
    gap: 10,
    marginBottom: 5,
  },
});

export default memo(SetCardHeader);
