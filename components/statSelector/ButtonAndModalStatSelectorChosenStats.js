import useSetsStore from "@/stores/useSetsStore";
import React, { useCallback, useEffect } from "react";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import ButtonAndModalStatSelector from "./ButtonAndModalStatSelector";

const ButtonAndModalStatSelectorChosenStats = () => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setChosenStats = useSetsStore((state) => state.setChosenStats);
  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const { setResultStats } = useResultStats();

  useEffect(() => {
    // s'il le faut on synchronise resultStats
    console.log("h", isResultStatsSync, chosenStats);
    if (isResultStatsSync) {
      syncWithChosenStats(setResultStats);
    }
  }, [chosenStats, isResultStatsSync, syncWithChosenStats, setResultStats]);

  return (
    <ButtonAndModalStatSelector
      statList={chosenStats}
      setStatList={setChosenStats}
      keepOneSelected={true}
      customTrigger={
        <ButtonIcon tooltipText="ChooseStats" iconName="plus" iconType={IconType.MaterialCommunityIcons} />
      }
      modalTitle="DesiredStats"
    />
  );
};

export default ButtonAndModalStatSelectorChosenStats;
