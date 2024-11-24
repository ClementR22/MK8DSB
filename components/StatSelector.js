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
import PressableStat from "./PressableStat";

const StatSelector = ({
  isFoundStatsVisible,
  setIsFoundStatsVisible,
  toggleCheck,
  keepOneCondition,
}) => {
  return (
    <View style={styles.listContainer}>
      <View style={[modal.content]}>
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
