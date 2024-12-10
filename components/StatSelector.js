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
import PressableStat from "./PressableStat";
import { useTheme } from "./styles/theme";

const StatSelector = ({
  isFoundStatsVisible,
  setIsFoundStatsVisible,
  toggleCheck,
  keepOneCondition,
}) => {
  const th = useTheme();
  return (
    <View style={styles.listContainer}>
      <View style={modal(th).content}>
        <ScrollView>
          {isFoundStatsVisible.map((stat) => (
            <PressableStat
              key={stat.name}
              stat={stat}
              setList={setIsFoundStatsVisible}
              toggleCheck={toggleCheck}
              keepOneCondition={keepOneCondition}
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
