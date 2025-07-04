import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import PressableStat from "./PressableStat";
import SelectAllStatsSwitch from "./SelectAllStatsSwitch";
import ResultStatsSyncSwitch from "./ResultStatsSyncSwitch";

const StatSelector = ({
  statList,
  setStatList,
  statListBeforeAll,
  setStatListBeforeAll,
  statListBeforeSync,
  setStatListBeforeSync,
  toggleCheck,
  isResultStatsInSearchScreen = false,
  disabled = false,
}) => {
  const externalUpdateRef = useRef(false);

  return (
    <View style={{ height: 420 }}>
      <SelectAllStatsSwitch
        statList={statList}
        setStatList={setStatList}
        statListBeforeAll={statListBeforeAll}
        setStatListBeforeAll={setStatListBeforeAll}
        disabled={disabled}
        externalUpdateRef={externalUpdateRef}
      />

      {isResultStatsInSearchScreen && (
        <ResultStatsSyncSwitch
          statList={statList}
          setStatList={setStatList}
          statListBeforeSync={statListBeforeSync}
          setStatListBeforeSync={setStatListBeforeSync}
          externalUpdateRef={externalUpdateRef}
        />
      )}

      <ScrollView>
        {statList.map((stat) => (
          <PressableStat key={stat.name} stat={stat} toggleCheck={toggleCheck} disabled={disabled} />
        ))}
      </ScrollView>
    </View>
  );
};

export default StatSelector;
