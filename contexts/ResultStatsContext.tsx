import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import { deepCompareStatArrays } from "@/utils/deepCompare";
import { useScreen } from "./ScreenContext";
import { useGameData } from "@/hooks/useGameData";
import { ResultStat } from "@/types";

type ResultStatsContextType = {
  resultStats: ResultStat[];
  setResultStats: React.Dispatch<React.SetStateAction<ResultStat[]>>;
};

const ResultStatsContext = createContext<ResultStatsContextType | undefined>(undefined);

interface ResultStatsProviderProps {
  children: ReactNode;
}

export const ResultStatsProvider: React.FC<ResultStatsProviderProps> = ({ children }) => {
  const { resultStatsSaveScreenInit } = useGameData();

  const screenName = useScreen();
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);

  const [resultStats, setResultStats] = useState<ResultStat[]>(() =>
    screenName === "save" ? resultStatsSaveScreenInit : resultStatsDefault
  );

  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);

  // useEffect est exécuté au lancement ET à chaque changement de resultStatsDefault dans les settings
  useEffect(() => {
    if (isResultStatsSync && screenName === "search") return;

    if (!deepCompareStatArrays(resultStatsDefault, resultStats)) {
      setResultStats(resultStatsDefault);
    }
  }, [resultStatsDefault]);

  const contextValue = useMemo<ResultStatsContextType>(
    () => ({
      resultStats,
      setResultStats,
    }),
    [resultStats]
  );

  return <ResultStatsContext.Provider value={contextValue}>{children}</ResultStatsContext.Provider>;
};

export const useResultStats = (): ResultStatsContextType => {
  const context = useContext(ResultStatsContext);
  if (!context) {
    throw new Error("useResultStats must be used within ResultStatsProvider");
  }
  return context;
};
