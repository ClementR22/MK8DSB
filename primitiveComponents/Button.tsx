import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import ButtonBase from "./ButtonBase";
import { BORDER_RADIUS_INF, BUTTON_SIZE } from "@/utils/designTokens";
import { box_shadow_z2 } from "@/components/styles/shadow";
import Text from "./Text";

export type IconProps = {
  name: string;
  type: IconType;
  color?: string;
};

interface ButtonProps {
  children: ReactNode;
  buttonColor?: string;
  buttonTextColor?: string;
  onPress: () => void;
  tooltipText?: string;
  iconProps?: IconProps;
  flex?: number;
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
  flex,
  disabled = false,
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ButtonBase
      onPress={onPress}
      tooltipText={tooltipText}
      containerStyleOuter={[
        styles.containerOuter,
        {
          backgroundColor: disabled ? "grey" : buttonColor || theme.primary,
          flex: flex,
        },
      ]}
      containerStyleInner={styles.containerInner}
      isButton={true}
      disabled={disabled}
    >
      {iconProps && (
        <Icon type={iconProps.type} name={iconProps.name} size={24} color={iconProps.color || theme.on_primary} />
      )}
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
  containerOuter: {
    height: BUTTON_SIZE,
    borderRadius: BORDER_RADIUS_INF,
    boxShadow: box_shadow_z2,
    minWidth: 100, // just for modal buttons
  },
  containerInner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    flex: 1,
    paddingHorizontal: 15, // just for the search button in HelpSearhBuildScreen
  },
});

Button.displayName = "Button";

export default React.memo(Button);
