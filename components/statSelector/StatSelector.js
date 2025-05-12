import React from "react";
import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import { modal } from "../styles/modal";
import PressableStat from "./PressableStat";
import { useTheme } from "@/contexts/ThemeContext";
import SelectedAllStatsSwitch from "./SelectedAllStatsSwitch";
import { useSetsList } from "@/contexts/SetsListContext";
import { translate } from "@/translations/translations";
import { useSettings } from "@/contexts/SettingsContext";
import { useScreen } from "@/contexts/ScreenContext";

const StatSelector = ({ statList, setStatList, toggleCheck, isVisibleStatsNotInSettingsScreen }) => {
  const { theme } = useTheme();
  const { screenName } = useScreen();
  const { isStatsVisibleDefault } = useSettings();
  const { syncWithChosenStats } = useSetsList();
  const { isAllwaysSync } = useSettings();

  const isInSearchScreen = screenName === "search";
  const isVisibleStatsInSearchScreen = isVisibleStatsNotInSettingsScreen && isInSearchScreen;
  const disablePressableStat = isVisibleStatsNotInSettingsScreen && (isAllwaysSync || isStatsVisibleDefault);

  return (
    <View style={styles.listContainer}>
      <View style={modal(theme).content}>
        <View style={styles.row}>
          {!(isAllwaysSync || isStatsVisibleDefault) ? (
            <>
              <SelectedAllStatsSwitch statList={statList} setStatList={setStatList} />
              {isVisibleStatsInSearchScreen ? (
                <Pressable onPress={() => syncWithChosenStats(setStatList)}>
                  <Text>{translate("Sync")}</Text>
                </Pressable>
              ) : null}
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
