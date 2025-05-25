import React from "react";
import { Checkbox } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useThemeStore } from "@/stores/useThemeStore";
import checkbox from "../styles/checkbox";

const PressableStat = ({ stat, toggleCheck }) => {
  const theme = useThemeStore((state) => state.theme);
  const { text, container } = checkbox(theme);

  return (
    <Checkbox.Item
      label={translate(stat.name)}
      status={stat.checked ? "checked" : "unchecked"}
      onPress={toggleCheck}
      labelStyle={text}
      style={container}
    />
  );
};

export default PressableStat;
