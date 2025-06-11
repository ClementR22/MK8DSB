import React, { useRef } from "react";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import Switch from "../../primitiveComponents/Switch";
import useSetsStore from "@/stores/useSetsStore";

const StatsVisibleSyncSwitch = ({
  statList,
  setStatList,
  statListBeforeSync,
  setStatListBeforeSync,
  externalUpdateRef,
}) => {
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);
  const setIsStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.setIsStatsVisibleSync);
  const chosenStats = useSetsStore((state) => state.chosenStats);

  const onToggleSwitch = () => {
    if (!isStatsVisibleSync) {
      // on entre dans le mode synchronisé
      setStatListBeforeSync(statList); // on mémorise l'état courant (B ou A)
      setStatList(chosenStats);
      setIsStatsVisibleSync(true);
    } else {
      // on quitte le mode synchronisé
      // on déclare que le changement vient de StatsVisibleSyncSwitch, pour bloquer la MAJ de statListBeforeAll
      externalUpdateRef.current = true;
      setStatList(statListBeforeSync);
      setIsStatsVisibleSync(false);
    }
  };

  return <Switch value={isStatsVisibleSync} onToggleSwitch={onToggleSwitch} switchLabel="AlwaysSync" />;
};

export default React.memo(StatsVisibleSyncSwitch);
