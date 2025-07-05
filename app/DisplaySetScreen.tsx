import React, { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { statNames } from "@/data/stats/statsData";
import StatSliderCompare, { SetIdAndStatValue } from "@/components/statSliderCompare/StatSliderCompare";
import { SET_CARD_COLOR_PALETTE } from "@/constants/Colors"; // Importez la palette et la fonction de fallback
import { CompareName } from "@/data/stats/statsTypes";

const DisplaySetScreen = () => {
  const scrollRef = useRef(null); // Ref pour SetCardContainer
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

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

  const setsIdAndValueByStat = useMemo(() => {
    const result: { [key: string]: SetIdAndStatValue[] } = {};

    statNames.forEach((statName) => {
      result[statName] = [];
    });

    setsListDisplayed.forEach((setToShow) => {
      const setToShowStatsList = setToShow.stats;

      setToShowStatsList.forEach((statValue, index) => {
        const statName = statNames[index];
        if (statName) {
          result[statName].push({ id: setToShow.id, value: statValue });
        }
      });
    });
    return result;
  }, [setsListDisplayed]);

  const [selectedCompareName, setSelectedCompareName] = useState<CompareName>("speedGround");

  const hideRemoveSet = setsListDisplayed.length === 1;

  // Modifié pour passer l'ID (ou le nom) du set à scrollToSetCard
  const scrollToSetCard = useCallback((id: string) => {
    if (scrollRef.current && scrollRef.current.scrollToSetCard) {
      scrollRef.current.scrollToSetCard(id);
    }
  }, []);

  console.log("setsColorsMap", setsColorsMap);

  return (
    <ScreenProvider screenName="display">
      <ScrollView scrollEnabled={isScrollEnable}>
        <DisplaySetScreenPressablesContainer scrollRef={scrollRef} />

        <SetCardContainer
          ref={scrollRef}
          setsToShow={setsListDisplayed}
          hideRemoveSet={hideRemoveSet}
          setsColorsMap={setsColorsMap}
        />

        <StatSliderCompare
          setsIdAndValue={setsIdAndValueByStat[selectedCompareName]}
          selectedCompareName={selectedCompareName}
          setSelectedCompareName={setSelectedCompareName}
          scrollToSetCard={scrollToSetCard}
          setsColorsMap={setsColorsMap} // Passe la map de couleurs calculée
        />
      </ScrollView>
    </ScreenProvider>
  );
};

export default React.memo(DisplaySetScreen);
