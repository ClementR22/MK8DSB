import React, { useMemo, memo } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import SetImagesModal from "./SetImagesModal";
import StatGaugeBuildCardsContainer from "../statGauge/StatGaugeBuildCardsContainer";
import { arraysEqual } from "@/utils/deepCompare";
import SetCardHeader from "./SetCardHeader";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";
import { SET_CARD_WIDTH } from "@/utils/designTokens";
import useGeneralStore from "@/stores/useGeneralStore";
import { useSetCardConfig } from "@/hooks/useSetCardConfig";
import useBuildsListStore from "@/stores/useBuildsListStore";

interface BuildCardProps {
  name: string;
  classIds: number[];
  stats?: number[] | null;
  setToShowPercentage?: number;
  id: string;
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  borderColor?: string;
}

const BuildCard: React.FC<BuildCardProps> = ({
  name,
  classIds,
  stats = null,
  setToShowPercentage = undefined,
  id,
  isInLoadSetModal = false,
  screenNameFromProps,
  hideRemoveSet = false,
  onLayout,
  borderColor,
}) => {
  const contextScreenName = useScreen();
  const screenName = screenNameFromProps ?? contextScreenName;
  const situation = isInLoadSetModal ? "load" : screenName;

  const isSetCardsCollapsed = useGeneralStore((state) => state.isSetCardsCollapsed);
  const isCollapsed = screenName === "display" && isSetCardsCollapsed;

  const setsListSaved = useBuildsListStore((state) => state.setsListSaved);

  const isSaved = useMemo(
    () => setsListSaved.some((setSaved) => arraysEqual(setSaved.classIds, classIds)),
    [setsListSaved, classIds]
  );

  const config = useSetCardConfig(situation, hideRemoveSet, screenName);

  const { setCardStyle } = useSetCardStyle(SET_CARD_WIDTH);

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <View style={[setCardStyle, borderColor && { borderColor }]}>
        <SetCardHeader
          isNameEditable={config.isNameEditable}
          name={name}
          screenName={screenName}
          id={id}
          setToShowPercentage={setToShowPercentage}
          moreActionNamesList={
            isCollapsed
              ? [...(config.moreActionNamesList ?? []), ...config.actionNamesList]
              : config.moreActionNamesList
          }
        />

        <SetImagesModal classIds={classIds} isCollapsed={isCollapsed} />

        {!isCollapsed && (
          <SetCardActionButtons
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
