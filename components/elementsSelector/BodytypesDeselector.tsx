import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import { Bodytype } from "@/data/bodytypes/bodytypeTypes";

// NOTE: Les constantes ITEM_WIDTH, ITEM_HEIGHT, NUM_COLUMNS, etc. de ElementsDeselector
// ne sont pas pertinentes ici car nous n'utilisons pas GridItem ni une grille complexe.
// Nous allons utiliser des styles plus simples pour les "pilules" de Bodytype.

interface BodytypesDeselectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const BodytypesDeselector: React.FC<BodytypesDeselectorProps> = ({ selectedBodytypes, setSelectedBodytypes }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  // Convertir le Set de Bodytype en tableau pour pouvoir le mapper
  const bodytypesToDisplay = useMemo(() => Array.from(selectedBodytypes), [selectedBodytypes]);

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
      backgroundColor: theme.secondary_container, // Couleur de fond des pilules
      borderColor: theme.secondary, // Bordure des pilules (pour indiquer qu'elles sont "sélectionnées" ici)
    }),
    [theme.secondary_container, theme.secondary]
  );

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
          {bodytypesToDisplay.map((bodytype) => (
            <Pressable
              key={bodytype} // Les Bodytype (ex: "light", "heavy") sont des chaînes uniques
              onPress={() => handleDeselectBodytype(bodytype)}
              style={StyleSheet.flatten([styles.bodytypeItem, itemBackgroundDynamicStyle])}
            >
              <Text style={StyleSheet.flatten([styles.bodytypeItemText, itemTextDynamicStyle])}>
                {translateToLanguage(bodytype, language)} {/* Traduire le nom du Bodytype */}
              </Text>
            </Pressable>
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // Pour un effet "pilule"
    borderWidth: 1, // Bordure pour chaque pilule
    justifyContent: "center",
    alignItems: "center",
    // minWidth: 80, // Peut être ajouté si tu veux une largeur minimale
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
});

export default memo(BodytypesDeselector);
