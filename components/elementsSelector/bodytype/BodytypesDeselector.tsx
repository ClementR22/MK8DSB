// components/elementsSelector/BodytypesDeselector.tsx
import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore"; // Garde l'import si utilisé localement
import { translateToLanguage } from "@/translations/translations";
import { Bodytype } from "@/data/bodytypes/bodytypeTypes";
import { bodytypesData } from "@/data/bodytypes/bodytypesData";
import { Image } from "react-native"; // Si BodytypeItem utilise Image
import BodytypeItem from "./BodytypeItem"; // Assurez-vous que c'est le bon BodytypeItem factorisé
import BaseDeselectorContainer from "../base/BaseDeselectorContainer"; // Nouveau chemin d'importation

interface BodytypesDeselectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const BodytypesDeselector: React.FC<BodytypesDeselectorProps> = ({ selectedBodytypes, setSelectedBodytypes }) => {
  const theme = useThemeStore((state) => state.theme);
  // const language = useLanguageStore((state) => state.language); // Langage est géré par BaseDeselectorContainer

  const bodytypesToDisplay = useMemo(
    () => bodytypesData.filter((bodytype) => selectedBodytypes.has(bodytype.name)),
    [selectedBodytypes, bodytypesData]
  );

  const handleDeselectBodytype = useCallback(
    (bodytype: Bodytype) => {
      setSelectedBodytypes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(bodytype);
        return newSet;
      });
    },
    [setSelectedBodytypes]
  );

  // Styles dynamiques passés à BodytypeItem
  const itemBackgroundDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface_container_low,
    }),
    [theme.surface_container_low]
  );

  const activeBorderStyle = useMemo(() => [styles.activeBorder, { borderColor: theme.primary }], [theme.primary]);

  return (
    <BaseDeselectorContainer
      titleKey="SelectedBodytypes"
      isEmpty={bodytypesToDisplay.length === 0}
      contentContainerStyle={styles.bodytypesGrid} // Passe ce style au conteneur de BaseDeselectorContainer
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row", gap: 8 }}
      >
        {bodytypesToDisplay.map((bodytypeItem) => (
          <BodytypeItem
            key={bodytypeItem.name}
            bodytype={bodytypeItem}
            isSelected={true}
            onSelectBodytype={() => handleDeselectBodytype(bodytypeItem.name)}
            bodytypeCardDynamicStyle={StyleSheet.flatten([styles.bodytypeItem, itemBackgroundDynamicStyle])}
            activeBorderStyle={activeBorderStyle}
            size={40}
          />
        ))}
      </ScrollView>
    </BaseDeselectorContainer>
  );
};

const styles = StyleSheet.create({
  // deselectorContainer, deselectorTitle, noElementsText sont maintenant dans BaseDeselectorContainer
  bodytypesGrid: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  bodytypeItem: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
  },
  // bodytypeItemText n'est plus nécessaire ici si BodytypeItem le gère en interne
  // noElementsText est dans BaseDeselectorContainer
  activeBorder: {
    borderWidth: 3,
  },
});

export default memo(BodytypesDeselector);
