import React from "react";
import MyPicker from "../MyPicker";
import { useStatsVisibleListConfigStore, statsVisibleConfigList } from "@/stores/useStatsVisibleListConfigStore";

const StatsVisibleConfigSelector = () => {
  const statsVisibleConfig = useStatsVisibleListConfigStore((state) => state.statsVisibleConfig);
  const setStatsVisibleConfig = useStatsVisibleListConfigStore((state) => state.setStatsVisibleConfig);

  return (
    <MyPicker
      value={statsVisibleConfig}
      setValue={setStatsVisibleConfig}
      itemList={statsVisibleConfigList}
      pickerTitle="ConfigureDefaultVisibleStats?"
      isTranslatedContent={true}
    />
  );
};

export default StatsVisibleConfigSelector;
