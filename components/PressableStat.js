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
import { imageSize } from "./PressableImage";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import checkbox from "./styles/checkbox";
import th from "./styles/theme";

const PressableStat = ({ stat, setList, toggleCheck, keepOneCondition }) => {
  return (
    <Pressable
      style={[
        checkbox.container,
        { backgroundColor: stat.checked ? "red" : "blue" },
      ]}
      onPress={() =>
        toggleCheck(setList, stat.name, (keepOneCondition = keepOneCondition))
      }
    >
      <Text style={checkbox.text}>{stat.name}</Text>
    </Pressable>
  );
};

export default PressableStat;
