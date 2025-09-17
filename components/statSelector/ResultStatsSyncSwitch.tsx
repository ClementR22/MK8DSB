import React, { useCallback, useEffect } from "react";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import Switch from "../../primitiveComponents/Switch";
import { ResultStats } from "@/contexts/ResultStatsContext";
import { ChosenStat } from "@/stores/useSetsStore";

interface ResultStatsSyncSwitchProps {
  resultStats: ResultStats;
  setResultStats: (newStatList: ResultStats) => void;
  resultStatsBeforeSync: ResultStats;
  setResultStatsBeforeSync: (newStatList: ResultStats) => void;
  chosenStats: ChosenStat[];
}

const ResultStatsSyncSwitch: React.FC<ResultStatsSyncSwitchProps> = ({
  resultStats,
  setResultStats,
  resultStatsBeforeSync,
  setResultStatsBeforeSync,
  chosenStats,
}) => {
  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);
  const setIsResultStatsSync = useResultStatsDefaultStore((state) => state.setIsResultStatsSync);

  // Synchronisation des stats avec les stats choisies
  const syncStats = useCallback(() => {
    setResultStats(chosenStats);
  }, [chosenStats]);

  // Gestion du toggle du switch
  const handleToggleSwitch = useCallback(() => {
    if (!isResultStatsSync) {
      // Activation du mode synchronisé
      setResultStatsBeforeSync(resultStats);
      syncStats();
      setIsResultStatsSync(true);
    } else {
      // Désactivation du mode synchronisé
      setResultStats(resultStatsBeforeSync);
      setIsResultStatsSync(false);
    }
  }, [
    isResultStatsSync,
    resultStats,
    resultStatsBeforeSync,
    syncStats,
    setResultStatsBeforeSync,
    setResultStats,
    setIsResultStatsSync,
  ]);

  // Auto-sync quand les chosenStats changent et que le mode sync est actif
  useEffect(() => {
    if (isResultStatsSync) {
      syncStats();
    }
  }, [chosenStats, isResultStatsSync]);

  return <Switch value={isResultStatsSync} onToggleSwitch={handleToggleSwitch} switchLabel="MatchDesiredStats" />;
};

export default React.memo(ResultStatsSyncSwitch);
