import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { resultStatsSaveScreenInit } from "@/config/resultStatsInit";
import { deepCompareStatArrays } from "@/utils/deepCompare";
import { StatName } from "@/data/stats/statsTypes";
import { useScreen } from "./ScreenContext";

export type ResultStat = {
  name: StatName;
  checked: boolean;
};

export type ResultStats = ResultStat[];

interface ResultStatsContextType {
  resultStats: ResultStats;
  setResultStats: React.Dispatch<React.SetStateAction<ResultStats>>;
}

const ResultStatsContext = createContext<ResultStatsContextType | undefined>(undefined);

interface ResultStatsProviderProps {
  children: ReactNode;
}

export const ResultStatsProvider: React.FC<ResultStatsProviderProps> = ({ children }) => {
  const screenName = useScreen();
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);

  const [resultStats, setResultStats] = useState<ResultStats>(() =>
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
