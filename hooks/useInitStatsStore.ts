import useStatsStore from "@/stores/useStatsStore";
import { useEffect } from "react";
import { useGameData } from "./useGameData";

export function useInitStatsStore() {
  const { chosenStatsInit } = useGameData();

  const initChosenStats = useStatsStore((s) => s.initChosenStats);

  useEffect(() => {
    initChosenStats(chosenStatsInit);
  }, [chosenStatsInit]);
}
