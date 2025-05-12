import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useSettings } from "@/contexts/SettingsContext";

const IsStatsVisibleDefaultSwitch = () => {
  const { isStatsVisibleDefault, setIsStatsVisibleDefault } = useSettings();

  return (
    <View style={styles.switchContainer}>
      <Switch value={isStatsVisibleDefault} onValueChange={() => setIsStatsVisibleDefault(!isStatsVisibleDefault)} />
      <Text>{translate("SetVisibleStatsByDefault")}</Text>
    </View>
  );
};

export default IsStatsVisibleDefaultSwitch;

const styles = StyleSheet.create({
  switchContainer: { flexDirection: "row" },
});
