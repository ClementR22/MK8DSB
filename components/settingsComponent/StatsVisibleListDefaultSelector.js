import React, { useState } from "react";
import StatSelector from "../statSelector/StatSelector";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";

const StatsVisibleListDefaultSelector = () => {
  const statsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.statsVisibleListDefault);
  const setStatsVisibleListDefault = useStatsVisibleListConfigStore((state) => state.setStatsVisibleListDefault);
  const toggleCheckListStatsVisibleListDefault = useStatsVisibleListConfigStore(
    (state) => state.toggleCheckListStatsVisibleListDefault
  );

  const [statListBeforeAll, setStatListBeforeAll] = useState(null);

  return (
    <StatSelector
      statList={statsVisibleListDefault}
      setStatList={setStatsVisibleListDefault}
      toggleCheck={(name) => toggleCheckListStatsVisibleListDefault(name)}
      statListBeforeAll={statListBeforeAll}
      setStatListBeforeAll={setStatListBeforeAll}
    />
  );
};

export default StatsVisibleListDefaultSelector;
