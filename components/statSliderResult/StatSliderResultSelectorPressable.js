import React from "react";
import StatSelector from "../statSelector/StatSelector";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import useSetsStore from "@/stores/useSetsStore";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import ButtonAndModal from "../modal/ButtonAndModal";

const StatSliderResultSelectorPressable = () => {
  const { statsVisibleList, setStatsVisibleList, toggleCheckListStatsVisibleList } = useStatsVisibleList();

  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";

  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);
  const disabled = isStatsVisibleSync && screenName === "search";

  const tooltipText = disabled ? "DisabledBecauseMatchDesiredStats" : "DisplayedStats";
  const secondButtonProps = isInSearchScreen && {
    text: "MatchDesiredStats",
    onPress: () => syncWithChosenStats(setStatsVisibleList),
  };

  return (
    <ButtonAndModal
      customTrigger={
        <ButtonIcon
          tooltipText={tooltipText}
          iconName="checkbox-multiple-marked"
          iconType={IconType.MaterialCommunityIcons}
          disabled={disabled}
        />
      }
      modalTitle="DisplayedStats"
      secondButtonProps={secondButtonProps}
      closeAfterSecondButton={false}
    >
      <StatSelector
        statList={statsVisibleList}
        setStatList={setStatsVisibleList}
        toggleCheck={(name) => {
          toggleCheckListStatsVisibleList(name);
        }}
      />
    </ButtonAndModal>
  );
};

export default StatSliderResultSelectorPressable;
