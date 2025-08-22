import { useThemeStore } from "@/stores/useThemeStore";
import React, { ReactElement, useMemo } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { View } from "react-native";

interface HelpIconAndTextProps {
  icon: ReactElement;
  title: string;
  description: string;
  withBackground: boolean;
}

const HelpIconAndText = ({ icon, title, description, withBackground = true }: HelpIconAndTextProps) => {
  const theme = useThemeStore((state) => state.theme);

  const containerStyle = useMemo(
    () => [styles.container, withBackground && { backgroundColor: theme.surface_container, padding: 12 }],
    [withBackground, theme.surface_container]
  );

  const titleStyle = useMemo(
    () => ({ fontWeight: "600", fontSize: 14, color: theme.on_surface } as TextStyle),
    [theme.on_surface]
  );
  const descriptionStyle = useMemo(
    () => ({ fontSize: 13, color: theme.on_surface_variant }),
    [theme.on_surface_variant]
  );

  return (
    <View style={containerStyle}>
      {icon}

      <View style={styles.textWrapper}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={descriptionStyle}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 8,
  },
  textWrapper: { flex: 1, marginLeft: 10 },
});

export default HelpIconAndText;
