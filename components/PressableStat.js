import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import checkbox from "./styles/checkbox";
import { useTheme } from "./styles/theme";
import { translate } from "../i18n/translations";
import { toggleCheck } from "../utils/toggleCheck";

const PressableStat = ({ stat, setList, keepOneCondition }) => {
  const th = useTheme();
  return (
    <Pressable
      style={checkbox(th).container}
      onPress={() =>
        toggleCheck(setList, stat.name, (keepOneCondition = keepOneCondition))
      }
    >
      <Checkbox
        value={stat.checked}
        style={checkbox(th).square}
        color={{ true: th.primary, false: th.on_primary }}
      />
      <Text style={checkbox(th).text}>{translate(stat.name)}</Text>
    </Pressable>
  );
};

export default PressableStat;
