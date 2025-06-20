import React from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import { HelpFullWidthContainer, HelpIconAndText, HelpListContainer, HelpText, HelpTitle } from "./HelpModal";
import ButtonAndHelpmodal from "./ButtonAndHelpmodal";
import StatSliderCompare from "../statSliderCompare/StatSliderCompare";

const HelpDisplaySetScreen = () => {
  return <ButtonAndHelpmodal slides={slides} />;
};

const slides = [
  {
    content: (
      <>
        <HelpTitle>Explorer vos Sets</HelpTitle>

        <HelpText>L'écran Display vous permet de visualiser et comparer vos sets en détail.</HelpText>
        <HelpText>
          Ajoutez autant de sets que vous voulez et comparez facilement leurs performances grâce aux barres de stats
          interactives
        </HelpText>

        <HelpFullWidthContainer>
          <StatSliderCompare name={"speedGround"} stat_i_multipleSetStats={[4, 3]} />
        </HelpFullWidthContainer>

        <HelpText>Chaque barre de stats représente les performances d’un set distinct</HelpText>
      </>
    ),
    config: { backgroundColor: "#5d8aa8" },
  },
  {
    content: (
      <>
        <HelpTitle>Modifier et Comparer</HelpTitle>

        <HelpListContainer>
          <HelpIconAndText name="edit" type={IconType.MaterialIcons} isButton={true}>
            Modifier les éléments d'un set (personnage, roues, aile, ...) tout est personnalisable
          </HelpIconAndText>

          <HelpIconAndText name="plus" type={IconType.MaterialCommunityIcons} isButton={true}>
            Ajoutez de nouveaux sets à comparer en un clic
          </HelpIconAndText>

          <HelpIconAndText name="checkbox-multiple-marked" type={IconType.MaterialCommunityIcons} isButton={true}>
            Choisir les statistiques à afficher : affichez uniquement celles qui comptent pour vous
          </HelpIconAndText>

          <HelpIconAndText name="cards-outline" type={IconType.MaterialCommunityIcons} isButton={true}>
            Charger un set depuis vos favoris pour le modifier, le comparer ou vous en inspirer
          </HelpIconAndText>
        </HelpListContainer>
      </>
    ),
    config: { backgroundColor: "#5d8aa8" },
  },
  {
    content: (
      <>
        <HelpTitle>Et ensuite ?</HelpTitle>

        <HelpText> Pour chaque set affiché, vous pouvez :</HelpText>

        <HelpListContainer>
          <HelpIconAndText name="heart-outline" type={IconType.MaterialCommunityIcons}>
            L'ajouter à vos favoris pour le retrouver plus tard
          </HelpIconAndText>

          <HelpIconAndText name="magnify" type={IconType.MaterialCommunityIcons}>
            Réutilisez ses stats dans l'écran de recherche pour trouver des variantes similaires
          </HelpIconAndText>

          <HelpIconAndText name="clipboard-outline" type={IconType.MaterialCommunityIcons}>
            {/* // clipboard-outline */}
            L’exporter au format texte pour le partager facilement
          </HelpIconAndText>
        </HelpListContainer>

        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SetNameInputPreview name="Le renommer" />
        </View> */}

        <HelpText>Gérez vos sets comme un pro !</HelpText>

        <HelpText>
          Comparez, personnalisez, sauvegardez : tout est fait pour vous aider à trouver le meilleur set selon votre
          style de jeu.
        </HelpText>

        <HelpIconAndText name="chart-bar" type={IconType.MaterialCommunityIcons}>
          Pourquoi pas cette icone.
        </HelpIconAndText>
      </>
    ),
    config: { backgroundColor: "#5d8aa8" },
  },
];

export default HelpDisplaySetScreen;
