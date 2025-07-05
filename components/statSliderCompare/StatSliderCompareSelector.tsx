import React, { useState, useMemo, useCallback, memo, Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { appIconsConfig, AppButtonName } from "@/config/appIconsConfig"; // Import merged config

// Redefine types to use AppButtonName
type ReducedStatName = Exclude<
  AppButtonName,
  | "id"
  | "name"
  | "classId"
  | "close"
  | "speedGround"
  | "speedAntiGravity"
  | "speedWater"
  | "speedAir"
  | "handlingGround"
  | "handlingAntiGravity"
  | "handlingWater"
  | "handlingAir"
>;
type SpeedStatName = Extract<AppButtonName, "close" | "speedGround" | "speedAntiGravity" | "speedWater" | "speedAir">;
type HandlingStatName = Extract<
  AppButtonName,
  "close" | "handlingGround" | "handlingAntiGravity" | "handlingWater" | "handlingAir"
>;

// Use AppButtonName directly for CompareButtonNames
export type CompareButtonNames = AppButtonName;

const reducedStatNames: ReducedStatName[] = ["speed", "acceleration", "weight", "handling", "traction", "miniTurbo"];
const speedStatNames: SpeedStatName[] = ["close", "speedGround", "speedAntiGravity", "speedWater", "speedAir"];
const handlingStatNames: HandlingStatName[] = [
  "close",
  "handlingGround",
  "handlingAntiGravity",
  "handlingWater",
  "handlingAir",
];

const BUTTON_SIZE = 40; // égal à ButtonIcon
const NUMBER_OF_SLOTS = 6; // Nombre de slots fixes pour les boutons

interface StatSliderCompareSelectorProps {
  selectedStatName: CompareButtonNames;
  setSelectedStatName: Dispatch<SetStateAction<AppButtonName>>;
}

const StatSliderCompareSelector: React.FC<StatSliderCompareSelectorProps> = memo(
  ({ selectedStatName, setSelectedStatName }) => {
    const theme = useThemeStore((state) => state.theme);

    // État pour gérer la liste des noms de stats affichées (réduite, vitesse, maniabilité)
    const [displayedNames, setDisplayedNames] = useState<CompareButtonNames[]>(reducedStatNames);

    // No need for a separate useMemo for statIconsList, directly use appIconsConfig
    // The background colors are now managed directly in appIconsConfig

    // Gère le clic sur un bouton
    const handlePress = useCallback(
      (name: CompareButtonNames) => {
        if (selectedStatName === name) {
          return;
        }

        // Logique pour changer la liste des noms affichés
        switch (name) {
          case "speed":
            setDisplayedNames(speedStatNames);
            break;
          case "handling":
            setDisplayedNames(handlingStatNames);
            break;
          case "close":
            setDisplayedNames(reducedStatNames);
            break;
          default:
            setSelectedStatName(name); // Appelle le handler parent
            break;
        }
      },
      [selectedStatName, setSelectedStatName] // Dépendances pour useCallback
    );

    const buttonIconActiveStyle = useMemo(() => ({ borderWidth: 10, borderColor: "cyan" }), []);

    // Rend les boutons affichés
    const displayedButtons = useMemo(() => {
      const buttons = [];
      for (let i = 0; i < NUMBER_OF_SLOTS; i++) {
        const name = displayedNames[i];

        if (name && appIconsConfig[name]) {
          // Use appIconsConfig
          const iconConfig = appIconsConfig[name];
          const { iconName, iconType } = iconConfig;
          // Use the iconBackgroundColor from the config, or default to theme.primary if not specified
          const iconBackgroundColor = iconConfig.iconBackgroundColor || theme.primary;
          const isActive = selectedStatName === name; // Détermine si ce bouton est actif

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
    }, [displayedNames, handlePress, selectedStatName, buttonIconActiveStyle, theme.primary]); // Added theme.primary dependency

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
