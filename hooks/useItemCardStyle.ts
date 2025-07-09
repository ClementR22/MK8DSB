// hooks/useItemCardStyles.ts
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore"; // N'oublie pas d'importer useThemeStore

interface ItemCardStyleProps {
  size: number;
}

export const useItemCardStyle = ({ size }: ItemCardStyleProps) => {
  const theme = useThemeStore((state) => state.theme);

  // Calcule le style de la carte une seule fois
  const itemCardDynamicStyle = useMemo(() => {
    return StyleSheet.flatten([
      {
        // Styles de base communs à toutes les cartes
        borderRadius: size / 4,
        borderWidth: size / 20,
        borderColor: "transparent",
        overflow: "hidden",
        alignItems: "center",
        backgroundColor: theme.surface_container_low,
        width: size,
        height: size * 1.25,
      },
    ]);
  }, [theme.surface_container_low]); // Dépendances

  // Calcule le style de la bordure active une seule fois
  const activeBorderStyle = useMemo(() => [{ borderColor: theme.primary }], [theme.primary]);

  return {
    itemCardDynamicStyle,
    activeBorderStyle,
  };
};
