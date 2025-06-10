import React from "react";
import StatSelector from "../statSelector/StatSelector";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import useSetsStore from "@/stores/useSetsStore";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import ButtonAndModal from "../modal/ButtonAndModal";

const StatSliderResultSelectorModalAndPressable = () => {
  const { statsVisibleList, setStatsVisibleList, toggleCheckListStatsVisibleList } = useStatsVisibleList();
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const isInDisplayScreen = screenName === "display";
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);
  const disabled = isInSearchScreen && isStatsVisibleSync;

  const tooltipText = isInDisplayScreen ? "DisplayedStats" : "DisplayedStatsInSets";
  const secondButtonProps = isInSearchScreen && {
    text: "MatchDesiredStats",
    onPress: () => syncWithChosenStats(setStatsVisibleList),
    disabled: disabled,
  };

  return (
    <ButtonAndModal
      customTrigger={
        <ButtonIcon
          tooltipText={tooltipText}
          iconName="checkbox-multiple-marked"
          iconType={IconType.MaterialCommunityIcons}
        />
      }
      modalTitle={isInDisplayScreen ? "DisplayedStats" : "DisplayedStatsInSets"}
      secondButtonProps={secondButtonProps}
      closeAfterSecondButton={false}
    >
      <StatSelector
        statList={statsVisibleList}
        setStatList={setStatsVisibleList}
        toggleCheck={(name) => {
          toggleCheckListStatsVisibleList(name);
        }}
        isStatVisibleInSearchScreen={isInSearchScreen}
        disabled={disabled}
      />
    </ButtonAndModal>
  );
};

export default StatSliderResultSelectorModalAndPressable;
