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

const ModalContent = ({
  isFoundStatsVisible,
  setIsFoundStatsVisible,
  toggleCheck,
  keepOneCondition,
}) => {
  return (
    <View
      style={[modal.content, styles.listContainer, { backgroundColor: "red" }]}
    >
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
  );
};

export default ModalContent;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});
