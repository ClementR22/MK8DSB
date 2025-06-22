import React, { useMemo, useCallback } from "react";
import { View } from "react-native";
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
  percentage: number | undefined;
}

interface SetCardProps {
  setToShowName: string;
  setToShowClassIds: number[];
  setToShowStats?: number[] | null;
  setToShowPercentage?: number;
  setCardIndex: number;
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
}

export type actionNamesList = string[];

interface SetCardSituationConfig {
  isEditable: boolean;
  showStatSliderResult: boolean;
  actionNamesList: actionNamesList;
  moreActionNamesList?: actionNamesList;
}

const situationConfigs: Record<string, SetCardSituationConfig> = {
  search: {
    isEditable: false,
    showStatSliderResult: true,
    actionNamesList: ["export", "loadSearchToDisplay", "save"],
    moreActionNamesList: undefined,
  },
  display: {
    isEditable: true,
    showStatSliderResult: false,
    actionNamesList: ["edit", "loadDisplayToSearch", "save"],
    moreActionNamesList: [], // va etre complété plus tard
  },
  save: {
    isEditable: true,
    showStatSliderResult: true,
    actionNamesList: ["edit", "loadSaveToSearch", "loadSaveToDisplay"],
    moreActionNamesList: ["export", "removeInMemory"],
  },
  load: {
    isEditable: false,
    showStatSliderResult: false,
    actionNamesList: [], // va etre complété plus tard
    moreActionNamesList: undefined,
  },
};

const SetCard: React.FC<SetCardProps> = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setToShowPercentage = undefined,
  setCardIndex,
  isInLoadSetModal = false,
  screenNameFromProps,
  hideRemoveSet = false,
}) => {
  const contextScreenName = useScreen();

  const screenName = useMemo(() => screenNameFromProps ?? contextScreenName, [screenNameFromProps, contextScreenName]);

  const situation = useMemo(() => (isInLoadSetModal ? "load" : screenName), [isInLoadSetModal, screenName]);

  const theme = useThemeStore((state) => state.theme);

  const isSaved = useSetsStore(
    useCallback(
      (state) => state.setsListSaved.some((setSaved) => arraysEqual(setSaved.classIds, setToShowClassIds)),
      [setToShowClassIds]
    )
  );

  const config = useMemo(() => {
    const currentConfig = { ...(situationConfigs[situation] || {}) };

    if (situation === "load") {
      currentConfig.actionNamesList = [screenName === "search" ? "loadSaveToSearch" : "loadSaveToDisplay"];
    }

    if (situation === "display") {
      const dynamicMoreActions: string[] = [];
      if (!hideRemoveSet) {
        dynamicMoreActions.push("remove");
      }
      dynamicMoreActions.push("export");

      return {
        ...currentConfig,
        moreActionNamesList: dynamicMoreActions,
      };
    }

    return currentConfig;
  }, [situation, hideRemoveSet, screenName]);

  const setPressedClassIdsObjByScreen = usePressableElementsStore((state) => state.setPressedClassIdsObjByScreen);
  const updatePressableElementsList = usePressableElementsStore((state) => state.updatePressableElementsList);
  const setsetCardEditedIndex = useSetsStore((state) => state.setsetCardEditedIndex);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  const handleEditPress = useCallback(() => {
    setsetCardEditedIndex(setCardIndex);
    setPressedClassIdsObjByScreen(screenName, setToShowClassIds);
    setIsEditModalVisible(true);
    updatePressableElementsList(screenName, setToShowClassIds);
  }, [
    setsetCardEditedIndex,
    setPressedClassIdsObjByScreen,
    setIsEditModalVisible,
    updatePressableElementsList,
    screenName,
    setToShowClassIds,
    setCardIndex,
  ]);

  const headerProps: SetCardHeaderProps = useMemo(() => {
    return {
      isEditable: config.isEditable,
      setToShowName: setToShowName,
      setCardIndex: setCardIndex,
      setToShowPercentage: setToShowPercentage,
      moreActionNamesList: config.moreActionNamesList,
      situation: situation,
    };
  }, [config.isEditable, setToShowName, setCardIndex, setToShowPercentage, config.moreActionNamesList, situation]);

  return (
    <View>
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

export default React.memo(SetCard);
