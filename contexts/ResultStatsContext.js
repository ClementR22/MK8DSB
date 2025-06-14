import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toggleCheckList } from "@/utils/toggleCheck";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import { resultStatsInit } from "@/config/resultStatsInit";

const ResultStatsContext = createContext();

export const ResultStatsProvider = ({ children }) => {
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);
  const [resultStats, setResultStats] = useState(resultStatsInit);

  useEffect(() => {
    setResultStats(resultStatsDefault);
  }, [resultStatsDefault]);

  const toggleCheckResultStats = (name) => toggleCheckList(setResultStats, name);

  return (
    <ResultStatsContext.Provider
      value={{
        resultStats,
        setResultStats,
        toggleCheckResultStats,
      }}
    >
      {children}
    </ResultStatsContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useResultStats = () => {
  return useContext(ResultStatsContext);
};
