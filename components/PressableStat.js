import React from "react";
import { Checkbox } from "react-native-paper";
import { translate } from "../i18n/translations";

const PressableStat = ({ stat, toggleCheck }) => {
  return (
    <Checkbox.Item
      label={translate(stat.name)}
      status={stat.checked ? "checked" : "unchecked"}
      onPress={() => toggleCheck()}
    />
  );
};

export default PressableStat;
