import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/primitiveComponents/Text";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { box_shadow_z1 } from "./styles/shadow";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomHeaderProps {
  icon: string;
  title: string;
  helpComponent?: React.ReactElement;
}

function getIconType(icon: string) {
  if (icon in MaterialCommunityIcons.glyphMap) return IconType.MaterialCommunityIcons;
  if (icon in MaterialIcons.glyphMap) return IconType.MaterialIcons;
  return IconType.MaterialCommunityIcons; // fallback
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ icon, title, helpComponent }) => {
  const theme = useThemeStore((state) => state.theme);

  const iconType = getIconType(icon);

  const statusBarHeight = useSafeAreaInsets().top;

  return (
    <View style={[styles.container, { backgroundColor: theme.surface_container, paddingTop: statusBarHeight }]}>
      <Icon type={iconType} name={icon} size={24} color={theme.on_surface} style={styles.icon} />
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Text role="headline" size="large" namespace="screens">
          {title}
        </Text>
      </View>

      {helpComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingEnd: 15,
    boxShadow: box_shadow_z1,
  },
  icon: {
    width: 48,
    height: 48,
    padding: 12,
    marginRight: 4,
    marginLeft: 16,
  },
});

export default React.memo(CustomHeader);
