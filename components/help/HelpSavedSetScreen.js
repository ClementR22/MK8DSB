import React from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import { HelpIconAndText, HelpListContainer, HelpText, HelpTitle } from "./HelpModal";
import ButtonAndHelpmodal from "./ButtonAndHelpmodal";

const HelpSavedSetScreen = () => {
  return <ButtonAndHelpmodal slides={slides} />;
};

const slides = [
  {
    content: (
      <>
        <HelpTitle>Gérez vos sets favoris</HelpTitle>

        <HelpText>
          Retrouvez ici tous les sets que vous avez sauvegardés pour les modifier, les trier ou les réutiliser.
        </HelpText>

        <HelpListContainer>
          <HelpIconAndText name="pencil" type={IconType.MaterialCommunityIcons}>
            Modifier les éléments d'un set (personnage, roues, aile, ...)
          </HelpIconAndText>

          <HelpIconAndText name="checkbox-multiple-marked" type={IconType.MaterialCommunityIcons}>
            Choisir les statistiques à afficher : affichez uniquement celles qui comptent pour vous
          </HelpIconAndText>

          <HelpIconAndText name="sort" type={IconType.MaterialCommunityIcons}>
            Trier vos sets
          </HelpIconAndText>

          <HelpIconAndText name="download" type={IconType.Feather}>
            Importer un set partagé par un ami et l’ajouter à votre collection
          </HelpIconAndText>
        </HelpListContainer>

        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SetNameInputPreview name="Renommer vos sets" />
        </View> */}
      </>
    ),
    config: { backgroundColor: "#a18cd1" },
  },
  {
    content: (
      <>
        <HelpTitle>Et ensuite ?</HelpTitle>

        <HelpText>Pour chaque set affiché, vous pouvez :</HelpText>

        <HelpListContainer>
          <HelpIconAndText name="compare" type={IconType.MaterialCommunityIcons}>
            Le comparer avec d’autres pour faire le meilleur choix
          </HelpIconAndText>

          <HelpIconAndText name="magnify" type={IconType.MaterialCommunityIcons}>
            Réutilisez ses stats dans l'écran de recherche pour trouver des variantes similaires
          </HelpIconAndText>

          <HelpIconAndText name="clipboard-outline" type={IconType.MaterialCommunityIcons}>
            L’exporter au format texte pour le partager facilement
          </HelpIconAndText>
        </HelpListContainer>

        <HelpText>Ces outils vous permettent de garder une collection claire et efficace.</HelpText>
      </>
    ),
    config: { backgroundColor: "#a18cd1" },
  },
];

export default HelpSavedSetScreen;
