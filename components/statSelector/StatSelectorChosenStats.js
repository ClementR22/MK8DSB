import useSetsStore from "@/stores/useSetsStore";
import React, { useEffect } from "react";
import StatSelector from "./StatSelector";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";

const StatSelectorChosenStats = () => {
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setChosenStats = useSetsStore((state) => state.setChosenStats);
  const toggleCheckChosenStats = useSetsStore((state) => state.toggleCheckChosenStats);
  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const { setStatsVisibleList } = useStatsVisibleList();
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);

  useEffect(() => {
    if (isStatsVisibleSync) {
      syncWithChosenStats(setStatsVisibleList);
    }
  }, [isStatsVisibleSync, chosenStats]);

  return (
    <StatSelector
      statList={chosenStats}
      setStatList={setChosenStats}
      toggleCheck={(name) => {
        toggleCheckChosenStats(name);
      }}
    />
  );
};

export default StatSelectorChosenStats;
