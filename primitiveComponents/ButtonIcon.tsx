import React from "react";
import { StyleSheet } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { useThemeStore } from "@/stores/useThemeStore";

interface ButtonIconProps {
  onPress: () => void;
  tooltipText?: string;
  toolTipPlacement?: string;
  elevation?: 1 | 3 | 6 | 8 | 12;
  iconName: string;
  iconType: IconType;
  iconSize?: number;
  [key: string]: any;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  tooltipText,
  toolTipPlacement = "top",
  elevation,
  iconName,
  iconType,
  iconSize = 24,
  ...props
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonBase
      onPress={onPress}
      tooltipText={tooltipText}
      placement={toolTipPlacement}
      elevation={elevation}
      containerStyle={[styles.container, { backgroundColor: theme.primary }]}
      {...props}
    >
      <Icon type={iconType} name={iconName} size={iconSize} color={theme.on_primary} />
    </ButtonBase>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(ButtonIcon);
