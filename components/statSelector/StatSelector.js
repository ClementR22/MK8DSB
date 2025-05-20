import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { modal } from "../styles/modal";
import PressableStat from "./PressableStat";
import { useTheme } from "@/contexts/ThemeContext";
import SelectedAllStatsSwitch from "./SelectedAllStatsSwitch";
import { useScreen } from "@/contexts/ScreenContext";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";

const StatSelector = ({ statList, setStatList, toggleCheck, isVisibleStatsNotInSettingsScreen }) => {
  const { theme } = useTheme();
  const { screenName } = useScreen();
  const isSync = useStatsVisibleListConfigStore((state) => state.isSync);
  const isDefault = useStatsVisibleListConfigStore((state) => state.isDefault);

  const isInSearchScreen = screenName === "search";
  const isVisibleStatsInSearchScreen = isVisibleStatsNotInSettingsScreen && isInSearchScreen;
  const disablePressableStat = isVisibleStatsNotInSettingsScreen && (isSync || isDefault);

  return (
    <View style={styles.listContainer}>
      <View style={modal(theme).content}>
        <View style={styles.row}>
          {!disablePressableStat ? (
            <>
              <SelectedAllStatsSwitch statList={statList} setStatList={setStatList} />
            </>
          ) : (
            !isVisibleStatsInSearchScreen && <SelectedAllStatsSwitch statList={statList} setStatList={setStatList} />
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
      </View>
    </View>
  );
};

export default StatSelector;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  row: { flexDirection: "row", gap: 10 },
});
