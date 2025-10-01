import React, { ReactNode, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";

type IconProps = {
  name: string;
  type: IconType;
};

interface ButtonProps {
  children: ReactNode;
  buttonColor?: string;
  buttonTextColor?: string;
  onPress: () => void;
  elevation?: 1 | 3 | 6 | 8 | 12;
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
  elevation,
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
        disabled && { backgroundColor: "grey" },
        {
          backgroundColor: buttonColor || theme.primary,
          paddingHorizontal: iconProps ? 15 : 10,
          minWidth: minWidth,
          flex: flex,
        },
      ]),
    [theme.primary, iconProps, minWidth]
  );

  const textStyle = useMemo(
    () => ({ color: buttonTextColor || theme.on_primary }),
    [buttonTextColor, theme.on_primary]
  );

  return (
    <ButtonBase
      onPress={onPress}
      tooltipText={tooltipText}
      elevation={elevation}
      containerStyle={containerStyle}
      {...props}
    >
      <>
        {iconProps && <Icon type={iconProps.type} name={iconProps.name} size={24} color={theme.on_primary} />}
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </>
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
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
  },
});

Button.displayName = "Button";

export default React.memo(Button);
