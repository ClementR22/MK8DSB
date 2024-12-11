import { Pressable, StyleSheet, Text } from "react-native";

import { button_icon } from "../styles/button";
import { useTheme, shadow_3dp } from "../styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StatSliderResultSelectorPressable = ({ setFoundedStatsModalVisible }) => {
  const th = useTheme();
  return (
    <Pressable
      style={[button_icon(th).container, shadow_3dp]}
      onPress={() => setFoundedStatsModalVisible(true)}
    >
      <MaterialCommunityIcons
        name="checkbox-multiple-marked"
        size={24}
        color={th.on_primary}
      />
    </Pressable>
  );
};

export default StatSliderResultSelectorPressable;
