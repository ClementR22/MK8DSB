import React, { memo, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import { ScrollView } from "react-native";
import { ElementItem } from "@/data/elements/elementsTypes";
import { BodytypeItem } from "@/data/bodytypes/bodytypeTypes";
import { useItemCardStyle } from "@/hooks/useItemCardStyle";
import ItemCard from "../ItemCard";

interface BaseDeselectorProps {
  titleKey: string; // Clé de traduction pour le titre (ex: "SelectedElements", "SelectedBodytypes")
  isEmpty: boolean; // Indique si la liste d'éléments est vide
  itemsToDisplay: ElementItem[] | BodytypeItem[]; // Le contenu à afficher (la ScrollView avec les items)
  handleDeselect: (item: ElementItem | BodytypeItem) => void;
}

const BaseDeselector: React.FC<BaseDeselectorProps> = ({ titleKey, isEmpty, itemsToDisplay, handleDeselect }) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      // besoin d'un delai pour prendre en compte la nouvelle taille de SetCardContainer
      scrollViewRef?.current?.scrollToEnd();
    }, 50);
  }, [itemsToDisplay]);

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

  const noItemsTextDynamicStyle = useMemo(
    () => ({
      color: theme.on_surface_variant,
    }),
    [theme.on_surface_variant]
  );

  const { itemCardDynamicStyle, activeBorderStyle } = useItemCardStyle({ size: 40 }); // Passe la taille commune ici

  return (
    <View style={StyleSheet.flatten([styles.deselectorContainer, deselectorContainerDynamicStyle])}>
      <Text style={StyleSheet.flatten([styles.deselectorTitle, titleTextDynamicStyle])}>
        {translateToLanguage(titleKey, language)}
      </Text>

      {isEmpty ? (
        <Text style={StyleSheet.flatten([styles.noItemsText, noItemsTextDynamicStyle])}>
          {translateToLanguage("None", language)}
        </Text>
      ) : (
        // Les enfants sont la ScrollView avec les items spécifiques (ElementItem ou BodytypeItem)
        // Note: Tu peux ajuster la ScrollViewProps. L'important est que le contenu soit horizontal.

        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row", gap: 8, paddingHorizontal: 4, paddingVertical: 4 }}
        >
          {itemsToDisplay.map((item) => (
            <ItemCard
              key={item.name}
              imageUrl={item.imageUrl}
              name={item.name}
              isSelected={true}
              onPress={() => handleDeselect(item)}
              itemCardDynamicStyle={itemCardDynamicStyle}
              activeBorderStyle={activeBorderStyle}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deselectorContainer: {
    borderRadius: 12,
  },
  deselectorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 2,
  },
  noItemsText: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 10,
  },
});

export default memo(BaseDeselector);
