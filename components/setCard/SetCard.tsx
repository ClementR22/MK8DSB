import React, { useMemo, useCallback, memo } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import useModalsStore from "@/stores/useModalsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import SetImagesModal from "./SetImagesModal";
import StatGaugeSetCardsContainer from "../statGauge/StatGaugeSetCardsContainer";
import { arraysEqual } from "@/utils/deepCompare";
import SetCardHeader from "./SetCardHeader";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";
import { SET_CARD_WIDTH } from "@/utils/designTokens";
import useGeneralStore from "@/stores/useGeneralStore";
import { useSetCardConfig } from "@/hooks/useSetCardConfig";
import useSetsListStore from "@/stores/useSetsListStore";

export interface SetData {
  name: string;
  classIds: number[];
  stats: number[] | null;
  percentage?: number | undefined;
}

interface SetCardProps {
  setToShowName: string;
  setToShowClassIds: number[];
  setToShowStats?: number[] | null;
  setToShowPercentage?: number;
  setToShowId: string;
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  borderColor?: string;
}

const SetCard: React.FC<SetCardProps> = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setToShowPercentage = undefined,
  setToShowId,
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

  const setsListSaved = useSetsListStore((state) => state.setsListSaved);

  const isSaved = useMemo(
    () => setsListSaved.some((setSaved) => arraysEqual(setSaved.classIds, setToShowClassIds)),
    [setsListSaved, setToShowClassIds]
  );

  const updateSelectionFromSet = usePressableElementsStore((state) => state.updateSelectionFromSet);
  const setSetCardEditedId = useSetsListStore((state) => state.setSetCardEditedId);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  const config = useSetCardConfig(situation, hideRemoveSet, screenName);

  const { setCardStyle } = useSetCardStyle(SET_CARD_WIDTH);

  const handleEditPress = useCallback(() => {
    setSetCardEditedId(setToShowId);
    updateSelectionFromSet(setToShowClassIds);
    setIsEditModalVisible(true);
  }, [setSetCardEditedId, updateSelectionFromSet, setIsEditModalVisible, setToShowClassIds, setToShowId]);

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <View style={[setCardStyle, borderColor && { borderColor }]}>
        <SetCardHeader
          isNameEditable={config.isNameEditable}
          setToShowName={setToShowName}
          setToShowId={setToShowId}
          setToShowPercentage={setToShowPercentage}
          moreActionNamesList={
            isCollapsed
              ? [...(config.moreActionNamesList ?? []), ...config.actionNamesList]
              : config.moreActionNamesList
          }
          situation={situation}
        />

        <SetImagesModal setToShowClassIds={setToShowClassIds} isCollapsed={isCollapsed} />

        {!isCollapsed && (
          <SetCardActionButtons
            actionNamesList={config.actionNamesList}
            setToShowId={setToShowId}
            situation={situation}
            isSaved={isSaved}
            handleEditPress={handleEditPress}
          />
        )}
      </View>
      {config.showStatSliderResult && setToShowStats !== null && (
        <StatGaugeSetCardsContainer setToShowStats={setToShowStats} containerStyle={setCardStyle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: 8 },
});

export default memo(SetCard);
