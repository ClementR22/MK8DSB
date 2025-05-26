import React, { useState } from "react";
import { PressableProps, StyleSheet } from "react-native";
import { shadow_12dp, shadow_1dp, shadow_3dp, shadow_6dp, shadow_8dp } from "@/components/styles/theme";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import TooltipWrapper from "@/components/TooltipWrapper";
import { useThemeStore } from "@/stores/useThemeStore";

type ButtonIconElevation = 1 | 3 | 6 | 8 | 12 | undefined;

interface ButtonIconProps extends Omit<PressableProps, "onPress" | "style" | "disabled"> {
  // La fonction à appeler lorsque le bouton est pressé. C'est une prop requise.
  onPress: () => void;
  // Le texte du tooltip qui s'affiche au survol/appui long. Optionnel.
  tooltipText?: string;
  // Le placement du tooltip
  toolTipPlacement?: string;
  // Le niveau d'élévation/ombre du bouton. Optionnel, utilise une valeur par défaut.
  elevation?: ButtonIconElevation;
  // Le nom de l'icône à afficher (par exemple, 'home', 'star'). Requis.
  iconName: string;
  // Le type ou la famille de l'icône (par exemple, 'FontAwesome', 'MaterialCommunityIcons'). Requis.
  iconType: IconType;
  // La taille de l'icône en pixels. Optionnel, par défaut à 24.
  iconSize?: number;
  // Indique si le bouton est désactivé. Optionnel, par défaut à false.
  disabled?: boolean;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  tooltipText,
  toolTipPlacement = "top",
  elevation,
  iconName,
  iconType,
  iconSize = 24,
  disabled = false,
  ...props
}) => {
  const theme = useThemeStore((state) => state.theme);
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
      // transition: "all 0.2s ease",
    },
  });

  const getElevation = () => {
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
  };

  return (
    <TooltipWrapper
      tooltipText={tooltipText}
      onPress={onPress}
      style={[styles.container, buttonHover && getElevation()]}
      onHoverIn={() => setButtonHover(true)}
      onHoverOut={() => setButtonHover(false)}
      {...props}
      disabled={disabled}
      placement={toolTipPlacement}
    >
      <Icon type={iconType} name={iconName} size={iconSize} color={theme.on_primary} />
    </TooltipWrapper>
  );
};

export default ButtonIcon;
