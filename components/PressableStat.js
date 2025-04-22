import React from "react";
import { Checkbox } from "react-native-paper";
import { useTheme } from "../utils/ThemeContext";
import { translate } from "../i18n/translations";

const PressableStat = ({ stat, toggleCheck }) => {
  const th = useTheme();
  return (
    <Checkbox.Item
      label={translate(stat.name)}
      status={stat.checked ? "checked" : "unchecked"}
      onPress={() => toggleCheck()}
    />
  );
};

export default PressableStat;
