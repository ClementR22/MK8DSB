import React, { useState, useMemo, useCallback, memo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { ResultStats } from "@/contexts/ResultStatsContext"; // Assure-toi que ce chemin est correct

// Définir les types pour les noms de statistiques
type ReducedStatName = "speed" | "acceleration" | "weight" | "handling" | "traction" | "miniTurbo";
type SpeedStatName = "close" | "speedGround" | "speedAntiGravity" | "speedWater" | "speedAir";
type HandlingStatName = "close" | "handlingGround" | "handlingAntiGravity" | "handlingWater" | "handlingAir";

// Union de tous les noms de stats possibles pour le typage de statIconsList
export type CompareButtonNames = ReducedStatName | SpeedStatName | HandlingStatName;

// Définir le type pour les propriétés d'une icône de statistique
interface StatIconProps {
  iconName: string;
  iconType: IconType;
  iconBackgroundColor: string;
}

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
  setSelectedStatName: (name: string) => void;
}

const StatSliderCompareSelector: React.FC<StatSliderCompareSelectorProps> = memo(
  ({ selectedStatName, setSelectedStatName }) => {
    const theme = useThemeStore((state) => state.theme);

    // État pour gérer la liste des noms de stats affichées (réduite, vitesse, maniabilité)
    const [displayedNames, setDisplayedNames] = useState<CompareButtonNames[]>(reducedStatNames);

    // Définition des icônes et de leurs propriétés
    const statIconsList: { [key in CompareButtonNames]: StatIconProps } = useMemo(
      // ground :         tan         peru          goldenrod
      // anti -grav :     indigo      blueviolet
      // water :          steelblue   deepskyblue   dodgerblue
      // air :            skyblue     lightblue     powderblue

      () => ({
        close: {
          iconName: "close",
          iconType: IconType.AntDesign,
          iconBackgroundColor: theme.primary,
        },
        speed: {
          iconName: "speedometer",
          iconType: IconType.SimpleLineIcons,
          iconBackgroundColor: theme.primary,
        },
        speedGround: {
          iconName: "speedometer",
          iconType: IconType.SimpleLineIcons,
          iconBackgroundColor: "tan",
        },
        speedAntiGravity: {
          iconName: "speedometer",
          iconType: IconType.SimpleLineIcons,
          iconBackgroundColor: "blueviolet",
        },
        speedWater: {
          iconName: "speedometer",
          iconType: IconType.SimpleLineIcons,
          iconBackgroundColor: "dodgerblue",
        },
        speedAir: {
          iconName: "speedometer",
          iconType: IconType.SimpleLineIcons,
          iconBackgroundColor: "powderblue",
        },
        acceleration: {
          iconName: "keyboard-double-arrow-up",
          iconType: IconType.MaterialIcons,
          iconBackgroundColor: theme.primary,
        },
        weight: {
          iconName: "weight-gram",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: theme.primary,
        },
        handling: {
          iconName: "steering",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: theme.primary,
        },
        handlingGround: {
          iconName: "steering",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: "tan",
        },
        handlingAntiGravity: {
          iconName: "steering",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: "blueviolet",
        },
        handlingWater: {
          iconName: "steering",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: "dodgerblue",
        },
        handlingAir: {
          iconName: "steering",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: "powderblue",
        },
        traction: {
          iconName: "car-traction-control",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: theme.primary,
        },
        miniTurbo: {
          iconName: "rocket-launch-outline",
          iconType: IconType.MaterialCommunityIcons,
          iconBackgroundColor: theme.primary,
        },
      }),
      [theme.primary] // Dépendances pour useMemo
    );

    // Gère le clic sur un bouton
    const handlePress = useCallback(
      (name: CompareButtonNames) => {
        // Si le bouton cliqué est déjà actif et n'est pas le bouton "close",
        // on ne fait rien (comportement "quand je reclique, ça change rien").
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

    const buttonIconActiveStyle = useMemo(() => ({ borderWidth: 10, borderColor: "cyan" }), [theme.secondary]);

    // Rend les boutons affichés
    const displayedButtons = useMemo(() => {
      const buttons = [];
      for (let i = 0; i < NUMBER_OF_SLOTS; i++) {
        const name = displayedNames[i];

        if (name && statIconsList[name]) {
          const { iconName, iconType, iconBackgroundColor } = statIconsList[name];
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
              // Optionnel: tu peux désactiver le Pressable si déjà actif et ce n'est pas "close"
              // disabled={isActive && name !== "close"}
            />
          );
        } else {
          // Rendre un espace vide pour les slots non utilisés
          buttons.push(<View key={`empty-${i}`} style={styles.buttonMissing} />);
        }
      }
      return buttons;
    }, [displayedNames, statIconsList, handlePress, selectedStatName, theme.secondary]); // Dépendances pour useMemo

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
