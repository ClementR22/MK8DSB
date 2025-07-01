import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import { Bodytype } from "@/data/bodytypes/bodytypeTypes";
import { bodytypesData } from "@/data/bodytypes/bodytypesData";
import { Image } from "react-native";
import BodytypeItem from "./BodytypeItem";

// NOTE: Les constantes ITEM_WIDTH, ITEM_HEIGHT, NUM_COLUMNS, etc. de ElementsDeselector
// ne sont pas pertinentes ici car nous n'utilisons pas ElementItem ni une grille complexe.
// Nous allons utiliser des styles plus simples pour les "pilules" de Bodytype.

interface BodytypesDeselectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const BodytypesDeselector: React.FC<BodytypesDeselectorProps> = ({ selectedBodytypes, setSelectedBodytypes }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  // Convertir le Set de Bodytype en tableau pour pouvoir le mapper
  const bodytypesToDisplay = useMemo(
    () => bodytypesData.filter((bodytype) => selectedBodytypes.has(bodytype.name)),
    [selectedBodytypes, bodytypesData]
  );

  // Gérer la désélection d'un Bodytype
  const handleDeselectBodytype = useCallback(
    (bodytype: Bodytype) => {
      setSelectedBodytypes((prev) => {
        const newSet = new Set(prev); // Important: créer une nouvelle instance du Set
        newSet.delete(bodytype); // Supprimer l'élément
        return newSet; // Retourner le nouveau Set pour que React détecte le changement
      });
    },
    [setSelectedBodytypes]
  );

  // Styles dynamiques basés sur le thème
  const deselectorContainerDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface, // Couleur de fond du conteneur global
      borderColor: theme.outline, // Bordure du conteneur global
    }),
    [theme.surface, theme.outline]
  );

  const titleTextDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const itemTextDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface_variant, // Couleur du texte des pilules
    }),
    [theme.on_surface_variant]
  );

  const itemBackgroundDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface_container_low, // Couleur de fond des pilules
    }),
    [theme.surface_container_low]
  );

  const activeBorderStyle = useMemo(() => [styles.activeBorder, { borderColor: theme.primary }], [theme.primary]);

  const noElementsTextDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface_variant,
    }),
    [theme.on_surface_variant]
  );

  return (
    <View style={StyleSheet.flatten([styles.deselectorContainer, deselectorContainerDynamicStyle])}>
      <Text style={StyleSheet.flatten([styles.deselectorTitle, titleTextDynamicStyle])}>
        {translateToLanguage("SelectedBodytypes", language)}
      </Text>

      {bodytypesToDisplay.length === 0 ? (
        <Text style={StyleSheet.flatten([styles.noElementsText, noElementsTextDynamicStyle])}>
          {translateToLanguage("None", language)}
        </Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bodytypesGrid}>
          {bodytypesToDisplay.map((bodytypeItem) => (
            <BodytypeItem
              bodytype={bodytypeItem}
              isSelected={true}
              onSelectBodytype={() => handleDeselectBodytype(bodytypeItem.name)}
              bodytypeCardDynamicStyle={StyleSheet.flatten([styles.bodytypeItem, itemBackgroundDynamicStyle])}
              activeBorderStyle={activeBorderStyle}
              size={40}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deselectorContainer: {
    // Style de base du conteneur global
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    marginTop: 5, // Ajoute un peu d'espace si nécessaire
  },
  deselectorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bodytypesGrid: {
    flexDirection: "row",
    gap: 8, // Espacement entre les pilules
    paddingVertical: 4, // Petit padding si besoin pour le scroll
  },
  bodytypeItem: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
  },
  bodytypeItemText: {
    fontSize: 14,
    fontWeight: "600",
  },
  noElementsText: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 10,
  },
  activeBorder: {
    borderWidth: 3,
    // You might want a different border color for items in the deselector to indicate they are "selected"
    // For example, make it a distinct 'deselected' color or a clear indicator.
  },
});

export default memo(BodytypesDeselector);
