import React from "react";
import { ScrollView } from "react-native";
import PressableStat from "./PressableStat";
import SelectAllStatsSwitch from "./SelectAllStatsSwitch";

const StatSelector = ({ statList, setStatList, toggleCheck }) => {
  return (
    <>
      <SelectAllStatsSwitch statList={statList} setStatList={setStatList} />

      <ScrollView>
        {statList.map((stat) => (
          <PressableStat key={stat.name} stat={stat} toggleCheck={toggleCheck} />
        ))}
      </ScrollView>
    </>
  );
};

export default React.memo(StatSelector);
