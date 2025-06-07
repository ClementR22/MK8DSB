import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { button } from "../styles/button";
import { shadow_12dp } from "@/components/styles/theme";
import StatSelector from "../statSelector/StatSelector";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { translate } from "@/translations/translations";
import { modal } from "@/components/styles/modal";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import ButtonAndModal from "../modal/ButtonAndModal";
import Button from "../Button";

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
