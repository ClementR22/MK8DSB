import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

const CustomHeader = ({ title }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.surface_container,
        height: 64,
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
        elevation: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name="car-sports"
        size={24}
        color="#333"
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#333" }}>
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;
