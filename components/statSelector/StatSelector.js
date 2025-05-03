import React from "react";
import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import { modal } from "../styles/modal";
import PressableStat from "./PressableStat";
import { useTheme } from "../../utils/ThemeContext";
import SelectedAllStatsSwitch from "./SelectedAllStatsSwitch";
import { useSetsList } from "../../utils/SetsListContext";
import { translate } from "../../i18n/translations";

const StatSelector = ({
  statList,
  setStatList,
  toggleCheck,
  isSyncWithChosenStatsPressable = false,
}) => {
  const { theme } = useTheme();

  const { syncWithChosenStats } = useSetsList();

  return (
    <View style={styles.listContainer}>
      <View style={modal(theme).content}>
        <View style={styles.row}>
          <SelectedAllStatsSwitch
            statList={statList}
            setStatList={setStatList}
          />
          {isSyncWithChosenStatsPressable && (
            <Pressable onPress={() => syncWithChosenStats(setStatList)}>
              <Text>{translate("Sync")}</Text>
            </Pressable>
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
