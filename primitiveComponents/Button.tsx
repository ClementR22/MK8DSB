import React, { ReactNode, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";
import { box_shadow_z1, box_shadow_z2, box_shadow_z3, box_shadow_z5 } from "@/components/styles/theme";

type IconProps = {
  name: string;
  type: IconType;
};

interface ButtonProps {
  children: ReactNode;
  buttonColor?: string;
  buttonTextColor?: string;
  onPress: () => void;
  tooltipText?: string;
  iconProps?: IconProps;
  minWidth?: number;
  flex?: 1;
  disabled?: boolean;
  [key: string]: any;
}

const Button = ({
  children,
  buttonColor,
  buttonTextColor,
  onPress,
  tooltipText,
  iconProps,
  minWidth,
  flex,
  disabled = false,
  ...props
}: ButtonProps) => {
  const theme = useThemeStore((state) => state.theme);

  const containerStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles.container,
        {
          backgroundColor: disabled ? "grey" : buttonColor || theme.primary,
          paddingHorizontal: iconProps ? 15 : 10,
          minWidth: minWidth,
          flex: flex,
        },
      ]),
    [theme.primary, iconProps, minWidth, disabled]
  );

  const textStyle = useMemo(
    () => ({ color: buttonTextColor || theme.on_primary }),
    [buttonTextColor, theme.on_primary]
  );

  return (
    <ButtonBase
      onPress={onPress}
      tooltipText={tooltipText}
      containerStyle={containerStyle}
      {...props}
      disabled={disabled}
    >
      {iconProps && <Icon type={iconProps.type} name={iconProps.name} size={24} color={theme.on_primary} />}
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </ButtonBase>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: BUTTON_SIZE,
    borderRadius: BORDER_RADIUS_INF,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    boxShadow: box_shadow_z2,
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
  },
});

Button.displayName = "Button";

export default React.memo(Button);
