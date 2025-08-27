import { useThemeStore } from "@/stores/useThemeStore";
import React, { ReactElement, useMemo } from "react";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { View } from "react-native";

interface HelpIconAndTextProps {
  icon: ReactElement;
  title: string;
  isFeature?: boolean;
  children?: React.ReactNode;
}

const HelpIconAndText = ({ icon, title, isFeature = false, children }: HelpIconAndTextProps) => {
  const theme = useThemeStore((state) => state.theme);

  const containerStyle = useMemo(() => {
    if (isFeature) {
      return { ...styles.container, alignSelf: "flex-start", alignItems: "center" } as ViewStyle;
    } else {
      return { ...styles.container, backgroundColor: theme.surface_container, padding: 12 } as ViewStyle;
    }
  }, [isFeature, theme.surface_container]);

  const titleStyle = useMemo(() => {
    if (isFeature) {
      return {
        fontSize: 14,
        color: theme.on_surface_variant,
      } as TextStyle;
    } else {
      return {
        fontWeight: "600",
        fontSize: 14,
        color: theme.on_surface,
      } as TextStyle;
    }
  }, [theme.on_surface]);

  console.log("children", children);

  return (
    <View style={containerStyle}>
      <View style={styles.iconWrapper}>{icon}</View>

      <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
        <Text style={titleStyle}>{title}</Text>

        {children && <View style={{ gap: 10 }}>{children}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    gap: 10,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconWrapper: { width: 40, alignItems: "center" },
});

export default HelpIconAndText;
