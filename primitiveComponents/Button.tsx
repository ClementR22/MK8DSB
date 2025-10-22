import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";
import { box_shadow_z2 } from "@/components/styles/shadow";
import Text from "./Text";

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

const Button: React.FC<ButtonProps> = ({
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
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonBase
      onPress={onPress}
      tooltipText={tooltipText}
      containerStyle={[
        styles.container,
        {
          backgroundColor: disabled ? "grey" : buttonColor || theme.primary,
          paddingHorizontal: iconProps ? 15 : 10,
          minWidth: minWidth,
          flex: flex,
        },
      ]}
      {...props}
      disabled={disabled}
    >
      {iconProps && <Icon type={iconProps.type} name={iconProps.name} size={24} color={theme.on_primary} />}
      <Text
        role="title"
        size="small"
        weight="semibold"
        textAlign="center"
        color={buttonTextColor}
        inverse
        namespace="button"
      >
        {children}
      </Text>
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
});

Button.displayName = "Button";

export default React.memo(Button);
