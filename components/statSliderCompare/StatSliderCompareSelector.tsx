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

    // État pour gérer la liste des noms de stats affichées (réduite, vitesse, maniabilité)
    const [displayedNames, setDisplayedNames] = useState<CompareName[]>(reducedCompareNames);

    // No need for a separate useMemo for statIconsList, directly use sortButtonsConfig
    // The background colors are now managed directly in sortButtonsConfig

    // Gère le clic sur un bouton
    const handlePress = useCallback(
      (name: CompareName) => {
        if (selectedCompareName === name) {
          return;
        }

        // Logique pour changer la liste des noms affichés
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
            setSelectedCompareName(name); // Appelle le handler parent
            break;
        }
      },
      [selectedCompareName, setSelectedCompareName] // Dépendances pour useCallback
    );

    const buttonIconActiveStyle = useMemo(() => ({ borderWidth: 10, borderColor: "cyan" }), []);

    // Rend les boutons affichés
    const displayedButtons = useMemo(() => {
      const buttons = [];
      for (let i = 0; i < NUMBER_OF_SLOTS; i++) {
        const name = displayedNames[i];

        if (name && sortButtonsConfig[name]) {
          // Use sortButtonsConfig
          const iconConfig = sortButtonsConfig[name];
          const { iconName, iconType } = iconConfig;
          // Use the iconBackgroundColor from the config, or default to theme.primary if not specified
          const iconBackgroundColor = iconConfig.iconBackgroundColor || theme.primary;
          const isActive = selectedCompareName === name; // Détermine si ce bouton est actif

          // Style de fond pour le bouton actif
          const buttonIconStyle = { backgroundColor: iconBackgroundColor };

          buttons.push(
            <ButtonIcon
              key={name}
              onPress={() => handlePress(name)}
              tooltipText={name}
              iconName={iconName}
              iconType={iconType}
              style={[buttonIconStyle, isActive && buttonIconActiveStyle]}
            />
          );
        } else {
          // Rendre un espace vide pour les slots non utilisés
          buttons.push(<View key={`empty-${i}`} style={styles.buttonMissing} />);
        }
      }
      return buttons;
    }, [displayedNames, handlePress, selectedCompareName, buttonIconActiveStyle, theme.primary]); // Added theme.primary dependency

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
