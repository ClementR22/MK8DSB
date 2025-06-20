import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { toggleCheckList } from "@/utils/toggleCheck"; // Ensure toggleCheckList is properly typed
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { resultStatsInit } from "@/config/resultStatsInit";
import { deepCompareStatArrays } from "@/utils/deepCompare";

export type ResultStat = {
  name: string;
  checked: boolean;
};

export type ResultStats = ResultStat[];

interface ResultStatsContextType {
  resultStats: ResultStats;
  setResultStats: React.Dispatch<React.SetStateAction<ResultStats>>;
  toggleCheckResultStats: (name: string) => void;
}

const ResultStatsContext = createContext<ResultStatsContextType | undefined>(undefined);

interface ResultStatsProviderProps {
  children: ReactNode;
}

export const ResultStatsProvider: React.FC<ResultStatsProviderProps> = ({ children }) => {
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);

  const [resultStats, setResultStats] = useState<ResultStats>(resultStatsInit);

  useEffect(() => {
    if (!deepCompareStatArrays(resultStatsDefault, resultStats)) {
      setResultStats(resultStatsDefault);
    }
  }, [resultStatsDefault]);

  const toggleCheckResultStats = useCallback((name: string) => {
    toggleCheckList(setResultStats, name);
  }, []);

  const contextValue = useMemo<ResultStatsContextType>(
    () => ({
      resultStats,
      setResultStats,
      toggleCheckResultStats,
    }),
    [resultStats, toggleCheckResultStats]
  );

  return <ResultStatsContext.Provider value={contextValue}>{children}</ResultStatsContext.Provider>;
};

export const useResultStats = () => {
  return useContext(ResultStatsContext);
};
