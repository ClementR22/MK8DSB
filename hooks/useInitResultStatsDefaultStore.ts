import { useEffect } from "react";
import { useGameData } from "./useGameData";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";

export function useInitResultStatsDefaultStore() {
  const { resultStatsDefaultInit } = useGameData();

  const initResultStatsDefault = useResultStatsDefaultStore((s) => s.initResultStatsDefault);

  useEffect(() => {
    initResultStatsDefault(resultStatsDefaultInit);
  }, [resultStatsDefaultInit]);
}
