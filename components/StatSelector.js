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

const StatSelector = ({ statList, setStatList, keepOneCondition }) => {
  const th = useTheme();
  return (
    <View style={styles.listContainer}>
      <View style={modal(th).content}>
        <ScrollView>
          {statList.map((stat) => (
            <PressableStat
              key={stat.name}
              stat={stat}
              setStatList={setStatList}
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
