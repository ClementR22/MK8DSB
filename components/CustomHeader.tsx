import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/primitiveComponents/Text";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { box_shadow_z1 } from "./styles/theme";

interface CustomHeaderProps {
  icon: string;
  helpComponent: React.ReactElement;
  children: React.ReactNode;
}

function getIconType(icon: string) {
  if (icon in MaterialCommunityIcons.glyphMap) return IconType.MaterialCommunityIcons;
  if (icon in MaterialIcons.glyphMap) return IconType.MaterialIcons;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children, icon, helpComponent }) => {
  const theme = useThemeStore((state) => state.theme);

  const iconType = useMemo(() => getIconType(icon), [icon]);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface_container }]}>
      <Icon type={iconType} name={icon} size={24} color={theme.on_surface} style={styles.icon} />
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Text style={styles.text}>{children}</Text>
      </View>

      {helpComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingEnd: 15,
    boxShadow: box_shadow_z1,
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
  },
});

export default React.memo(CustomHeader);
