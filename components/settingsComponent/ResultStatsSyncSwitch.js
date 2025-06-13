import React, { useRef } from "react";
import { useResultStatsConfigStore } from "@/stores/useResultStatsDefaultStore";
import Switch from "../../primitiveComponents/Switch";
import useSetsStore from "@/stores/useSetsStore";

const ResultStatsSyncSwitch = ({
  statList,
  setStatList,
  statListBeforeSync,
  setStatListBeforeSync,
  externalUpdateRef,
}) => {
  const isResultStatsSync = useResultStatsConfigStore((state) => state.isResultStatsSync);
  const setIsResultStatsSync = useResultStatsConfigStore((state) => state.setIsResultStatsSync);
  const chosenStats = useSetsStore((state) => state.chosenStats);

  const onToggleSwitch = () => {
    if (!isResultStatsSync) {
      // on entre dans le mode synchronisé
      setStatListBeforeSync(statList); // on mémorise l'état courant (B ou A)
      setStatList(chosenStats);
      setIsResultStatsSync(true);
    } else {
      // on quitte le mode synchronisé
      // on déclare que le changement vient de ResultStatsSyncSwitch, pour bloquer la MAJ de statListBeforeAll
      externalUpdateRef.current = true;
      setStatList(statListBeforeSync);
      setIsResultStatsSync(false);
    }
  };

  return <Switch value={isResultStatsSync} onToggleSwitch={onToggleSwitch} switchLabel="AlwaysSync" />;
};

export default React.memo(ResultStatsSyncSwitch);
