import React from "react";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import StatSelectorButtonAndModal from "../statSelector/StatSelectorButtonAndModal";

const StatSliderResultSelectorModalAndPressable = () => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const isInDisplayScreen = screenName === "display";

  const { statsVisibleList, setStatsVisibleList, toggleCheckListStatsVisibleList } = useStatsVisibleList();
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);

  const secondButtonProps = isInSearchScreen
    ? {
        text: "MatchDesiredStats",
        onPress: () => syncWithChosenStats(setStatsVisibleList),
        disabled: isStatsVisibleSync,
      }
    : undefined;

  return (
    <StatSelectorButtonAndModal
      statList={statsVisibleList}
      setStatList={setStatsVisibleList}
      toggleCheck={toggleCheckListStatsVisibleList}
      customTrigger={
        <ButtonIcon
          tooltipText={isInDisplayScreen ? "DisplayedStats" : "DisplayedStatsInSets"}
          iconName="checkbox-multiple-marked"
          iconType={IconType.MaterialCommunityIcons}
        />
      }
      modalTitle={isInDisplayScreen ? "DisplayedStats" : "DisplayedStatsInSets"}
      secondButtonProps={secondButtonProps}
      isStatVisibleInSearchScreen={isInSearchScreen}
      disabled={isInSearchScreen && isStatsVisibleSync}
      includeBeforeSync
    />
  );
};

export default StatSliderResultSelectorModalAndPressable;
