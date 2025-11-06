import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import BuildCardMoreActionsButton from "./BuildCardMoreActionsButton";
import { ScreenName } from "@/contexts/ScreenContext";
import { ActionNamesList } from "@/hooks/useBuildCardConfig";
import BuildNameInput from "../textInput/BuildNameInput";
import { BUTTON_SIZE } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";
import useThemeStore from "@/stores/useThemeStore";

interface BuildCardHeaderProps {
  isNameEditable: boolean;
  name: string;
  screenName: ScreenName;
  dataId: string;
  percentage?: number;
  isSaved: boolean;
  moreActionNamesList?: ActionNamesList;
}

const BuildCardHeader: React.FC<BuildCardHeaderProps> = ({
  isNameEditable,
  name,
  screenName,
  dataId,
  percentage,
  isSaved,
  moreActionNamesList,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.headerContainer}>
      <BuildNameInput name={name} dataId={dataId} editable={isNameEditable} isSaved={isSaved} />

      {percentage && (
        <Text role="title" size="medium" weight="bold" color={theme.primary} namespace="not">
          {percentage}%
        </Text>
      )}

      {moreActionNamesList && (
        <BuildCardMoreActionsButton moreActionNamesList={moreActionNamesList} dataId={dataId} screenName={screenName} />
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

export default memo(BuildCardHeader);
