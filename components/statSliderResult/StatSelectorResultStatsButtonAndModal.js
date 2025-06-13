import React from "react";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useResultStatsConfigStore } from "@/stores/useResultStatsDefaultStore";
import StatSelectorButtonAndModal from "../statSelector/StatSelectorButtonAndModal";

const StatSelectorResultStatsButtonAndModal = () => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const isInDisplayScreen = screenName === "display";

  const { resultStats, setResultStats, toggleCheckResultStats } = useResultStats();
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const isResultStatsSync = useResultStatsConfigStore((state) => state.isResultStatsSync);

  const secondButtonProps = isInSearchScreen
    ? {
        text: "MatchDesiredStats",
        onPress: () => syncWithChosenStats(setResultStats),
        disabled: isResultStatsSync,
      }
    : undefined;

  return (
    <StatSelectorButtonAndModal
      statList={resultStats}
      setStatList={setResultStats}
      toggleCheck={toggleCheckResultStats}
      customTrigger={
        <ButtonIcon
          tooltipText={isInDisplayScreen ? "DisplayedStats" : "DisplayedStatsInSets"}
          iconName="checkbox-multiple-marked"
          iconType={IconType.MaterialCommunityIcons}
        />
      }
      modalTitle={isInDisplayScreen ? "DisplayedStats" : "DisplayedStatsInSets"}
      secondButtonProps={secondButtonProps}
      isResultStatsInSearchScreen={isInSearchScreen}
      disabled={isInSearchScreen && isResultStatsSync}
      includeBeforeSync
    />
  );
};

export default StatSelectorResultStatsButtonAndModal;
