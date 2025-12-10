import { IconProps } from "@/types";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import IconContainer from "./IconContainer";
import useThemeStore from "@/stores/useThemeStore";
import Tooltip from "@/components/Tooltip";

interface ButtonSettingsProps {
  title: React.ReactNode;
  onPress?: () => void;
  iconProps: IconProps;
  tooltipText: string;
  disabled?: boolean;
}

const ButtonSettings: React.FC<ButtonSettingsProps> = ({
  title,
  onPress,
  iconProps,
  tooltipText,
  disabled = false,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Tooltip
      onPress={onPress}
      childStyleInner={[styles.container, { backgroundColor: theme.surface }]}
      tooltipText={tooltipText}
      disabled={disabled}
      top={10}
    >
      <IconContainer
        iconName={iconProps.name}
        iconType={iconProps.type}
        iconColor={theme.on_primary}
        backgroundColor={disabled ? "grey" : theme.primary}
        shape="square"
        containerSize={30}
      />
      <Text role="title" size="small" textAlign="center" namespace="button">
        {title}
      </Text>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: "red",
    alignSelf: "flex-start",
  },
});

export default ButtonSettings;
