import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import PressableStat from "./PressableStat";
import SelectAllStatsSwitch from "./SelectAllStatsSwitch";
import StatsVisibleSyncSwitch from "../settingsComponent/StatsVisibleSyncSwitch";

const StatSelector = ({
  statList,
  setStatList,
  statListBeforeAll,
  setStatListBeforeAll,
  statListBeforeSync,
  setStatListBeforeSync,
  toggleCheck,
  isStatVisibleInSearchScreen = false,
  disabled = false,
}) => {
  const externalUpdateRef = useRef(false);

  return (
    <>
      <View style={{ gap: 8 }}>
        <SelectAllStatsSwitch
          statList={statList}
          setStatList={setStatList}
          statListBeforeAll={statListBeforeAll}
          setStatListBeforeAll={setStatListBeforeAll}
          disabled={disabled}
          externalUpdateRef={externalUpdateRef}
        />

        {isStatVisibleInSearchScreen && (
          <StatsVisibleSyncSwitch
            statList={statList}
            setStatList={setStatList}
            statListBeforeSync={statListBeforeSync}
            setStatListBeforeSync={setStatListBeforeSync}
            externalUpdateRef={externalUpdateRef}
          />
        )}
      </View>

      <ScrollView>
        {statList.map((stat) => (
          <PressableStat key={stat.name} stat={stat} toggleCheck={toggleCheck} disabled={disabled} />
        ))}
      </ScrollView>
    </>
  );
};

export default StatSelector;
