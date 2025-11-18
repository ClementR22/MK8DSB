import React, { memo } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import BuildCardActionButtons from "./BuildCardActionButtons";
import BuildImagesContainer from "./BuildImagesContainer";
import BuildCardHeader from "./BuildCardHeader";
import { useBuildCardStyle } from "@/hooks/useBuildCardStyle";
import { BUILD_CARD_WIDTH } from "@/utils/designTokens";
import useGeneralStore from "@/stores/useGeneralStore";
import { useBuildCardConfig } from "@/hooks/useBuildCardConfig";
import useDeckStore from "@/stores/useDeckStore";
import StatGaugeGroupBuildCard from "../statGauge/StatGaugeGroupBuildCard";
import { useGameData } from "@/hooks/useGameData";

interface BuildCardProps {
  buildDataId: string;
  percentage?: number;
  isInLoadBuildModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveBuild?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  borderColor?: string;
}

const BuildCard: React.FC<BuildCardProps> = ({
  buildDataId,
  percentage = undefined,
  isInLoadBuildModal = false,
  screenNameFromProps,
  hideRemoveBuild = false,
  onLayout,
  borderColor,
}) => {
  const { buildsDataMap } = useGameData();

  const build = useDeckStore((state) => state.deck).get(buildDataId) || { name: "", isSaved: false };

  const { name, isSaved } = build;

  const buildData = buildsDataMap.get(buildDataId);

  const contextScreenName = useScreen();
  const screenName = screenNameFromProps ?? contextScreenName;
  const situation = isInLoadBuildModal ? "load" : screenName;

  const isBuildCardsCollapsed = useGeneralStore((state) => state.isBuildCardsCollapsed);
  const isCollapsed = screenName === "display" && isBuildCardsCollapsed;

  const config = useBuildCardConfig(situation, hideRemoveBuild, screenName);

  const { setCardStyle } = useBuildCardStyle(BUILD_CARD_WIDTH);

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <View style={[setCardStyle, borderColor && { borderColor }]}>
        <BuildCardHeader
          isNameEditable={config.isNameEditable}
          name={name}
          screenName={screenName}
          buildDataId={buildDataId}
          percentage={percentage}
          isSaved={isSaved}
          moreActionNamesList={
            isCollapsed
              ? [...(config.moreActionNamesList ?? []), ...config.actionNamesList]
              : config.moreActionNamesList
          }
        />

        <BuildImagesContainer
          classIds={buildData.classIds}
          isCollapsed={isCollapsed}
          isInLoadBuildModal={isInLoadBuildModal}
          buildDataId={buildDataId}
        />

        {!isCollapsed && (
          <BuildCardActionButtons
            actionNamesList={config.actionNamesList}
            buildDataId={buildDataId}
            screenName={screenName}
            isInLoadBuildModal={isInLoadBuildModal}
            isSaved={isSaved}
          />
        )}
      </View>
      {config.showStatSliderResult && <StatGaugeGroupBuildCard stats={buildData.stats} containerStyle={setCardStyle} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
});

export default memo(BuildCard);
