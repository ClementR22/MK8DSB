import React, { useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonIcon from "@/components/ButtonIcon";
import StatSlider from "@/components/statSlider/StatSlider";
import { IconType } from "react-native-dynamic-vector-icons";
import { translate } from "@/translations/translations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import ButtonLoadSet from "@/components/managingSetsPressable/ButtonLoadSet";
import ButtonAndModalForHelp from "@/components/modal/ButtonAndModalForHelp";
import HelpModal, { HelpIconAndText, HelpListContainer, HelpText, HelpTitle } from "./HelpModal";
import StatSliderPreview from "../statSlider/StatSliderPreview";

const HelpSearchSetScreen = () => {
  return <HelpModal slides={slides} />;
};

const slides = [
  {
    content: (
      <>
        <HelpTitle>Trouvez le set parfait</HelpTitle>

        <HelpText>Vous rêvez de trouver LE set parfaitement adapté à votre style de jeu ?</HelpText>
        <HelpText>
          Définissez vos statistiques souhaitées (vitesse, mini-turbo, etc.) à l’aide des curseurs et découvrez les sets
          qui s’en approchent le plus.
        </HelpText>

        <View style={{ paddingHorizontal: 26, width: "100%" }}>
          <StatSliderPreview name="speedGround" />
        </View>
      </>
    ),
    config: { backgroundColor: "#59b2ab" },
  },
  {
    content: (
      <>
        <HelpTitle>Fonctionnalités</HelpTitle>

        <HelpListContainer>
          <HelpIconAndText name="plus" type={IconType.MaterialCommunityIcons}>
            Ajouter une statistique supplémentaire à prendre en compte dans la recherche
          </HelpIconAndText>

          <HelpIconAndText name="pin" type={IconType.MaterialCommunityIcons}>
            Imposer des éléments (personnage, véhicule, roues, etc.)
          </HelpIconAndText>

          <HelpIconAndText name="numbers" type={IconType.MaterialIcons}>
            Définir le nombre de résultats à afficher
          </HelpIconAndText>

          <HelpIconAndText name="checkbox-multiple-marked" type={IconType.MaterialCommunityIcons}>
            Choisir les statistiques à afficher dans les sets trouvés pour une meilleure lisibilité
          </HelpIconAndText>

          <HelpIconAndText name="cards-outline" type={IconType.MaterialCommunityIcons}>
            Charger un set depuis vos favoris pour en réutiliser les statistiques
          </HelpIconAndText>

          <HelpIconAndText name="approximately-equal" type={IconType.MaterialCommunityIcons}>
            Choisir le niveau d'exigence de chaque statistique : exacte, supérieure ou proche
          </HelpIconAndText>
        </HelpListContainer>

        <HelpText>Une fois tous vos critères définis, lancez la recherche en cliquant sur</HelpText>

        <Button iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
          <Text>Search</Text>
        </Button>
      </>
    ),
    config: { backgroundColor: "#59b2ab" },
  },
  {
    content: (
      <>
        <HelpTitle>Et ensuite ?</HelpTitle>

        <HelpText>
          Une fois la recherche lancée, une sélection de sets correspondant à vos critères vous est proposée.
        </HelpText>

        <HelpText>Pour chaque set affiché, vous pouvez :</HelpText>

        <HelpListContainer>
          <HelpIconAndText name="heart-outline" type={IconType.MaterialCommunityIcons}>
            L'ajouter à vos favoris pour le retrouver plus tard
          </HelpIconAndText>

          <HelpIconAndText name="compare" type={IconType.MaterialCommunityIcons}>
            {/* // display-settings MaterialIcons */}
            Le comparer avec d’autres pour faire le meilleur choix
          </HelpIconAndText>

          <HelpIconAndText name="clipboard-outline" type={IconType.MaterialCommunityIcons}>
            L’exporter au format texte pour le partager facilement
          </HelpIconAndText>
        </HelpListContainer>

        <HelpText>À vous de choisir le set parfait pour franchir la ligne d’arrivée en tête !</HelpText>
      </>
    ),
    config: { backgroundColor: "#59b2ab" },
  },
];

export default HelpSearchSetScreen;
