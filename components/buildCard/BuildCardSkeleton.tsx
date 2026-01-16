import { useBuildCardStyle } from "@/hooks/useBuildCardStyle";
import { useGameData } from "@/hooks/useGameData";
import useThemeStore from "@/stores/useThemeStore";
import {
  BUILD_CARD_WIDTH,
  BUTTON_SIZE,
  GAP_BUILD_IMAGES_CONTAINER,
  MAX_WIDTH_IN_BUILD_CARD,
  PADDING_BOX_CONTAINER,
  PADDING_VERTICAL_BUILD_IMAGES_CONTAINER,
} from "@/utils/designTokens";
import React from "react";
import { StyleSheet, View } from "react-native";
import StatGaugeGroupBuildCard from "../statGauge/StatGaugeGroupBuildCard";

interface BuildCardSkeletonProps {}

const BuildCardSkeleton: React.FC<BuildCardSkeletonProps> = ({}) => {
  const { maxNumberOfImages, numberOfCategories } = useGameData();

  const theme = useThemeStore((state) => state.theme);
  const { buildCardStyle } = useBuildCardStyle(BUILD_CARD_WIDTH);

  const heightImage = MAX_WIDTH_IN_BUILD_CARD / maxNumberOfImages;
  const heightImagesContainer =
    2 * PADDING_VERTICAL_BUILD_IMAGES_CONTAINER +
    numberOfCategories * heightImage +
    (numberOfCategories - 1) * GAP_BUILD_IMAGES_CONTAINER;

  return (
    <View style={styles.wrapper}>
      <View style={buildCardStyle}>
        <View style={styles.header}>
          <View style={[styles.input, { backgroundColor: theme.surface_container_high }]} />
          <View style={styles.percentage} />
        </View>
        <View style={{ height: heightImagesContainer }} />
        <View style={[styles.actionsContainer, { backgroundColor: theme.surface_container }]}></View>
      </View>

      <StatGaugeGroupBuildCard stats={[]} containerStyle={buildCardStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
  header: {
    height: BUTTON_SIZE,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  input: { height: 35, borderRadius: 7, flex: 1 },
  percentage: { width: "30%" },
  actionsContainer: {
    height: 2 * PADDING_BOX_CONTAINER + BUTTON_SIZE,
    borderRadius: 10,
  },
});

export default BuildCardSkeleton;
