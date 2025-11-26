import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import { deepCompareStatArrays } from "@/utils/deepCompare";
import { useScreen } from "./ScreenContext";
import { useGameData } from "@/hooks/useGameData";
import { ResultStat } from "@/types";
import useGameStore from "@/stores/useGameStore";

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

  const game = useGameStore((state) => state.game);
  const screenName = useScreen();

  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault)[game];

  const [resultStats, setResultStats] = useState<ResultStat[]>(() =>
    screenName === "save" ? resultStatsSaveScreenInit : resultStatsDefault
  );

  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);

  useEffect(() => {
    if (isResultStatsSync && screenName === "search") return; // on ne met pas à jour si sync

    if (screenName === "save") return; // on ne met PAS à jour dans save screen car il est indépendant de       setResultStats(resultStatsDefault);

    if (!deepCompareStatArrays(resultStatsDefault, resultStats)) {
      setResultStats(resultStatsDefault);
    }
  }, [resultStatsDefault]);

  useEffect(() => {
    if (screenName === "save") {
      setResultStats(resultStatsSaveScreenInit); // on MET à jour dans save screen car il dépend de game
    }
  }, [game]);

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
