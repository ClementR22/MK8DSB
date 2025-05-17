import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { shadow_12dp, shadow_1dp, shadow_3dp, shadow_6dp, shadow_8dp } from "@/components/styles/theme";
import TooltipWrapper from "@/components/TooltipWrapper";

function Button({children, onPress, elevation, tooltipText, ...props}) {
  const {theme} = useTheme();

  const [buttonHover, setButtonHover] = useState(false);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: 40,
      minWidth: 100,
      borderRadius: 100,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.2s ease",
    },
    text: {
      fontWeight: "500",
      fontSize: 14,
      color: theme.on_primary,
    },
  });

  const handlePress = () => {
    onPress?.();
  };

  const getElevation = () => {
    if (!elevation) {
      return shadow_6dp;
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
      onPress={handlePress}
      style={[styles.container, buttonHover && getElevation()]}
      onHoverIn={() => setButtonHover(true)}
      onHoverOut={() => setButtonHover(false)}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </TooltipWrapper>
  );
}

export default Button;
