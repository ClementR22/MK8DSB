import { useBuildCardStyle } from "@/hooks/useBuildCardStyle";
import { useGameData } from "@/hooks/useGameData";
import useThemeStore from "@/stores/useThemeStore";
import {
  WIDTH_BUILD_CARD,
  BUTTON_SIZE,
  GAP_BUILD_IMAGES_CONTAINER,
  MAX_WIDTH_IN_BUILD_CARD,
  PADDING_BOX_CONTAINER,
  PADDING_VERTICAL_BUILD_IMAGES_CONTAINER,
  WIDTH_BUILD_CARD_CONTENT,
  BORDER_RADIUS_INPUT,
  BORDER_RADIUS_MEDIUM,
} from "@/utils/designTokens";
import React from "react";
import { StyleSheet, View } from "react-native";
import Shimmer from "../../Shimmer";
import { styles as statGaugeGroupBuildCardStyle } from "../../statGauge/StatGaugeGroupBuildCard";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { styles as stylesBuildCardHeader } from "../BuildCardHeader";

const HEIGHT_HEADER_CONTENT = 35; // calculé à partir du Text du pourcentage dans BuildCardHeader

interface BuildCardSkeletonProps {}

const BuildCardSkeleton: React.FC<BuildCardSkeletonProps> = ({}) => {
  const { maxNumberOfImages, numberOfCategories } = useGameData();

  const theme = useThemeStore((state) => state.theme);
  const { buildCardStyle } = useBuildCardStyle(WIDTH_BUILD_CARD);
  const { resultStats } = useResultStats();

  const heightImage = MAX_WIDTH_IN_BUILD_CARD / maxNumberOfImages;
  const heightImagesContainer =
    2 * PADDING_VERTICAL_BUILD_IMAGES_CONTAINER +
    numberOfCategories * heightImage +
    (numberOfCategories - 1) * GAP_BUILD_IMAGES_CONTAINER;

  return (
    <View style={styles.wrapper}>
      <View style={buildCardStyle}>
        <View key="header" style={stylesBuildCardHeader.headerContainer}>
          <Shimmer
            key="input"
            height={HEIGHT_HEADER_CONTENT}
            width={
              WIDTH_BUILD_CARD_CONTENT -
              stylesBuildCardHeader.percentage.width -
              stylesBuildCardHeader.headerContainer.gap
            }
            borderRadius={BORDER_RADIUS_INPUT}
            backgroundColor={theme.surface_container}
          />
          <Shimmer
            key="percentage"
            height={HEIGHT_HEADER_CONTENT}
            width={stylesBuildCardHeader.percentage.width}
            borderRadius={BORDER_RADIUS_INPUT}
            backgroundColor="transparent"
          />
        </View>
        <Shimmer
          key="images"
          height={heightImagesContainer}
          width={WIDTH_BUILD_CARD_CONTENT}
          backgroundColor={theme.surface_container}
          inverse
        />
        <Shimmer
          key="actions"
          height={2 * PADDING_BOX_CONTAINER + BUTTON_SIZE}
          width={WIDTH_BUILD_CARD_CONTENT}
          borderRadius={BORDER_RADIUS_MEDIUM}
          backgroundColor={theme.surface_container}
        />
      </View>

      <View key="StatGaugeGroupBuildCard" style={[buildCardStyle, statGaugeGroupBuildCardStyle.container]}>
        {resultStats.map(
          (stat, index) =>
            stat.checked && (
              <View
                key={`StatGaugeContainer-${index}`}
                style={{ paddingLeft: 47, paddingRight: 48, height: 20, justifyContent: "center" }}
              >
                <Shimmer
                  key="StatGaugeBarBuildCard"
                  height={13}
                  width={WIDTH_BUILD_CARD - 4 - 47 - 48}
                  backgroundColor={theme.surface_variant}
                />
              </View>
            )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
  input: { height: HEIGHT_HEADER_CONTENT, borderRadius: 7 },
  percentage: { width: "30%" },
});

export default BuildCardSkeleton;
