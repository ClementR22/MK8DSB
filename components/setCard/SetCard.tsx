import React, { useMemo, useCallback, memo } from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import useModalsStore from "@/stores/useModalsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import SetImagesModal from "./SetImagesModal";
import StatSliderSetCardsContainer from "../statSliderSetCard/StatSliderSetCardsContainer";
import { arraysEqual } from "@/utils/deepCompare";
import SetCardHeader, { SetCardHeaderProps } from "./SetCardHeader";

export const SET_CARD_WIDTH = 220;
export interface SetData {
  name: string;
  classIds: number[];
  stats: number[] | null;
  percentage?: number | undefined;
}

export type actionNamesList = string[];

interface SetCardSituationConfig {
  isEditable: boolean;
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
    isEditable: false,
    showStatSliderResult: true,
  },
  display: {
    isEditable: true,
    showStatSliderResult: false,
  },
  save: {
    isEditable: true,
    showStatSliderResult: true,
  },
  load: {
    isEditable: false,
    showStatSliderResult: false,
  },
};

interface SetCardProps {
  setToShowName: string;
  setToShowClassIds: number[];
  setToShowStats?: number[] | null;
  setToShowPercentage?: number;
  setCardIndex: number;
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const SetCard: React.FC<SetCardProps> = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setToShowPercentage = undefined,
  setCardIndex,
  isInLoadSetModal = false,
  screenNameFromProps,
  hideRemoveSet = false,
  onLayout,
}) => {
  const contextScreenName = useScreen();

  const screenName = useMemo(() => screenNameFromProps ?? contextScreenName, [screenNameFromProps, contextScreenName]);
  const situation = useMemo(() => (isInLoadSetModal ? "load" : screenName), [isInLoadSetModal, screenName]);

  const theme = useThemeStore((state) => state.theme);

  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const isSaved = useMemo(
    () =>
      setsListSaved.some((setSaved) => {
        arraysEqual(setSaved.classIds, setToShowClassIds);
      }),
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
  const setsetCardEditedIndex = useSetsStore((state) => state.setsetCardEditedIndex);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  const handleEditPress = useCallback(() => {
    setsetCardEditedIndex(setCardIndex);
    updateSelectionFromSet(setToShowClassIds);
    setIsEditModalVisible(true);
  }, [setsetCardEditedIndex, updateSelectionFromSet, setIsEditModalVisible, setToShowClassIds, setCardIndex]);

  const headerProps: SetCardHeaderProps = useMemo(
    () => ({
      isEditable: config.isEditable,
      setToShowName,
      setCardIndex,
      setToShowPercentage,
      moreActionNamesList: config.moreActionNamesList,
      situation,
    }),
    [config.isEditable, setToShowName, setCardIndex, setToShowPercentage, config.moreActionNamesList, situation]
  );

  return (
    <View onLayout={onLayout} style={styles.container}>
      <BoxContainer contentBackgroundColor={theme.surface} margin={0} widthContainer={SET_CARD_WIDTH} gap={0}>
        <SetCardHeader {...headerProps} />

        <SetImagesModal setToShowClassIds={setToShowClassIds} />

        <SetCardActionButtons
          actionNamesList={config.actionNamesList}
          setCardIndex={setCardIndex}
          situation={situation}
          isSaved={isSaved}
          handleEditPress={handleEditPress}
        />
      </BoxContainer>

      {config.showStatSliderResult && setToShowStats !== null && (
        <StatSliderSetCardsContainer setToShowStats={setToShowStats} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default memo(SetCard);
