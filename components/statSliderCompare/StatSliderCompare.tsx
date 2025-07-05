// StatSliderCompare.tsx
import React, { useMemo, useCallback, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";

// Assurez-vous d'importer ces composants
import BoxContainer from "@/primitiveComponents/BoxContainer"; // Ajustez le chemin si nécessaire
import TooltipWrapper from "../TooltipWrapper";
import StatSliderCompareSelector from "./StatSliderCompareSelector"; // Ajustez le chemin si nécessaire (s'il est dans le même dossier ou un sous-dossier)
import StatSliderCompareBar from "./StatSliderCompareBar";
import { CompareName } from "@/data/stats/statsTypes";

export interface SetIdAndStatValue {
  id: string;
  value: number;
}

interface StatSliderCompareProps {
  setsIdAndValue: SetIdAndStatValue[];
  selectedCompareName: CompareName;
  setSelectedCompareName: Dispatch<SetStateAction<CompareName>>;
  scrollToSetCard: (id: string) => void;
  setsColorsMap: Map<string, string>;
}

const StatSliderCompare: React.FC<StatSliderCompareProps> = ({
  setsIdAndValue,
  selectedCompareName,
  setSelectedCompareName,
  scrollToSetCard,
  setsColorsMap,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  // Calculez le nom traduit une fois
  const translatedName = useMemo(
    () => translateToLanguage(selectedCompareName, language),
    [selectedCompareName, language]
  );

  // Styles dynamiques pour le texte du titre
  const textDynamicStyle = useMemo(() => {
    return { color: theme.on_surface };
  }, [theme.on_surface]);

  // Les styles pour TooltipWrapper et son conteneur intérieur
  const containerStyles = useMemo(() => {
    return [styles.container, { backgroundColor: theme.surface_container_high }];
  }, [theme.surface_container_high]);

  // Ajout de theme.surface dans les dépendances pour cohérence
  const innerContainerStyles = useMemo(() => {
    return [styles.innerContainer, { backgroundColor: theme.surface }];
  }, [theme.surface]);

  // Suppression du log en prod
  if (process.env.NODE_ENV === "development") {
    console.log("setsIdAndValue", setsIdAndValue);
  }

  // Optimisation: on extrait la fonction de rendu d'une stat bar pour la mémoïser
  const renderStatBar = useCallback(
    ({ id, value }, index) => {
      const color = setsColorsMap.get(id) || theme.on_surface;
      return (
        <StatSliderCompareBar key={id} value={value} color={color} scrollToThisSetCard={() => scrollToSetCard(id)} />
      );
    },
    [setsColorsMap, theme.on_surface, scrollToSetCard]
  );

  // Utilisation de useMemo pour le mapping, dépendant de renderStatBar
  const memoizedStatBars = useMemo(() => setsIdAndValue.map(renderStatBar), [setsIdAndValue, renderStatBar]);

  return (
    <BoxContainer marginTop={0} margin={10} padding={15}>
      <TooltipWrapper
        tooltipText="StatsOfTheSet" // Assurez-vous que cette clé de traduction existe
        style={containerStyles}
        innerContainerStyle={innerContainerStyles}
      >
        <View style={styles.textContainer}>
          <Text style={StyleSheet.flatten([styles.text, textDynamicStyle])}>{translatedName}</Text>
        </View>

        <View style={styles.statBarsContainer}>{memoizedStatBars}</View>
      </TooltipWrapper>

      {/* Assurez-vous que StatSliderCompareSelector est bien importé */}
      <StatSliderCompareSelector
        selectedCompareName={selectedCompareName}
        setSelectedCompareName={setSelectedCompareName}
      />
    </BoxContainer>
  );
};

const styles = StyleSheet.create({
  // Styles pour le conteneur principal (anciennement styles.container)
  // Ces styles pourraient être intégrés dans BoxContainer ou ajustés pour le wrapper du Tooltip
  // Pour l'instant, je les mets ici pour la clarté.
  // La couleur de fond du TooltipWrapper est gérée par tooltipWrapperStyles
  container: {
    width: "100%",
    marginBottom: 10, // Espacement entre le tooltip et le sélecteur
  },
  innerContainer: {
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 12,
  },
  textContainer: {
    marginBottom: 10, // Espacement entre le titre et les barres de stat
    alignItems: "center", // Centrer le texte
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  statBarsContainer: {
    width: "100%",
    gap: 0,
  },
});

export default React.memo(StatSliderCompare);
