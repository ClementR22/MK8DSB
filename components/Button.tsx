import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { shadow_12dp, shadow_1dp, shadow_3dp, shadow_6dp, shadow_8dp } from "@/components/styles/theme";
import { ShadowProp } from "@/components/styles/theme.d";
import TooltipWrapper from "@/components/TooltipWrapper";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon from "react-native-dynamic-vector-icons";

function Button({
  children,
  onPress,
  elevation = undefined, // option
  tooltipText, // option
  icon = undefined, // option
  minWidth = undefined, //option
  ...props
}) {
  const theme = useThemeStore((state) => state.theme);
  const [buttonHover, setButtonHover] = useState(false);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      height: 40,
      // minWidth: 100, remplacé par
      paddingHorizontal: icon ? 15 : 10,
      borderRadius: 100,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      // @ts-ignore
      transition: "all 0.2s ease",
      gap: 5,
      alignSelf: "center", // permet d'adapter la taille au contenu et non au parent
    },
    text: {
      fontWeight: "500",
      fontSize: 14,
      color: theme.on_primary,
    },
  });

  function getElevation(): ShadowProp {
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
      default:
        return shadow_6dp;
    }
  }

  const sharedProps = {
    onPress,
    style: [styles.container, buttonHover && getElevation(), { minWidth }],
    onHoverIn: () => setButtonHover(true),
    onHoverOut: () => setButtonHover(false),
    ...props,
  };

  const content = (
    <>
      {icon && <Icon type={icon.type} name={icon.name} size={24} color={theme.on_primary} />}
      <Text style={styles.text}>{children}</Text>
    </>
  );
  if (tooltipText) {
    return (
      <TooltipWrapper tooltipText={tooltipText} {...sharedProps}>
        {content}
      </TooltipWrapper>
    );
  } else {
    return <Pressable {...sharedProps}>{content}</Pressable>;
  }
}

export default Button;
