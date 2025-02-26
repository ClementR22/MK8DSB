import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import { Checkbox } from "react-native-paper";
import { useTheme } from "../utils/ThemeContext";
import { translate } from "../i18n/translations";
import { toggleCheck } from "../utils/toggleCheck";

const PressableStat = ({ stat, setStatList, keepOneCondition }) => {
  const th = useTheme();
  return (
    <Checkbox.Item
      label={translate(stat.name)}
      status={stat.checked ? "checked" : "unchecked"}
      onPress={() => {
        toggleCheck(
          setStatList,
          stat.name,
          (keepOneCondition = keepOneCondition)
        );
      }}
    />
  );
};

export default PressableStat;
