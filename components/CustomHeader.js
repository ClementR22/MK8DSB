import React from "react";
import { View } from "react-native";
import Text from "@/components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

const CustomHeader = ({ children, icon = "car-sports" }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.surface_container,
        height: 64,
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
        elevation: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon in MaterialCommunityIcons.glyphMap &&
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.on_surface}
          style={{ width: 48, height: 48, padding: 12, marginHorizontal: 4 }}
        />
      }
      {icon in MaterialIcons.glyphMap &&
        <MaterialIcons
          name={icon}
          size={24}
          color={theme.on_surface}
          style={{ width: 48, height: 48, padding: 12, marginHorizontal: 4 }}
        />
      }
      <Text style={{
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
      }}>
        {children}
      </Text>
    </View>
  );
};

export default CustomHeader;
