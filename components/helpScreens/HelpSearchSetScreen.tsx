import React from "react";
import { Text } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import ButtonAndHelpmodal from "./ButtonAndHelpmodal";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import HelpTitle from "../helpComponents/HelpTitle";
import HelpListContainer from "../helpComponents/HelpListContainer";
import HelpText from "../helpComponents/HelpText";
import HelpFullWidthContainer from "../helpComponents/HelpFullWidthContainer";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpFeatureItem from "../helpComponents/HelpFeatureItem";
import HelpBoldText from "../helpComponents/HelpBoldText";

const HelpSearchSetScreen = () => {
  return <ButtonAndHelpmodal slides={slides} />;
};

const slides = [
  <>
    <HelpTitle>Le Set Builder</HelpTitle>

    <HelpHighlightBox type="info">
      <HelpBoldText>Trouvez la combinaison parfaite</HelpBoldText> en définissant vos statistiques souhaitées.
      L'algorithme vous proposera les meilleurs sets correspondants.
    </HelpHighlightBox>

    <HelpFullWidthContainer paddingHorizontal={26}>
      <StatSliderPreview name="speedGround" />
    </HelpFullWidthContainer>
  </>,

  <>
    <HelpTitle>🎯 Les composants</HelpTitle>

    <HelpListContainer>
      <HelpFeatureItem
        iconName="plus"
        iconType={IconType.MaterialCommunityIcons}
        title="Ajouter une statistique"
        description="Définissez les stats importantes pour votre style de jeu (vitesse, accélération, etc.)"
      />
      <HelpFeatureItem
        iconName="pin"
        iconType={IconType.MaterialCommunityIcons}
        title="Filtrer par éléments"
        description="Imposez un personnage, véhicule ou roue spécifique si désiré"
      />
      <HelpFeatureItem
        iconName="numbers"
        iconType={IconType.MaterialIcons}
        title="Nombre de résultats"
        description="Définissez combien de sets vous voulez voir (par défaut : 10)"
      />
      <HelpFeatureItem
        iconName="cards-outline"
        iconType={IconType.MaterialCommunityIcons}
        title="Charger depuis les favoris"
        description="Utilisez une recherche précédemment sauvegardée"
      />
      <HelpFeatureItem
        iconName="approximately-equal"
        iconType={IconType.MaterialCommunityIcons}
        title="Niveau d'exigence"
        description="Ajustez la précision : exacte, supérieure ou proche de vos critères"
      />
    </HelpListContainer>
  </>,

  <>
    <HelpTitle>📋 Comment procéder</HelpTitle>

    <HelpListContainer>
      <HelpStepItem
        stepChar="1"
        title="Définissez vos priorités"
        description="Ajoutez les statistiques importantes avec leurs valeurs souhaitées"
      />

      <HelpStepItem
        stepChar="2"
        title="Affinez si nécessaire"
        description="Ajoutez des filtres ou ajustez le niveau d'exigence"
      />

      <HelpStepItem
        stepChar="3"
        title="Lancez la recherche"
        description="Cliquez sur 'Search' pour obtenir vos résultats optimaux"
      />

      <HelpStepItem
        stepChar="4"
        title="Explorez les sets"
        description="Parcourez les combinaisons proposées avec leur pourcentage de correspondance"
      />
    </HelpListContainer>
  </>,

  <>
    <HelpTitle>📊 Analyser les résultats</HelpTitle>

    <HelpText>Les sets sont classés par pourcentage de correspondance avec vos critères.</HelpText>

    <HelpFullWidthContainer>
      <BoxContainer margin={0} marginTop={8} widthContainer={220}>
        <StatSliderCompact name="spdG" value={5} statFilterNumber={0} chosenValue={4} isInSetCard={true} />
      </BoxContainer>
    </HelpFullWidthContainer>

    <HelpText style={{ fontStyle: "italic", color: "#6b7280", fontSize: 12 }}>
      💡 Astuce : Appuyez sur une barre pour basculer entre le résultat et l'écart
    </HelpText>
  </>,

  <>
    <HelpTitle>⭐ Gérer vos sets</HelpTitle>

    <HelpText>Pour chaque set trouvé, vous pouvez :</HelpText>

    <HelpListContainer>
      <HelpFeatureItem
        iconName="heart-outline"
        iconType={IconType.MaterialCommunityIcons}
        title="Ajouter aux favoris"
        description="Sauvegardez vos sets préférés pour les retrouver facilement"
        withBackground={false}
      />

      <HelpFeatureItem
        iconName="compare"
        iconType={IconType.MaterialCommunityIcons}
        title="Comparer plusieurs sets"
        description="Analysez côte à côte pour faire le meilleur choix"
        withBackground={false}
      />

      <HelpFeatureItem
        iconName="clipboard-outline"
        iconType={IconType.MaterialCommunityIcons}
        title="Exporter"
        description="Envoyez votre set optimal à vos amis coureurs !"
        withBackground={false}
      />
    </HelpListContainer>

    <HelpHighlightBox type="tips" title="🏆 Conseils d'utilisation">
      <Text style={{ color: "#92400e", fontSize: 12, marginTop: 8, lineHeight: 16 }}>
        • Commencez par 2-3 stats maximum pour de meilleurs résultats{"\n"}• Utilisez "≈" pour plus de flexibilité dans
        vos critères{"\n"}• Sauvegardez vos recherches fréquentes en favoris
      </Text>
    </HelpHighlightBox>

    <HelpText
      style={{
        marginTop: 16,
        fontWeight: "600",
        textAlign: "center",
        color: "#059669",
        fontSize: 14,
      }}
    >
      🏁 Prêt à dominer les circuits ? C'est parti !
    </HelpText>
  </>,
];

export default HelpSearchSetScreen;
