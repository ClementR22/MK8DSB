import React from "react";
import { Text } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import Button from "@/primitiveComponents/Button";
import { HelpFullWidthContainer, HelpIconAndText, HelpListContainer, HelpText, HelpTitle } from "./HelpModal";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import ButtonAndHelpmodal from "./ButtonAndHelpmodal";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import BoxContainer from "@/primitiveComponents/BoxContainer";

const HelpSearchSetScreen = () => {
  return <ButtonAndHelpmodal slides={slides} />;
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

        <HelpFullWidthContainer paddingHorizontal={26}>
          <StatSliderPreview name="speedGround" />
        </HelpFullWidthContainer>
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
        <HelpTitle fontSize={18}>Comparer les résultats</HelpTitle>

        <HelpText>
          Une fois la recherche lancée, vous obtenez une sélection de sets correspondant à vos critères.
        </HelpText>

        <HelpText>
          Les statistiques que vous avez choisies s’affichent pour chaque set. Idéal pour les comparer rapidement.
        </HelpText>

        <BoxContainer margin={0} marginTop={8} widthContainer={220}>
          <StatSliderCompact name="spdG" value={5} statFilterNumber={0} chosenValue={4} isInSetCard={true} />
        </BoxContainer>

        <HelpText>
          💡 Astuce : appuyez sur une barre pour voir le bonus temporairement, ou double-cliquez pour l’afficher en
          permanence.
        </HelpText>
      </>
    ),
    config: { backgroundColor: "#59b2ab" },
  },
  {
    content: (
      <>
        <HelpTitle fontSize={18}>Et ensuite ?</HelpTitle>
        <HelpText>Pour chaque set affiché, vous pouvez :</HelpText>
        <HelpListContainer>
          <HelpIconAndText name="heart-outline" type={IconType.MaterialCommunityIcons}>
            L’ajouter à vos favoris pour le retrouver plus tard
          </HelpIconAndText>

          <HelpIconAndText name="compare" type={IconType.MaterialCommunityIcons}>
            Le comparer avec d’autres pour faire le meilleur choix
          </HelpIconAndText>

          <HelpIconAndText name="clipboard-outline" type={IconType.MaterialCommunityIcons}>
            L’exporter au format texte pour le partager facilement
          </HelpIconAndText>
        </HelpListContainer>
        <HelpText style={{ marginTop: 6 }}>
          🏁 Choisissez le meilleur set pour franchir la ligne d’arrivée en tête !
        </HelpText>
      </>
    ),
    config: { backgroundColor: "#59b2ab" },
  },
];

export default HelpSearchSetScreen;
