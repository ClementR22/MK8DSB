import React, { ReactNode, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";

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
  textStyle?: { key: string };

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
  ...props
}: ButtonProps) => {
  const theme = useThemeStore((state) => state.theme);

  const containerStyle = useMemo(
    () => ({
      backgroundColor: buttonColor || theme.primary,
      paddingHorizontal: iconProps ? 15 : 10,
      minWidth: minWidth,
    }),
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
      containerStyle={[styles.container, containerStyle]}
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
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    alignSelf: "stretch",
  },
  text: {
    fontWeight: "500",
    fontSize: 14,
  },
});

Button.displayName = "Button";

export default React.memo(Button);
