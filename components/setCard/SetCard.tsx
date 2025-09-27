import React, { useMemo, useCallback, memo } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import useModalsStore from "@/stores/useModalsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetImagesModal from "./SetImagesModal";
import StatGaugeSetCardsContainer from "../statGauge/StatGaugeSetCardsContainer";
import { arraysEqual } from "@/utils/deepCompare";
import SetCardHeader, { SetCardHeaderProps } from "./SetCardHeader";
import { useSetCardStyle } from "@/hooks/useSetCardStyle";
import { PADDING_SET_CARDS_CONTAINER, SET_CARD_WIDTH } from "@/utils/designTokens";

export interface SetData {
  name: string;
  classIds: number[];
  stats: number[] | null;
  percentage?: number | undefined;
}

export type actionNamesList = string[];

interface SetCardSituationConfig {
  isNameEditable: boolean;
  showStatSliderResult: boolean;
  actionNamesList: actionNamesList;
  moreActionNamesList?: actionNamesList;
}

const BASE_ACTIONS_SEARCH: actionNamesList = ["export", "loadSearchToDisplay", "save"];
const BASE_ACTIONS_DISPLAY: actionNamesList = ["edit", "loadDisplayToSearch", "save"];
const BASE_ACTIONS_SAVE: actionNamesList = ["edit", "loadSaveToSearch", "loadSaveToDisplay"];
const BASE_MORE_ACTIONS_SAVE: actionNamesList = ["export", "removeInMemory"];
const MORE_ACTIONS_DISPLAY_COMMON: actionNamesList = ["export"]; // Common actions for display more list

const situationConfigs: Record<string, Omit<SetCardSituationConfig, "actionNamesList" | "moreActionNamesList">> = {
  search: {
    isNameEditable: true,
    showStatSliderResult: true,
  },
  display: {
    isNameEditable: true,
    showStatSliderResult: false,
  },
  save: {
    isNameEditable: true,
    showStatSliderResult: true,
  },
  load: {
    isNameEditable: false,
    showStatSliderResult: false,
  },
};

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

  const screenName = useMemo(() => screenNameFromProps ?? contextScreenName, [screenNameFromProps, contextScreenName]);
  const situation = useMemo(() => (isInLoadSetModal ? "load" : screenName), [isInLoadSetModal, screenName]);

  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const isSaved = useMemo(
    () => setsListSaved.some((setSaved) => arraysEqual(setSaved.classIds, setToShowClassIds)),
    [setsListSaved, setToShowClassIds]
  );

  const config = useMemo(() => {
    const base = situationConfigs[situation];
    let actionNames: actionNamesList;
    let moreActionNames: actionNamesList | undefined;

    if (situation === "load") {
      actionNames = [screenName === "search" ? "loadSaveToSearch" : "loadSaveToDisplay"];
      moreActionNames = undefined;
    } else if (situation === "display") {
      actionNames = BASE_ACTIONS_DISPLAY;
      const dynamicMore: string[] = [];
      if (!hideRemoveSet) {
        dynamicMore.push("remove");
      }

      moreActionNames =
        dynamicMore.length > 0 ? [...dynamicMore, ...MORE_ACTIONS_DISPLAY_COMMON] : MORE_ACTIONS_DISPLAY_COMMON;
    } else if (situation === "save") {
      actionNames = BASE_ACTIONS_SAVE;
      moreActionNames = BASE_MORE_ACTIONS_SAVE;
    } else if (situation === "search") {
      actionNames = BASE_ACTIONS_SEARCH;
      moreActionNames = undefined;
    } else {
      actionNames = [];
      moreActionNames = undefined;
    }

    return {
      ...base,
      actionNamesList: actionNames,
      moreActionNamesList: moreActionNames,
    };
  }, [situation, hideRemoveSet, screenName]);

  const updateSelectionFromSet = usePressableElementsStore((state) => state.updateSelectionFromSet);
  const setSetCardEditedId = useSetsStore((state) => state.setSetCardEditedId);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  const handleEditPress = useCallback(() => {
    setSetCardEditedId(setToShowId);
    updateSelectionFromSet(setToShowClassIds);
    setIsEditModalVisible(true);
  }, [setSetCardEditedId, updateSelectionFromSet, setIsEditModalVisible, setToShowClassIds, setToShowId]);

  const headerProps: SetCardHeaderProps = useMemo(
    () => ({
      isNameEditable: config.isNameEditable,
      setToShowName,
      setToShowId,
      setToShowPercentage,
      moreActionNamesList: config.moreActionNamesList,
      situation,
    }),
    [config.isNameEditable, setToShowName, setToShowId, setToShowPercentage, config.moreActionNamesList, situation]
  );

  const { setCardStyle } = useSetCardStyle(SET_CARD_WIDTH);

  const setCardCompleteStyle = useMemo(
    () => [{ ...setCardStyle }, borderColor && { borderColor }],
    [setCardStyle, borderColor]
  );

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      <View style={setCardCompleteStyle}>
        <SetCardHeader {...headerProps} />

        <SetImagesModal setToShowClassIds={setToShowClassIds} />

        <SetCardActionButtons
          actionNamesList={config.actionNamesList}
          setToShowId={setToShowId}
          situation={situation}
          isSaved={isSaved}
          handleEditPress={handleEditPress}
        />
      </View>
      {config.showStatSliderResult && setToShowStats !== null && (
        <StatGaugeSetCardsContainer setToShowStats={setToShowStats} containerStyle={setCardStyle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: PADDING_SET_CARDS_CONTAINER / 2 },
});

export default memo(SetCard);
