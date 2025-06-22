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
  isEditable: boolean;
  setToShowName: string;
  setCardIndex: number;
  setToShowPercentage?: number;
  moreActionNamesList?: actionNamesList;
  situation: ScreenName | "load";
}

const SetCardHeader: React.FC<SetCardHeaderProps> = ({
  isEditable,
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

  const bottomLineDynamicStyle = useMemo(
    () => ({
      borderColor: theme.on_surface,
    }),
    [theme.on_surface]
  );

  return (
    <View style={styles.headerContainer}>
      <View style={StyleSheet.flatten([styles.nameContainer, bottomLineDynamicStyle])}>
        <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} editable={isEditable} />
        {isEditable && <MaterialCommunityIcons name="pencil" size={16} color={theme.on_surface_variant} />}
      </View>

      {setToShowPercentage !== undefined && (
        <Text style={StyleSheet.flatten([styles.percentageText, percentageTextDynamicStyle])} numberOfLines={1}>
          {setToShowPercentage}%
        </Text>
      )}

      {isEditable && (
        <SetCardMoreActionsButton
          moreActionNamesList={moreActionNamesList}
          setCardIndex={setCardIndex}
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
    height: 40, // taille du buttonIcon
    gap: 10,
    marginBottom: 5,
  },
  nameContainer: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
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
