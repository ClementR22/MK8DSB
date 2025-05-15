import React from "react";
import StatSelector from "../statSelector/StatSelector";
import { useStatsVisibleListConfig } from "@/contexts/StatsVisibleListConfigContext";

const StatsVisibleListDefaultSelector = () => {
  const { statsVisibleListDefault, setStatsVisibleListDefault, toggleCheckListStatsVisibleListDefault } =
    useStatsVisibleListConfig();

  return (
    <StatSelector
      statList={statsVisibleListDefault}
      setStatList={setStatsVisibleListDefault}
      toggleCheck={(name) => toggleCheckListStatsVisibleListDefault(name)}
      isVisibleStatsNotInSettingsScreen={false}
    />
  );
};

export default StatsVisibleListDefaultSelector;
