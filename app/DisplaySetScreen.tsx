import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import SetCardsContainer from "@/components/setCard/SetCardsContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import useSetsListStore from "@/stores/useSetsListStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { SET_CARD_COLOR_PALETTE } from "@/constants/Colors"; // Importez la palette et la fonction de fallback
import { StatName } from "@/data/stats/statsTypes";
import { useThemeStore } from "@/stores/useThemeStore";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";
import ButtonAddSet from "@/components/managingSetsButton/ButtonAddSet";
import ButtonLoadSet from "@/components/managingSetsButton/ButtonLoadSet";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import StatGaugeComparesContainer from "@/components/statGaugeCompare/StatGaugeComparesContainer";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import StatSelector from "@/components/statSelector/StatSelector";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { StyleSheet, View } from "react-native";
import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";
import { SetCardsScrollProvider } from "@/contexts/SetCardsScrollContext";

const DisplaySetScreen = () => {
  const theme = useThemeStore((state) => state.theme);

  const scrollRef = useRef(null); // Ref pour SetCardsContainer
  const setsListDisplayed = useSetsListStore((state) => state.setsListDisplayed);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const [sortNumber, setSortNumber] = useState(2);

  const isSetCardsCollapsed = useGeneralStore((state) => state.isSetCardsCollapsed);
  const toggleIsSetCardsCollapsed = useGeneralStore((state) => state.toggleIsSetCardsCollapsed);

  // État local pour stocker l'association nom du set -> Couleur
  const [setsColorsMap, setSetsColorsMap] = useState<Map<string, string>>(() => new Map());
  // Ref pour suivre les couleurs disponibles dans la palette (ne déclenche pas de re-render)
  const availableColorsRef = useRef<string[]>([...SET_CARD_COLOR_PALETTE]);

  // --- Logique d'attribution des couleurs déplacée ici ---
  useEffect(() => {
    const newColorsMap = new Map<string, string>();
    const colorsCurrentlyInUse = new Set<string>(); // Garde une trace des couleurs utilisées dans le cycle actuel

    // 1. Réutiliser les couleurs pour les sets qui sont toujours présents
    setsListDisplayed.forEach(({ id }) => {
      // Utilisez set.name comme clé, comme dans votre code, mais l'ID est recommandé si le nom n'est pas unique.
      const existingColor = setsColorsMap.get(id);
      if (existingColor && SET_CARD_COLOR_PALETTE.includes(existingColor)) {
        newColorsMap.set(id, existingColor);
        colorsCurrentlyInUse.add(existingColor);
      }
    });

    // 2. Mettre à jour le pool de couleurs disponibles
    availableColorsRef.current = SET_CARD_COLOR_PALETTE.filter((color) => !colorsCurrentlyInUse.has(color));

    // 3. Attribuer de nouvelles couleurs aux sets qui n'en ont pas (nouveaux sets)
    setsListDisplayed.forEach((set) => {
      if (!newColorsMap.has(set.id)) {
        if (availableColorsRef.current.length > 0) {
          const assignedColor = availableColorsRef.current.shift(); // Prend la première couleur disponible
          if (assignedColor) {
            newColorsMap.set(set.id, assignedColor);
            colorsCurrentlyInUse.add(assignedColor); // Marque comme utilisée
          }
        } else {
          console.warn(`Plus de couleurs uniques disponibles pour le set ${set.name}`);
        }
      }
    });

    // Mettre à jour l'état du composant avec la nouvelle map de couleurs
    // Cette mise à jour déclenchera un re-render, et les enfants auront la map à jour.
    setSetsColorsMap(newColorsMap);
  }, [setsListDisplayed]);

  // --- Fin Logique d'attribution des couleurs ---

  const hideRemoveSet = setsListDisplayed.length === 1;

  const setsWithColor = useMemo(
    () =>
      setsListDisplayed.map((set) => ({
        ...set,
        color: setsColorsMap?.get(set.id) || theme.surface_variant || theme.surface_container_high,
      })),
    [setsListDisplayed, setsColorsMap, theme.surface_variant, theme.surface_container_high]
  );

  return (
    <ScreenProvider screenName="display">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable}>
          <ScreenPressablesContainer sortNumber={sortNumber} setSortNumber={setSortNumber}>
            <ButtonAddSet scrollRef={scrollRef} />
            <ButtonLoadSet tooltipText="LoadASet" />
            <ButtonIcon
              onPress={toggleIsSetCardsCollapsed}
              iconName={isSetCardsCollapsed ? "chevron-down" : "chevron-up"}
              iconType={IconType.MaterialCommunityIcons}
              tooltipText={isSetCardsCollapsed ? "DevelopSets" : "ReduceSets"}
            />
          </ScreenPressablesContainer>

          <SetCardsScrollProvider scrollRef={scrollRef}>
            <SetCardsContainer ref={scrollRef} setsToShow={setsWithColor} hideRemoveSet={hideRemoveSet} />

            <View style={styles.mainButtonWrapper}>
              <StatSelector triggerButtonText="displayedStats" />
            </View>

            <StatGaugeComparesContainer setsColorsMap={setsColorsMap} />
          </SetCardsScrollProvider>
        </ScrollViewScreen>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

const styles = StyleSheet.create({
  mainButtonWrapper: {
    marginHorizontal: MARGIN_CONTAINER_LOWEST * 2,
  },
});

export default React.memo(DisplaySetScreen);
