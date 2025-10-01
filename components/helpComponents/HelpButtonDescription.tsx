import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import IconContainer from "@/primitiveComponents/IconContainer";
import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";

interface HelpButtonDescriptionProps {
  iconName: string;
  iconType: IconType;
  containerSize?: number;
  description: string;
}

const HelpButtonDescription = ({
  iconName,
  iconType,
  containerSize = BUTTON_SIZE,
  description,
}: HelpButtonDescriptionProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconContainer
          iconName={iconName}
          iconType={iconType}
          containerSize={containerSize}
          containerStyle={{ borderRadius: BORDER_RADIUS_INF }}
        />
      </View>

      <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
        <Text style={[styles.description, { color: theme.on_surface_variant }]}>{description}</Text>
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
  iconWrapper: { width: BUTTON_SIZE, alignItems: "center" },
  description: {
    fontSize: 14,
  },
});

export default HelpButtonDescription;
