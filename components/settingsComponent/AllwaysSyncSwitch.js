import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useSettings } from "@/contexts/SettingsContext";

const AllwaysSyncSwitch = ({}) => {
  const { isAllwaysSync, setIsAllwaysSync } = useSettings();

  return (
    <View style={styles.switchContainer}>
      <Switch value={isAllwaysSync} onValueChange={() => setIsAllwaysSync(!isAllwaysSync)} />
      <Text>{translate("AllwaysSyncVisibilityOfFoundSetsStatsWithChosenStats")}</Text>
    </View>
  );
};

export default AllwaysSyncSwitch;

const styles = StyleSheet.create({
  switchContainer: { flexDirection: "row" },
});
