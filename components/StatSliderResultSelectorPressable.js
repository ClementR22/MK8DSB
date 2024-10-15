import { Pressable, StyleSheet, Text } from "react-native";

export const StatSliderResultSelectorPressable = ({
  setFoundedStatsModalVisible,
}) => {
  return (
    <Pressable
      style={styles.pressable}
      onPress={() => setFoundedStatsModalVisible(true)}
    >
      <Text>👁️</Text>
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
