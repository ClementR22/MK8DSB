import React, { memo } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import BuildCardActionButtons from "./BuildCardActionButtons";
import BuildImagesContainer from "./BuildImagesContainer";
import StatGaugeBuildCardsContainer from "../statGauge/StatGaugeBuildCardsContainer";
import BuildCardHeader from "./BuildCardHeader";
import { useBuildCardStyle } from "@/hooks/useBuildCardStyle";
import { BUILD_CARD_WIDTH } from "@/utils/designTokens";
import useGeneralStore from "@/stores/useGeneralStore";
import { useBuildCardConfig } from "@/hooks/useBuildCardConfig";
import { buildsDataMap } from "@/data/builds/buildsData";
import useDeckStore from "@/stores/useDeckStore";

interface BuildCardProps {
  dataId: string;
  percentage?: number;
  isInLoadBuildModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveBuild?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  borderColor?: string;
}

const BuildCard: React.FC<BuildCardProps> = ({
  dataId,
  percentage = undefined,
  isInLoadBuildModal = false,
  screenNameFromProps,
  hideRemoveBuild = false,
  onLayout,
  borderColor,
}) => {
  const build = useDeckStore((state) => state.deck).get(dataId) || { name: "", isSaved: false, origin: "user" };

  const { name, isSaved } = build;

  const buildData = buildsDataMap.get(dataId);

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
          dataId={dataId}
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
          dataId={dataId}
        />

        {!isCollapsed && (
          <BuildCardActionButtons
            actionNamesList={config.actionNamesList}
            dataId={dataId}
            screenName={screenName}
            isInLoadBuildModal={isInLoadBuildModal}
            isSaved={isSaved}
          />
        )}
      </View>
      {config.showStatSliderResult && (
        <StatGaugeBuildCardsContainer stats={buildData.stats} containerStyle={setCardStyle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
});

export default memo(BuildCard);
