import React from "react";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import Switch from "../Switch";

const StatsVisibleDefaultSwitch = () => {
  const isStatsVisibleDefault = useStatsVisibleListConfigStore((state) => state.isStatsVisibleDefault);
  const setIsStatsVisibleDefault = useStatsVisibleListConfigStore((state) => state.setIsStatsVisibleDefault);

  return (
    <Switch
      value={isStatsVisibleDefault}
      setValue={setIsStatsVisibleDefault}
      switchLabel="ConfigureDefaultDisplayedStats"
    />
  );
};

export default React.memo(StatsVisibleDefaultSwitch);
