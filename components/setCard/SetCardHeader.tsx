// components/SetCard/SetCardHeader.tsx

import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";
import { ScreenName } from "@/contexts/ScreenContext";
import { actionNamesList } from "@/hooks/useSetCardConfig";
import SetNameInput from "../textInput/SetNameInput";
import { BUTTON_SIZE } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";
import { useThemeStore } from "@/stores/useThemeStore";

interface SetCardHeaderProps {
  isNameEditable: boolean;
  setToShowName: string;
  setToShowId: string;
  setToShowPercentage?: number;
  moreActionNamesList?: actionNamesList;
  situation: ScreenName | "load";
}

const SetCardHeader: React.FC<SetCardHeaderProps> = ({
  isNameEditable,
  setToShowName,
  setToShowId,
  setToShowPercentage,
  moreActionNamesList,
  situation,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.headerContainer}>
      <View style={StyleSheet.flatten(styles.nameContainer)}>
        <SetNameInput setToShowName={setToShowName} setToShowId={setToShowId} editable={isNameEditable} />
      </View>

      {setToShowPercentage && (
        <Text role="title" size="medium" weight="bold" color={theme.primary}>
          {setToShowPercentage}%
        </Text>
      )}

      {moreActionNamesList && (
        <SetCardMoreActionsButton
          moreActionNamesList={moreActionNamesList}
          setToShowId={setToShowId}
          situation={situation}
        />
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
  nameContainer: {
    flexDirection: "row",
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default memo(SetCardHeader);
