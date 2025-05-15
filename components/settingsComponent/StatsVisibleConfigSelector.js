import React from "react";
import MyPicker from "../MyPicker";
import { useStatsVisibleListConfig, statsVisibleConfigList } from "@/contexts/StatsVisibleListConfigContext";

const StatsVisibleConfigSelector = () => {
  const { statsVisibleConfig, setStatsVisibleConfig } = useStatsVisibleListConfig();

  return (
    <MyPicker
      value={statsVisibleConfig}
      setValue={setStatsVisibleConfig}
      itemList={statsVisibleConfigList}
      isTranslateLabel={false}
    />
  );
};

export default StatsVisibleConfigSelector;
