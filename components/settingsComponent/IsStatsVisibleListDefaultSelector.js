import React from "react";
import StatSelector from "../statSelector/StatSelector";
import { useSettings } from "@/contexts/SettingsContext";

const IsStatsVisibleListDefaultSelector = () => {
  const { isStatsVisibleListDefault, setIsStatsVisibleListDefault, toggleCheckListIsStatsVisibleListDefault } =
    useSettings();

  return (
    <StatSelector
      statList={isStatsVisibleListDefault}
      setStatList={setIsStatsVisibleListDefault}
      toggleCheck={(name) => toggleCheckListIsStatsVisibleListDefault(name)}
      isVisibleStatsNotInSettingsScreen={false}
    />
  );
};

export default IsStatsVisibleListDefaultSelector;
