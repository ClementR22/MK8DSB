// components/SetCard/SetCardHeader.tsx

import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/useThemeStore";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";
import { ScreenName } from "@/contexts/ScreenContext";
import { actionNamesList } from "./SetCard";
import SetNameInput from "../textInput/SetNameInput";

export interface SetCardHeaderProps {
  isNameEditable: boolean;
  setToShowName: string;
  setCardIndex: number;
  setToShowPercentage?: number;
  moreActionNamesList?: actionNamesList;
  situation: ScreenName | "load";
}

const SetCardHeader: React.FC<SetCardHeaderProps> = ({
  isNameEditable,
  setToShowName,
  setCardIndex,
  setToShowPercentage,
  moreActionNamesList,
  situation,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const percentageTextDynamicStyle = useMemo(
    () => ({
      color: theme.primary,
    }),
    [theme.primary]
  );

  return (
    <View style={styles.headerContainer}>
      <View style={StyleSheet.flatten(styles.nameContainer)}>
        <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} editable={isNameEditable} />
      </View>

      <View style={{ minWidth: 40 }}>
        {setToShowPercentage && (
          <Text style={StyleSheet.flatten([styles.percentageText, percentageTextDynamicStyle])} numberOfLines={1}>
            {setToShowPercentage}%
          </Text>
        )}

        {moreActionNamesList && (
          <SetCardMoreActionsButton
            moreActionNamesList={moreActionNamesList}
            setCardIndex={setCardIndex}
            situation={situation}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40, // taille du buttonIcon
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
  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default React.memo(SetCardHeader);
