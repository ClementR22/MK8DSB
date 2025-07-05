import React, { useState, useMemo, useCallback, memo, Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { sortButtonsConfig, SortButtonName } from "@/config/sortButtonsConfig"; // Import merged config
import { CompareName } from "@/data/stats/statsTypes"; // Import Stat type

// Redefine types to use SortButtonName

type SpeedCompareName = Extract<CompareName, "close" | "speedGround" | "speedAntiGravity" | "speedWater" | "speedAir">;
type HandlingCompareName = Extract<
  CompareName,
  "close" | "handlingGround" | "handlingAntiGravity" | "handlingWater" | "handlingAir"
>;
type ReducedCompareName = Exclude<CompareName, SpeedCompareName | HandlingCompareName>;

const speedCompareNames: SpeedCompareName[] = ["close", "speedGround", "speedAntiGravity", "speedWater", "speedAir"];
const handlingCompareNames: HandlingCompareName[] = [
  "close",
  "handlingGround",
  "handlingAntiGravity",
  "handlingWater",
  "handlingAir",
];
const reducedCompareNames: ReducedCompareName[] = [
  "speed",
  "acceleration",
  "weight",
  "handling",
  "traction",
  "miniTurbo",
];

const BUTTON_SIZE = 40; // égal à ButtonIcon
const NUMBER_OF_SLOTS = 6; // Nombre de slots fixes pour les boutons

interface StatSliderCompareSelectorProps {
  selectedCompareName: CompareName;
  setSelectedCompareName: Dispatch<SetStateAction<CompareName>>;
}

const StatSliderCompareSelector: React.FC<StatSliderCompareSelectorProps> = memo(
  ({ selectedCompareName, setSelectedCompareName }) => {
    const theme = useThemeStore((state) => state.theme);

    // État local pour la liste des stats affichées
    const [displayedNames, setDisplayedNames] = useState<CompareName[]>(reducedCompareNames);

    // Handler mémoïsé pour éviter les recréations inutiles
    const handlePress = useCallback(
      (name: CompareName) => {
        if (selectedCompareName === name) return;
        switch (name) {
          case "speed":
            setDisplayedNames(speedCompareNames);
            break;
          case "handling":
            setDisplayedNames(handlingCompareNames);
            break;
          case "close":
            setDisplayedNames(reducedCompareNames);
            break;
          default:
            setSelectedCompareName(name);
            break;
        }
      },
      [selectedCompareName, setSelectedCompareName]
    );

    // Style du contour actif, constant
    const buttonIconActiveStyle = useMemo(() => ({ borderWidth: 10, borderColor: "cyan" }), []);

    // Génération mémoïsée des boutons affichés
    const displayedButtons = useMemo(() => {
      return Array.from({ length: NUMBER_OF_SLOTS }, (_, i) => {
        const name = displayedNames[i];
        if (name && sortButtonsConfig[name]) {
          const iconConfig = sortButtonsConfig[name];
          const { iconName, iconType } = iconConfig;
          const iconBackgroundColor = iconConfig.iconBackgroundColor || theme.primary;
          const isActive = selectedCompareName === name;
          const buttonIconStyle = { backgroundColor: iconBackgroundColor };
          return (
            <ButtonIcon
              key={name}
              onPress={() => handlePress(name)}
              tooltipText={name}
              iconName={iconName}
              iconType={iconType}
              style={[buttonIconStyle, isActive && buttonIconActiveStyle]}
            />
          );
        }
        return <View key={`empty-${i}`} style={styles.buttonMissing} />;
      });
    }, [displayedNames, handlePress, selectedCompareName, buttonIconActiveStyle, theme.primary]);

    return <View style={styles.buttonRowContainer}>{displayedButtons}</View>;
  }
);

const styles = StyleSheet.create({
  buttonRowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 3, // Ajoute un peu de padding pour les bords
  },
  buttonMissing: {
    width: BUTTON_SIZE,
    // Optionnel: ajouter un style de fond pour visualiser les slots manquants si besoin
    // backgroundColor: 'rgba(0,0,0,0.1)',
    // borderRadius: 5,
  },
});

export default StatSliderCompareSelector;
