import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import HelpIconAndText from "./HelpIconAndText";

interface HelpFeatureItemProps {
  iconName: string;
  iconType: IconType;
  title: string;
  description: string;
  withBackground?: boolean;
}

const HelpFeatureItem = ({ iconName, iconType, title, description, withBackground = true }: HelpFeatureItemProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <HelpIconAndText
      icon={
        <View style={[styles.buttonIconContainer, { backgroundColor: theme.primary }]}>
          <Icon name={iconName} type={iconType} size={24} color={theme.on_primary} />
        </View>
      }
      title={title}
      description={description}
      withBackground={withBackground}
    />
  );
};
const styles = StyleSheet.create({
  buttonIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HelpFeatureItem;
