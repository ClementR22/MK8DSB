import React from "react";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import Switch from "../../primitiveComponents/Switch";

const StatsVisibleSyncSwitch = () => {
  const isStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.isStatsVisibleSync);
  const setIsStatsVisibleSync = useStatsVisibleListConfigStore((state) => state.setIsStatsVisibleSync);

  return <Switch value={isStatsVisibleSync} setValue={setIsStatsVisibleSync} switchLabel="AlwaysSync" />;
};

export default React.memo(StatsVisibleSyncSwitch);
