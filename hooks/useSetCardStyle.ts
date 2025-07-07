// hooks/useSetCardStyle.ts
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

export const SET_CARD_WIDTH = 220;
const SET_CARD_BORDER_WIDTH = 3;

export const useSetCardStyle = () => {
  const theme = useThemeStore((state) => state.theme);

  // Calcule le style de la carte une seule fois
  const setCardStyle = useMemo(() => {
    return StyleSheet.flatten([
      {
        // Styles de base communs à toutes les cartes
        width: SET_CARD_WIDTH,
        borderRadius: 12,
        borderWidth: SET_CARD_BORDER_WIDTH,
        padding: 10 - SET_CARD_BORDER_WIDTH,
        backgroundColor: theme.surface,
        borderColor: theme.surface_container_high,
      },
    ]);
  }, [theme.surface, theme.surface_container_high]); // Dépendances

  return {
    setCardStyle,
  };
};
