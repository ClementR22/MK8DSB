import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import useSetsStore, { SetObject } from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { statNames } from "@/data/data";
import StatSliderCompare from "@/components/statSliderCompare/StatSliderCompare";
import { useScreen } from "@/contexts/ScreenContext"; // Importez useScreen
import { SET_CARD_COLOR_PALETTE } from "@/constants/Colors"; // Importez la palette et la fonction de fallback
import { SetData } from "@/components/setCard/SetCard";
import { AppButtonName } from "@/config/appIconsConfig";

const DisplaySetScreen = () => {
  const scrollRef = useRef(null); // Ref pour SetCardContainer
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  // État local pour stocker l'association nom du set -> Couleur
  const [setsColorsMap, setSetsColorsMap] = useState<Map<string, string>>(() => new Map());
  // Ref pour suivre les couleurs disponibles dans la palette (ne déclenche pas de re-render)
  const availableColorsRef = useRef<string[]>([...SET_CARD_COLOR_PALETTE]);

  // --- Logique d'attribution des couleurs déplacée ici ---
  const numberOfSets = useMemo(() => setsListDisplayed.length, [setsListDisplayed]);

  useEffect(() => {
    const newColorsMap = new Map<string, string>();
    const colorsCurrentlyInUse = new Set<string>(); // Garde une trace des couleurs utilisées dans le cycle actuel

    // 1. Réutiliser les couleurs pour les sets qui sont toujours présents
    setsListDisplayed.forEach((set) => {
      // Utilisez set.name comme clé, comme dans votre code, mais l'ID est recommandé si le nom n'est pas unique.
      const existingColor = setsColorsMap.get(set.name);
      if (existingColor && SET_CARD_COLOR_PALETTE.includes(existingColor)) {
        newColorsMap.set(set.name, existingColor);
        colorsCurrentlyInUse.add(existingColor);
      }
    });

    // 2. Mettre à jour le pool de couleurs disponibles
    availableColorsRef.current = SET_CARD_COLOR_PALETTE.filter((color) => !colorsCurrentlyInUse.has(color));

    // 3. Attribuer de nouvelles couleurs aux sets qui n'en ont pas (nouveaux sets)
    setsListDisplayed.forEach((set) => {
      if (!newColorsMap.has(set.name)) {
        if (availableColorsRef.current.length > 0) {
          const assignedColor = availableColorsRef.current.shift(); // Prend la première couleur disponible
          if (assignedColor) {
            newColorsMap.set(set.name, assignedColor);
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
  }, [numberOfSets]);

  // --- Fin Logique d'attribution des couleurs ---

  const setsNamesAndStatsForSelectedStat = useMemo(() => {
    const result: { [key: string]: { setName: string; value: number }[] } = {};

    statNames.forEach((statName) => {
      result[statName] = [];
    });

    setsListDisplayed.forEach((setToShow) => {
      const setToShowStatsList = setToShow.stats;

      setToShowStatsList.forEach((statValue, index) => {
        const statName = statNames[index];
        if (statName) {
          result[statName].push({ setName: setToShow.name, value: statValue });
        }
      });
    });
    return result;
  }, [setsListDisplayed]);

  const [selectedStatName, setSelectedStatName] = useState<AppButtonName>("speedGround");

  const hideRemoveSet = setsListDisplayed.length === 1;

  // Modifié pour passer l'ID (ou le nom) du set à scrollToSetCard
  const scrollToSetCard = useCallback((id: string) => {
    if (scrollRef.current && scrollRef.current.scrollToSetCard) {
      scrollRef.current.scrollToSetCard(id);
    }
  }, []);

  return (
    <ScreenProvider screenName="display">
      <ScrollView scrollEnabled={isScrollEnable}>
        <DisplaySetScreenPressablesContainer scrollRef={scrollRef} />

        <SetCardContainer
          ref={scrollRef}
          setsToShow={setsListDisplayed}
          hideRemoveSet={hideRemoveSet}
          setsColorsMap={setsColorsMap} // Passe la map de couleurs calculée
          // setSetsColorsMap n'est plus passé car la logique est ici.
        />

        <StatSliderCompare
          name={selectedStatName}
          setsNamesAndStats={setsNamesAndStatsForSelectedStat[selectedStatName]}
          selectedStatName={selectedStatName}
          setSelectedStatName={setSelectedStatName}
          scrollToSetCard={scrollToSetCard}
          setsColorsMap={setsColorsMap} // Passe la map de couleurs calculée
        />
      </ScrollView>
    </ScreenProvider>
  );
};

export default React.memo(DisplaySetScreen);
