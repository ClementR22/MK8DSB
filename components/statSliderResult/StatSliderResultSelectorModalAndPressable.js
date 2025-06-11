import React, { useState } from "react";
import StatSelector from "../statSelector/StatSelector";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import ButtonAndModal from "../modal/ButtonAndModal";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";

const StatSliderResultSelectorModalAndPressable = () => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const isInDisplayScreen = screenName === "display";

  const { statsVisibleList, setStatsVisibleList, toggleCheckListStatsVisibleList } = useStatsVisibleList();

  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);
  const disabled = isInSearchScreen && isStatsVisibleSync;

  const [statListBeforeAll, setStatListBeforeAll] = useState(null);
  const [statListBeforeSync, setStatListBeforeSync] = useState(statsVisibleList);

  const tooltipText = isInDisplayScreen ? "DisplayedStats" : "DisplayedStatsInSets";
  const modalTitle = tooltipText;

  const secondButtonProps = isInSearchScreen
    ? {
        text: "MatchDesiredStats",
        onPress: () => syncWithChosenStats(setStatsVisibleList),
        disabled: disabled,
      }
    : undefined;

  return (
    <ButtonAndModal
      customTrigger={
        <ButtonIcon
          tooltipText={tooltipText}
          iconName="checkbox-multiple-marked"
          iconType={IconType.MaterialCommunityIcons}
        />
      }
      modalTitle={modalTitle}
      secondButtonProps={secondButtonProps}
      closeAfterSecondButton={false}
    >
      <StatSelector
        statList={statsVisibleList}
        setStatList={setStatsVisibleList}
        statListBeforeAll={statListBeforeAll}
        setStatListBeforeAll={setStatListBeforeAll}
        statListBeforeSync={statListBeforeSync}
        setStatListBeforeSync={setStatListBeforeSync}
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
