import { Pressable, StyleSheet, Text } from "react-native";

import { button_icon } from "./styles/button";
import { shadow_3dp } from "./styles/light_theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const StatSliderResultSelectorPressable = ({
  setFoundedStatsModalVisible,
}) => {
  return (
    <Pressable
      style={[button_icon.container, shadow_3dp]}
      onPress={() => setFoundedStatsModalVisible(true)}
    >
      <MaterialCommunityIcons name="eye" size={24} color={"white"} />
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
