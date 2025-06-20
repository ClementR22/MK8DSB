import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toggleCheckList } from "@/utils/toggleCheck";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { resultStatsInit } from "@/config/resultStatsInit";
import { deepCompareStatArrays } from "@/utils/deepCompare";

const ResultStatsContext = createContext();

export const ResultStatsProvider = ({ children }) => {
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);
  const [resultStats, setResultStats] = useState(resultStatsInit);

  useEffect(() => {
    if (!deepCompareStatArrays(resultStatsDefault, resultStats)) {
      setResultStats(resultStatsDefault);
    }
  }, [resultStatsDefault]);

  const toggleCheckResultStats = useCallback((name) => {
    toggleCheckList(setResultStats, name);
  }, []);

  const contextValue = useMemo(
    () => ({
      resultStats,
      setResultStats,
      toggleCheckResultStats,
    }),
    [resultStats, toggleCheckResultStats] // Dependencies: `resultStats` (state) and `toggleCheckResultStats` (memoized)
  );

  return <ResultStatsContext.Provider value={contextValue}>{children}</ResultStatsContext.Provider>;
};

// Hook pour utiliser le contexte
export const useResultStats = () => {
  return useContext(ResultStatsContext);
};
