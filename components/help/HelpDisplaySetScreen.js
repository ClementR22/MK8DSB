import React from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal, { HelpIconAndText, HelpListContainer, HelpText, HelpTitle } from "./HelpModal";

const HelpDisplaySetScreen = () => {
  return <HelpModal slides={slides} />;
};

const slides = [
  {
    content: (
      <>
        <HelpTitle>Explorer vos Sets</HelpTitle>

        <HelpText>L'écran Display vous permet de consulter en détail un ou plusieurs sets.</HelpText>
        <HelpText>
          Ajoutez autant de sets que vous voulez pour les comparer visuellement grâce aux barres de stats !
        </HelpText>
      </>
    ),
    config: { backgroundColor: "#5d8aa8" },
  },
  {
    content: (
      <>
        <HelpTitle>Modifier et Personnaliser</HelpTitle>

        <HelpListContainer>
          <HelpIconAndText name="edit" type={IconType.MaterialIcons} isButton={true}>
            Cliquez sur un élément (personnage, kart, roues...) pour le modifier instantanément
          </HelpIconAndText>

          <HelpIconAndText name="plus" type={IconType.MaterialCommunityIcons} isButton={true}>
            Ajoutez de nouveaux sets à comparer en un clic
          </HelpIconAndText>

          <HelpIconAndText name="checkbox-multiple-marked" type={IconType.MaterialCommunityIcons} isButton={true}>
            Choisir les statistiques à afficher dans les sliders affichés en dessous
          </HelpIconAndText>
        </HelpListContainer>
      </>
    ),
    config: { backgroundColor: "#5d8aa8" },
  },
  {
    content: (
      <>
        <HelpTitle>Favoris et Chargements</HelpTitle>

        <HelpListContainer>
          <HelpIconAndText name="heart-outline" type={IconType.MaterialCommunityIcons}>
            Enregistrez vos sets préférés en un clic
          </HelpIconAndText>

          <HelpIconAndText name="download" type={IconType.MaterialCommunityIcons}>
            Chargez un set depuis vos favoris pour l'analyser ou le modifier
          </HelpIconAndText>

          <HelpIconAndText name="arrow-right-bold-box-outline" type={IconType.MaterialCommunityIcons}>
            Exportez vos sets pour les partager ou les utiliser ailleurs dans l'app
          </HelpIconAndText>
        </HelpListContainer>

        <HelpText>Gérez vos sets comme un pro !</HelpText>

        <HelpIconAndText name="chart-bar" type={IconType.MaterialCommunityIcons}>
          Pourquoi pas cette icone.
        </HelpIconAndText>
      </>
    ),
    config: { backgroundColor: "#5d8aa8" },
  },
];

export default HelpDisplaySetScreen;
