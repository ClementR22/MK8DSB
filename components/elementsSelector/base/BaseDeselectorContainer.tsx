// components/common/BaseDeselectorContainer.tsx
import React, { memo, useMemo, ReactNode } from "react";
import { View, StyleSheet, Text, ScrollViewProps } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import { ScrollView } from "react-native";

interface BaseDeselectorContainerProps {
  titleKey: string; // Clé de traduction pour le titre (ex: "SelectedElements", "SelectedBodytypes")
  isEmpty: boolean; // Indique si la liste d'éléments est vide
  children: ReactNode; // Le contenu à afficher (la ScrollView avec les items)
}

const BaseDeselectorContainer: React.FC<BaseDeselectorContainerProps> = ({ titleKey, isEmpty, children }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  // Styles dynamiques pour le conteneur et le texte
  const deselectorContainerDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface,
      borderColor: theme.outline,
    }),
    [theme.surface, theme.outline]
  );

  const titleTextDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
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
        {translateToLanguage(titleKey, language)}
      </Text>

      {isEmpty ? (
        <Text style={StyleSheet.flatten([styles.noElementsText, noElementsTextDynamicStyle])}>
          {translateToLanguage("None", language)}
        </Text>
      ) : (
        // Les enfants sont la ScrollView avec les items spécifiques (ElementItem ou BodytypeItem)
        // Note: Tu peux ajuster la ScrollViewProps. L'important est que le contenu soit horizontal.

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row", gap: 8, paddingHorizontal: 4, paddingVertical: 4 }}
        >
          {children}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deselectorContainer: {
    borderRadius: 12,
    borderWidth: 1,
  },
  deselectorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 2,
  },
  noElementsText: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 10,
  },
  // Les styles pour la grille (flexDirection, gap) seront gérés par le parent
  // dans contentContainerStyle
});

export default memo(BaseDeselectorContainer);
