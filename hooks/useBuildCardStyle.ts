// hooks/useBuildCardStyle.ts
import { useMemo } from "react";
import { DimensionValue, StyleSheet, ViewStyle } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import { BORDER_RADIUS_STANDARD, PADDING_BUILD_CARD } from "@/utils/designTokens";
import { box_shadow_z1 } from "@/components/styles/shadow";

const BUILD_CARD_BORDER_WIDTH = 3;

export const useBuildCardStyle = (width?: DimensionValue) => {
  const theme = useThemeStore((state) => state.theme);

  // Calcule le style de la carte une seule fois
  const buildCardStyle = useMemo(() => {
    return StyleSheet.flatten([
      {
        // Styles de base communs à toutes les cartes
        width: width,
        borderRadius: BORDER_RADIUS_STANDARD,
        borderWidth: BUILD_CARD_BORDER_WIDTH,
        padding: PADDING_BUILD_CARD - BUILD_CARD_BORDER_WIDTH,
        backgroundColor: theme.surface,
        borderColor: theme.surface,
        boxShadow: box_shadow_z1,
      },
    ]) as ViewStyle;
  }, [theme.surface, theme.surface_container_high]); // Dépendances

  return {
    buildCardStyle,
  };
};
