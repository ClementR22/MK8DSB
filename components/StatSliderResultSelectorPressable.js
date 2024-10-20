import { Pressable, StyleSheet, Text } from "react-native";

import { button_icon_style } from "./_styles.js";

export const StatSliderResultSelectorPressable = ({
  setFoundedStatsModalVisible,
}) => {
  return (
    <Pressable
      style={button_icon_style.container}
      onPress={() => setFoundedStatsModalVisible(true)}
    >
      <Text style={button_icon_style.icon}>👁️</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
