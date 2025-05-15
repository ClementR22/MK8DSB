import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { shadow_12dp, shadow_1dp, shadow_3dp, shadow_6dp, shadow_8dp } from "@/components/styles/theme";
import Icon from "react-native-dynamic-vector-icons";
import TooltipWrapper from "@/components/TooltipWrapper";

function ButtonIcon({
  children,
  onPress,
  tooltipText,
  elevation,
  iconName,
  iconType,
  iconSize = 24,
  ...props
}) {
  const { theme } = useTheme();

  const [buttonHover, setButtonHover] = useState(false);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: 40,
      width: 40,
      borderRadius: 100,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.2s ease",
    },
  });

  const getElevation = () => {
    if (!elevation) {
      StyleSheet.flatten(styles.container, shadow_6dp);
      return;
    }
    switch (elevation) {
      case 1:
        return shadow_1dp;
      case 3:
        return shadow_3dp;
      case 6:
        return shadow_6dp;
      case 8:
        return shadow_8dp;
      case 12:
        return shadow_12dp;
    }
  };

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      onPress={onPress}
      style={[styles.container, buttonHover && getElevation()]}
      onHoverIn={() => setButtonHover(true)}
      onHoverOut={() => setButtonHover(false)}
      {...props}
    >
      <Icon type={iconType} name={iconName} size={iconSize} color={theme.on_primary} />
    </TooltipWrapper>
  );
}

export default ButtonIcon;
