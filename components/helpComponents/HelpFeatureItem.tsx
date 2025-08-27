import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import IconContainer from "@/primitiveComponents/IconContainer";
import { useThemeStore } from "@/stores/useThemeStore";

interface HelpFeatureItemProps {
  iconName: string;
  iconType: IconType;
  containerSize?: number;
  title: string;
}

const HelpFeatureItem = ({ iconName, iconType, containerSize = 40, title }: HelpFeatureItemProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconContainer iconName={iconName} iconType={iconType} containerSize={containerSize} />
      </View>

      <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
        <Text style={[styles.title, { color: theme.on_surface_variant }]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  iconWrapper: { width: 40 },
  title: {
    fontSize: 14,
  },
});

export default HelpFeatureItem;
