import React, { useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonIcon from "@/components/ButtonIcon";
import StatSlider from "@/components/StatSlider";
import { IconType } from "react-native-dynamic-vector-icons";
import { translate } from "@/translations/translations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import ButtonLoadSet from "@/components/managingSetsPressable/ButtonLoadSet";
import ButtonAndModalForHelp from "@/components/modal/ButtonAndModalForHelp";
import HelpModal, { HelpIconAndText, HelpListContainer, HelpText, HelpTitle } from "./HelpModal";

const HelpSearchSetScreen = () => {
  return <HelpModal slides={slides} />;
};

const slides = [
  {
    content: (
      <>
        <HelpTitle>Trouver le set parfait</HelpTitle>

        <HelpText>
          Vous rêvez de trouver LE set parfaitement adapté à votre style de jeu ? Cet écran vous permet de rechercher
          des sets correspondant précisément aux statistiques que vous privilégiez.
        </HelpText>
        <HelpText>
          Utilisez les curseurs pour indiquer l'importance de chaque statistique dans votre recherche.
        </HelpText>
      </>
    ),
    config: { backgroundColor: "#59b2ab" },
  },
  {
    content: (
      <>
        <HelpTitle>Fonctionnalités</HelpTitle>

        <HelpListContainer>
          <HelpIconAndText name="plus" type={IconType.MaterialCommunityIcons} isButton={true}>
            Ajouter une statistique supplémentaire à prendre en compte dans la recherche
          </HelpIconAndText>

          <HelpIconAndText name="pin" type={IconType.MaterialCommunityIcons} isButton={true}>
            Imposer un ou plusieurs éléments (personnage, véhicule, roues, etc.)
          </HelpIconAndText>

          <HelpIconAndText name="numbers" type={IconType.MaterialIcons} isButton={true}>
            Définir le nombre maximum de résultats à afficher
          </HelpIconAndText>

          <HelpIconAndText name="checkbox-multiple-marked" type={IconType.MaterialCommunityIcons} isButton={true}>
            Choisir les statistiques à afficher dans les sets trouvés
          </HelpIconAndText>

          <HelpIconAndText name="cards-outline" type={IconType.MaterialCommunityIcons} isButton={true}>
            Charger les statistiques d'un set que vous avez déjà enregistré
          </HelpIconAndText>

          <HelpIconAndText name="approximately-equal" type={IconType.MaterialCommunityIcons} isButton={true}>
            Choisir le niveau d'exigence pour chaque statistique : valeur exacte, supérieure ou proche
          </HelpIconAndText>

          <HelpIconAndText name="cards-outline" type={IconType.MaterialCommunityIcons} isButton={true}>
            Charger les statistiques d'un set que vous avez déjà enregistré
          </HelpIconAndText>
        </HelpListContainer>

        <HelpText> Une fois vos critères définis, cliquez sur “Search” pour lancer la recherche !</HelpText>

        <Button icon={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
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
          Une fois la recherche lancée, vous découvrirez une sélection de sets correspondant à vos critères.
        </HelpText>

        <HelpText>Pour chaque set proposé, vous pourrez :</HelpText>

        <HelpListContainer>
          <HelpIconAndText name="heart-outline" type={IconType.MaterialCommunityIcons}>
            L'ajouter à vos favoris pour le retrouver facilement plus tard
          </HelpIconAndText>

          <HelpIconAndText name="compare" type={IconType.MaterialCommunityIcons}>
            Le comparer avec d'autres sets pour faire le meilleur choix
          </HelpIconAndText>

          <HelpIconAndText name="pencil-outline" type={IconType.MaterialCommunityIcons}>
            Le modifier à votre goût et l'enregistrer
          </HelpIconAndText>
        </HelpListContainer>

        <HelpText>C'est vous qui décidez du meilleur set pour passer la ligne d'arrivée en tête !</HelpText>
      </>
    ),
    config: { backgroundColor: "#59b2ab" },
  },
];

export default HelpSearchSetScreen;
