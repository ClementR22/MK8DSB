import { Pressable, StyleSheet, Text } from "react-native";

import { button_icon } from "./styles/button";
import th, { shadow_3dp } from "./styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const StatSliderResultSelectorPressable = ({
  setFoundedStatsModalVisible,
}) => {
  return (
    <Pressable
      style={[button_icon.container, shadow_3dp]}
      onPress={() => setFoundedStatsModalVisible(true)}
    >
      <MaterialCommunityIcons name="eye" size={24} color={th.on_primary} />
    </Pressable>
  );
};
