import React from "react";
import useThemeStore from "@/stores/useThemeStore";
import { BUILD_CARD_BORDER_WIDTH } from "@/hooks/useBuildCardStyle";
import { BORDER_RADIUS_STANDARD, BUILD_CARD_WIDTH } from "@/utils/designTokens";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import Text from "@/primitiveComponents/Text";
import { Pressable, StyleSheet } from "react-native";
import { useBuildController } from "@/hooks/useBuildController";
import useGeneralStore from "@/stores/useGeneralStore";

interface PlaceholderBuildCardProps {}

const PlaceholderBuildCard: React.FC<PlaceholderBuildCardProps> = () => {
  const theme = useThemeStore((state) => state.theme);

  const isBuildCardsCollapsed = useGeneralStore((state) => state.isBuildCardsCollapsed);

  const buildController = useBuildController();

  return (
    <Pressable
      style={[
        styles.container,
        {
          height: isBuildCardsCollapsed ? 119 : 341,
          borderColor: theme.primary,
          backgroundColor: theme.surface,
        },
      ]}
      onPress={buildController.addRandomBuildInDisplay}
    >
      <Icon
        name="plus"
        type={IconType.MaterialCommunityIcons}
        size={isBuildCardsCollapsed ? 60 : 100}
        color={theme.primary}
      />
      <Text role="headline" size="small" namespace="button" color={theme.primary}>
        addABuild
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BUILD_CARD_WIDTH,
    borderWidth: BUILD_CARD_BORDER_WIDTH,
    borderRadius: BORDER_RADIUS_STANDARD,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(PlaceholderBuildCard);
