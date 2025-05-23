import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import PressableStat from "./PressableStat";
import SelectAllStatsSwitch from "./SelectAllStatsSwitch";
import { useScreen } from "@/contexts/ScreenContext";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";

const StatSelector = ({ statList, setStatList, toggleCheck, isVisibleStatsNotInSettingsScreen }) => {
  const { screenName } = useScreen();
  const statsVisibleConfig = useStatsVisibleListConfigStore((state) => state.statsVisibleConfig);
  const isDefault = statsVisibleConfig === "yes";
  const isSync = statsVisibleConfig === "sync";

  const isInSearchScreen = screenName === "search";
  const isVisibleStatsInSearchScreen = isVisibleStatsNotInSettingsScreen && isInSearchScreen;
  const disablePressableStat = isVisibleStatsNotInSettingsScreen && (isSync || isDefault);

  return (
    <>
      <View style={styles.row}>
        {!disablePressableStat ? (
          <>
            <SelectAllStatsSwitch statList={statList} setStatList={setStatList} />
          </>
        ) : (
          // si on est dans le cas des chosen stats, on met quand meme le switch
          !isVisibleStatsInSearchScreen && <SelectAllStatsSwitch statList={statList} setStatList={setStatList} />
        )}
      </View>

      <ScrollView>
        {statList.map((stat) => (
          <PressableStat
            key={stat.name}
            stat={stat}
            toggleCheck={() => {
              toggleCheck(stat.name);
            }}
            disabled={disablePressableStat}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default StatSelector;

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10 },
});
