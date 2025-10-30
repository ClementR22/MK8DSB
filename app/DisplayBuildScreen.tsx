import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import BuildCardsContainer from "@/components/buildCard/BuildCardsContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import useBuildsListStore from "@/stores/useBuildsListStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { BUILD_CARD_COLOR_PALETTE } from "@/constants/Colors";
import { useThemeStore } from "@/stores/useThemeStore";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";
import ButtonAddBuild from "@/components/managingBuildsButton/ButtonAddBuild";
import ButtonLoadBuild from "@/components/managingBuildsButton/ButtonLoadBuild";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import StatGaugeComparesContainer from "@/components/statGaugeCompare/StatGaugeComparesContainer";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import StatSelector from "@/components/statSelector/StatSelector";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { StyleSheet, View } from "react-native";
import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";
import { BuildCardsScrollProvider } from "@/contexts/BuildCardsScrollContext";

const DisplayBuildScreen = () => {
  const theme = useThemeStore((state) => state.theme);

  const scrollRef = useRef(null); // Ref pour BuildCardsContainer
  const buildsListDisplayed = useBuildsListStore((state) => state.buildsListDisplayed);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const [sortNumber, setSortNumber] = useState(2);

  const isBuildCardsCollapsed = useGeneralStore((state) => state.isBuildCardsCollapsed);
  const toggleIsBuildCardsCollapsed = useGeneralStore((state) => state.toggleIsBuildCardsCollapsed);

  // État local pour stocker l'association nom du build -> Couleur
  const [buildsColorsMap, setBuildsColorsMap] = useState<Map<string, string>>(() => new Map());
  // Ref pour suivre les couleurs disponibles dans la palette (ne déclenche pas de re-render)
  const availableColorsRef = useRef<string[]>([...BUILD_CARD_COLOR_PALETTE]);

  // --- Logique d'attribution des couleurs déplacée ici ---
  useEffect(() => {
    const newColorsMap = new Map<string, string>();
    const colorsCurrentlyInUse = new Set<string>(); // Garde une trace des couleurs utilisées dans le cycle actuel

    // 1. Réutiliser les couleurs pour les builds qui sont toujours présents
    buildsListDisplayed.forEach(({ id }) => {
      const existingColor = buildsColorsMap.get(id);
      if (existingColor && BUILD_CARD_COLOR_PALETTE.includes(existingColor)) {
        newColorsMap.set(id, existingColor);
        colorsCurrentlyInUse.add(existingColor);
      }
    });

    // 2. Mettre à jour le pool de couleurs disponibles
    availableColorsRef.current = BUILD_CARD_COLOR_PALETTE.filter((color) => !colorsCurrentlyInUse.has(color));

    // 3. Attribuer de nouvelles couleurs aux builds qui n'en ont pas (nouveaux builds)
    buildsListDisplayed.forEach((build) => {
      if (!newColorsMap.has(build.id)) {
        if (availableColorsRef.current.length > 0) {
          const assignedColor = availableColorsRef.current.shift(); // Prend la première couleur disponible
          if (assignedColor) {
            newColorsMap.set(build.id, assignedColor);
            colorsCurrentlyInUse.add(assignedColor); // Marque comme utilisée
          }
        } else {
          console.warn(`Plus de couleurs uniques disponibles pour le build ${build.name}`);
        }
      }
    });

    // Mettre à jour l'état du composant avec la nouvelle map de couleurs
    // Cette mise à jour déclenchera un re-render, et les enfants auront la map à jour.
    setBuildsColorsMap(newColorsMap);
  }, [buildsListDisplayed]);

  // --- Fin Logique d'attribution des couleurs ---

  const hideRemoveBuild = buildsListDisplayed.length === 1;

  const buildsWithColor = useMemo(
    () =>
      buildsListDisplayed.map((build) => ({
        ...build,
        color: buildsColorsMap?.get(build.id) || theme.surface_variant || theme.surface_container_high,
      })),
    [buildsListDisplayed, buildsColorsMap, theme.surface_variant, theme.surface_container_high]
  );

  return (
    <ScreenProvider screenName="display">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable}>
          <ScreenPressablesContainer sortNumber={sortNumber} setSortNumber={setSortNumber}>
            <ButtonAddBuild scrollRef={scrollRef} />
            <ButtonLoadBuild tooltipText="LoadASet" />
            <ButtonIcon
              onPress={toggleIsBuildCardsCollapsed}
              iconName={isBuildCardsCollapsed ? "chevron-down" : "chevron-up"}
              iconType={IconType.MaterialCommunityIcons}
              tooltipText={isBuildCardsCollapsed ? "DevelopBuilds" : "ReduceBuilds"}
            />
          </ScreenPressablesContainer>

          <BuildCardsScrollProvider scrollRef={scrollRef}>
            <BuildCardsContainer ref={scrollRef} builds={buildsWithColor} hideRemoveBuild={hideRemoveBuild} />

            <View style={styles.mainButtonWrapper}>
              <StatSelector triggerButtonText="displayedStats" />
            </View>

            <StatGaugeComparesContainer buildsColorsMap={buildsColorsMap} />
          </BuildCardsScrollProvider>
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

export default React.memo(DisplayBuildScreen);
