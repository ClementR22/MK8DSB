import React from "react";
import { ScrollView, View } from "react-native";
import PressableStat from "./PressableStat";
import SelectAllStatsSwitch from "./SelectAllStatsSwitch";
import StatsVisibleSyncSwitch from "../settingsComponent/StatsVisibleSyncSwitch";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";

const StatSelector = ({
  statList,
  setStatList,
  toggleCheck,
  isStatVisibleInSearchScreen = false,
  disabled = false,
}) => {
  return (
    <>
      <View style={{ gap: 8 }}>
        <SelectAllStatsSwitch statList={statList} setStatList={setStatList} />

        {isStatVisibleInSearchScreen && <StatsVisibleSyncSwitch />}
      </View>

      <ScrollView>
        {statList.map((stat) => (
          <PressableStat key={stat.name} stat={stat} toggleCheck={toggleCheck} disabled={disabled} />
        ))}
      </ScrollView>
    </>
  );
};

export default React.memo(StatSelector);
