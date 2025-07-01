import React, { useCallback } from "react";
import { Checkbox } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useThemeStore } from "@/stores/useThemeStore";
import { StyleSheet } from "react-native";

const PressableStat = ({ stat, toggleCheck, disabled }) => {
  const theme = useThemeStore((state) => state.theme);

  const toggleCheckWithName = useCallback(() => {
    toggleCheck(stat.name);
  }, [toggleCheck, stat.name]); // toggleCheck prop itself should be stable now

  return (
    <Checkbox.Item
      label={translate(stat.name)}
      status={stat.checked ? "checked" : "unchecked"}
      onPress={toggleCheckWithName}
      labelStyle={[styles.text, { color: theme.on_surface }]}
      style={styles.container}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default React.memo(PressableStat);
