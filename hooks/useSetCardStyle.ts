// hooks/useSetCardStyle.ts
import { useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

const SET_CARD_BORDER_WIDTH = 3;

export const useSetCardStyle = (width?: number | string) => {
  const theme = useThemeStore((state) => state.theme);

  // Calcule le style de la carte une seule fois
  const setCardStyle = useMemo(() => {
    return StyleSheet.flatten([
      {
        // Styles de base communs à toutes les cartes
        width: width,
        borderRadius: 12,
        borderWidth: SET_CARD_BORDER_WIDTH,
        padding: 11 - SET_CARD_BORDER_WIDTH,
        backgroundColor: theme.surface,
        borderColor: theme.surface_container_high,
      },
    ]) as ViewStyle;
  }, [theme.surface, theme.surface_container_high]); // Dépendances

  return {
    setCardStyle,
  };
};
