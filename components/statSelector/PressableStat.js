import React, { useCallback } from "react";
import { Checkbox } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useThemeStore } from "@/stores/useThemeStore";
import checkbox from "../styles/checkbox";

const PressableStat = ({ stat, toggleCheck, disabled }) => {
  const theme = useThemeStore((state) => state.theme);
  const { text, container } = checkbox(theme);

  const toggleCheckWithName = useCallback(() => {
    toggleCheck(stat.name);
  }, [toggleCheck, stat.name]); // toggleCheck prop itself should be stable now

  return (
    <Checkbox.Item
      label={translate(stat.name)}
      status={stat.checked ? "checked" : "unchecked"}
      onPress={toggleCheckWithName}
      labelStyle={text}
      style={container}
      disabled={disabled}
    />
  );
};

export default React.memo(PressableStat);
