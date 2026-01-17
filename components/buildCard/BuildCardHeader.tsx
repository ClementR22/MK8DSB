import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import BuildCardMoreActionsButton from "./BuildCardMoreActionsButton";
import { ScreenName } from "@/contexts/ScreenContext";
import { ActionNamesList } from "@/hooks/useBuildCardConfig";
import BuildNameInput from "../textInput/BuildNameInput";
import { BUTTON_SIZE, WIDTH_BUILD_CARD_CONTENT } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";
import useThemeStore from "@/stores/useThemeStore";

interface BuildCardHeaderProps {
  isNameEditable: boolean;
  name: string;
  screenName: ScreenName;
  buildDataId: string;
  percentage?: number;
  isSaved: boolean;
  moreActionNamesList?: ActionNamesList;
}

const BuildCardHeader: React.FC<BuildCardHeaderProps> = ({
  isNameEditable,
  name,
  screenName,
  buildDataId,
  percentage,
  isSaved,
  moreActionNamesList,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.headerContainer}>
      <BuildNameInput name={name} buildDataId={buildDataId} editable={isNameEditable} isSaved={isSaved} />

      {percentage && (
        <Text role="title" size="medium" weight="bold" color={theme.primary} namespace="not" style={styles.percentage}>
          {percentage}%
        </Text>
      )}

      {moreActionNamesList && (
        <BuildCardMoreActionsButton
          moreActionNamesList={moreActionNamesList}
          buildDataId={buildDataId}
          screenName={screenName}
        />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: BUTTON_SIZE, // taille du buttonIcon
    gap: 10,
  },
  percentage: { width: WIDTH_BUILD_CARD_CONTENT * 0.3 },
});

export default memo(BuildCardHeader);
