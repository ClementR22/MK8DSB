import React, { useRef } from "react";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import Switch from "../../primitiveComponents/Switch";
import useSetsStore from "@/stores/useSetsStore";
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

  const onToggleSwitch = () => {
    if (!isResultStatsSync) {
      // on entre dans le mode synchronisé
      setResultStatsBeforeSync(resultStats); // on mémorise l'état courant (B ou A)

      setResultStats(chosenStats);
      setIsResultStatsSync(true);
    } else {
      // on quitte le mode synchronisé
      // on déclare que le changement vient de ResultStatsSyncSwitch, pour bloquer la MAJ de statListBeforeAll
      setResultStats(resultStatsBeforeSync);
      setIsResultStatsSync(false);
    }
  };

  return <Switch value={isResultStatsSync} onToggleSwitch={onToggleSwitch} switchLabel="MatchDesiredStats" />;
};

export default React.memo(ResultStatsSyncSwitch);
