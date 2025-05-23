import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { translate } from "@/translations/translations";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

const CustomHeader = ({ children, icon = "car-sports" }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface_container,
      height: 64,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      width: 48,
      height: 48,
      padding: 12,
      marginHorizontal: 4,
    },
    text: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
    }
  });

  function getIconType() {
    if (icon in MaterialCommunityIcons.glyphMap)
      return IconType.MaterialCommunityIcons;
    if (icon in MaterialIcons.glyphMap)
      return IconType.MaterialIcons;
  }

  return (
    <View
      style={styles.container}
    >
      <Icon
        type={getIconType(icon)}
        name={icon}
        size={24}
        color={theme.on_surface}
        style={styles.icon}
      />
      <Text style={styles.text}>
        {translate(children)}
      </Text>
    </View>
  );
};

export default CustomHeader;
