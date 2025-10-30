import React, { useMemo, memo } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import BuildCardActionButtons from "./BuildCardActionButtons";
import BuildImagesModal from "./BuildImagesModal";
import StatGaugeBuildCardsContainer from "../statGauge/StatGaugeBuildCardsContainer";
import { arraysEqual } from "@/utils/deepCompare";
import BuildCardHeader from "./BuildCardHeader";
import { useBuildCardStyle } from "@/hooks/useBuildCardStyle";
import { BUILD_CARD_WIDTH } from "@/utils/designTokens";
import useGeneralStore from "@/stores/useGeneralStore";
import { useBuildCardConfig } from "@/hooks/useBuildCardConfig";
import useBuildsListStore from "@/stores/useBuildsListStore";

interface BuildCardProps {
  name: string;
  classIds: number[];
  stats?: number[] | null;
  percentage?: number;
  id: string;
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveBuild?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  borderColor?: string;
}

const BuildCard: React.FC<BuildCardProps> = ({
  name,
  classIds,
  stats = null,
  percentage = undefined,
  id,
  isInLoadSetModal = false,
  screenNameFromProps,
  hideRemoveBuild = false,
  onLayout,
  borderColor,
}) => {
  const contextScreenName = useScreen();
  const screenName = screenNameFromProps ?? contextScreenName;
  const situation = isInLoadSetModal ? "load" : screenName;

  const isBuildCardsCollapsed = useGeneralStore((state) => state.isBuildCardsCollapsed);
  const isCollapsed = screenName === "display" && isBuildCardsCollapsed;

  const buildsListSaved = useBuildsListStore((state) => state.buildsListSaved);

  const isSaved = useMemo(
    () => buildsListSaved.some((build) => arraysEqual(build.classIds, classIds)),
    [buildsListSaved, classIds]
  );

  const config = useBuildCardConfig(situation, hideRemoveBuild, screenName);

  const { setCardStyle } = useBuildCardStyle(BUILD_CARD_WIDTH);

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <View style={[setCardStyle, borderColor && { borderColor }]}>
        <BuildCardHeader
          isNameEditable={config.isNameEditable}
          name={name}
          screenName={screenName}
          id={id}
          percentage={percentage}
          moreActionNamesList={
            isCollapsed
              ? [...(config.moreActionNamesList ?? []), ...config.actionNamesList]
              : config.moreActionNamesList
          }
        />

        <BuildImagesModal classIds={classIds} isCollapsed={isCollapsed} />

        {!isCollapsed && (
          <BuildCardActionButtons
            actionNamesList={config.actionNamesList}
            id={id}
            screenName={screenName}
            isInLoadModal={isInLoadSetModal}
            isSaved={isSaved}
          />
        )}
      </View>
      {config.showStatSliderResult && stats !== null && (
        <StatGaugeBuildCardsContainer stats={stats} containerStyle={setCardStyle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
});

export default memo(BuildCard);
