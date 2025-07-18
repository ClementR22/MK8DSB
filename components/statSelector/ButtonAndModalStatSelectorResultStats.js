import React from "react";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import ButtonAndModalStatSelector from "./ButtonAndModalStatSelector";

const ButtonAndModalStatSelectorResultStats = () => {
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const isInDisplayScreen = screenName === "display";

  const { resultStats, setResultStats } = useResultStats();
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);

  const secondButtonProps = isInSearchScreen
    ? {
        text: "MatchDesiredStats",
        onPress: () => syncWithChosenStats(setResultStats),
      }
    : undefined;

  return (
    <ButtonAndModalStatSelector
      statList={resultStats}
      setStatList={setResultStats}
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
      keepOneSelected={isInDisplayScreen}
      includeBeforeSync
    />
  );
};

export default ButtonAndModalStatSelectorResultStats;
