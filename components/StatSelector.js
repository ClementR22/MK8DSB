import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import checkbox from "./styles/checkbox";
import PressableStat from "./PressableStat";
import { useTheme } from "../utils/ThemeContext";

const StatSelector = ({ statList, toggleCheck }) => {
  const th = useTheme();
  return (
    <View style={styles.listContainer}>
      <View style={modal(th).content}>
        <ScrollView>
          {statList.map((stat) => (
            <PressableStat
              key={stat.name}
              stat={stat}
              toggleCheck={() => toggleCheck(stat.name)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default StatSelector;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});
