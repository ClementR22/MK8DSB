import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, Pressable, View, PressableProps } from "react-native";
import { shadow_12dp, shadow_1dp, shadow_3dp, shadow_6dp, shadow_8dp } from "@/components/styles/theme";
import { ShadowProp } from "@/components/styles/theme.d";
import TooltipWrapper from "@/components/TooltipWrapper";
import { useThemeStore } from "@/stores/useThemeStore";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

// Type pour l'icône
type IconProps = {
  name: string;
  type: IconType; // par exemple "MaterialIcons"
};

// Props du composant
interface ButtonProps extends PressableProps {
  children: ReactNode;
  onPress: () => void;
  elevation?: 1 | 3 | 6 | 8 | 12;
  tooltipText?: string;
  iconProps?: IconProps;
  minWidth?: number;
}

function Button({
  children,
  onPress,
  elevation = undefined, // option
  tooltipText = undefined, // option
  iconProps = undefined, // option
  minWidth = undefined, //option
  ...props
}: ButtonProps) {
  const theme = useThemeStore((state) => state.theme);
  const [buttonHover, setButtonHover] = useState(false);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      height: 40,
      // minWidth: 100, remplacé par
      paddingHorizontal: iconProps ? 15 : 10,
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
      {iconProps && <Icon type={iconProps.type} name={iconProps.name} size={24} color={theme.on_primary} />}
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
