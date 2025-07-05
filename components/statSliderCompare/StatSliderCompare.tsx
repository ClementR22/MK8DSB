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
import { AppButtonName } from "@/config/appIconsConfig";
import StatSliderCompareBar from "./StatSliderCompareBar";

interface StatSliderCompareProps {
  name: string;
  setsNamesAndStats: { setName: string; value: number }[];
  selectedStatName: AppButtonName;
  setSelectedStatName: Dispatch<SetStateAction<AppButtonName>>;
  scrollToSetCard: (id: string) => void;
  setsColorsMap: Map<string, string>;
}

const StatSliderCompare: React.FC<StatSliderCompareProps> = ({
  name,
  setsNamesAndStats,
  selectedStatName,
  setSelectedStatName,
  scrollToSetCard,
  setsColorsMap,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  // Calculez le nom traduit une fois
  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);

  // Styles dynamiques pour le texte du titre
  const textDynamicStyle = useMemo(() => {
    return { color: theme.on_surface };
  }, [theme.on_surface]);

  // Les styles pour TooltipWrapper et son conteneur intérieur
  const containerStyles = useMemo(() => {
    return [
      styles.container,
      { backgroundColor: theme.surface_container_high }, // Ou une autre couleur de fond si TooltipWrapper ne le gère pas
    ];
  }, [theme.surface_container_high]);

  const innerContainerStyles = useMemo(() => {
    return [styles.innerContainer, { backgroundColor: theme.surface }];
  }, []);

  const createScrollToCardHandler = useCallback(
    (setName: string) => {
      if (scrollToSetCard) {
        return () => scrollToSetCard(setName);
      }
      return undefined;
    },
    [scrollToSetCard]
  );

  // C'est votre `memoizedSetStats` qui devient `memoizedStatBars`
  const memoizedStatBars = useMemo(
    () =>
      setsNamesAndStats.map(({ setName, value }, index) => {
        const color = setsColorsMap.get(setName) || theme.on_surface; // Fallback si couleur non trouvée
        return (
          <StatSliderCompareBar
            key={index}
            value={value}
            color={color}
            scrollToThisSetCard={createScrollToCardHandler(setName)}
          />
        );
      }),
    [setsColorsMap, theme.on_surface, theme.surface, scrollToSetCard]
  );

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
      <StatSliderCompareSelector selectedStatName={selectedStatName} setSelectedStatName={setSelectedStatName} />
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
