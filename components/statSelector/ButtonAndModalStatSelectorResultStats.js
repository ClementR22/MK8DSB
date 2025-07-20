import React, { useMemo } from "react";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import useSetsStore from "@/stores/useSetsStore";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import ButtonAndModalStatSelector from "./ButtonAndModalStatSelector";
import { PAGES_NAVIGATOR_DOTS_ICONS_SIZE } from "../elementCompactSelector/PagesNavigator";

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

  const buttonIconProps = useMemo(() => {
    console.log("calc");
    if (isInDisplayScreen) {
      return {
        tooltipText: "DisplayedStats",
        iconName: "plus",
        iconType: IconType.MaterialCommunityIcons,
        buttonSize: PAGES_NAVIGATOR_DOTS_ICONS_SIZE,
      };
    } else {
      return {
        tooltipText: "DisplayedStatsInSets",
        iconName: "checkbox-multiple-marked",
        iconType: IconType.MaterialCommunityIcons,
        buttonSize: undefined,
      };
    }
  }, [screenName]);

  return (
    <ButtonAndModalStatSelector
      statList={resultStats}
      setStatList={setResultStats}
      customTrigger={
        <ButtonIcon
          tooltipText={buttonIconProps.tooltipText}
          iconName={buttonIconProps.iconName}
          iconType={buttonIconProps.iconType}
          buttonSize={buttonIconProps.buttonSize}
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
