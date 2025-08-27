import React from "react";
import { Text } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonAndHelpmodal from "./ButtonAndHelpmodal";
import StatSliderCompare from "../statSliderCompare/StatSliderCompare";
import HelpTitle from "../helpComponents/HelpTitle";
import HelpListContainer from "../helpComponents/HelpListContainer";
import HelpText from "../helpComponents/HelpText";
import HelpFullWidthContainer from "../helpComponents/HelpFullWidthContainer";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpFeatureItem from "../helpComponents/HelpFeatureItem";
import HelpBoldText from "../helpComponents/HelpBoldText";
import { PAGES_NAVIGATOR_DOTS_BUTTON_SIZE } from "../paginatedWrapper/PagesNavigator";

const HelpDisplaySetScreen = () => {
  return <ButtonAndHelpmodal slides={slides} />;
};

const slides = [
  <>
    <HelpTitle>Le Comparateur de Sets</HelpTitle>

    <HelpHighlightBox type="info">
      <HelpBoldText>Visualisez et comparez</HelpBoldText> tous vos sets en un seul écran. Analysez leurs performances
      côte à côte pour faire le meilleur choix.
    </HelpHighlightBox>

    <HelpFullWidthContainer>
      <StatSliderCompare
        name="speedGround"
        setsIdAndValue={[{ id: "1", value: 5, color: "red" }]}
        scrollToSetCard={() => {}}
      />
    </HelpFullWidthContainer>

    <HelpText style={{ fontStyle: "italic", color: "#6b7280", fontSize: 12 }}>
      💡 Chaque barre représente un set différent
    </HelpText>
  </>,

  <>
    <HelpTitle>🎮 Les fonctionnalités</HelpTitle>

    <HelpListContainer>
      <HelpFeatureItem
        iconName="plus"
        iconType={IconType.MaterialCommunityIcons}
        title="Ajouter des sets"
        description="Créez jusqu'à 12 sets différents pour les comparer ensemble"
      />
      <HelpFeatureItem
        iconName="pencil"
        iconType={IconType.MaterialCommunityIcons}
        title="Modifier facilement"
        description="Changez personnage, véhicule, roues... et voyez l'impact sur les stats"
      />
      <HelpFeatureItem
        iconName="cards-outline"
        iconType={IconType.MaterialCommunityIcons}
        title="Charger des favoris"
        description="Importez vos sets sauvegardés pour les modifier ou comparer"
      />
      <HelpFeatureItem
        iconName="plus"
        iconType={IconType.MaterialCommunityIcons}
        containerSize={PAGES_NAVIGATOR_DOTS_BUTTON_SIZE}
        title="Choisir les stats à comparer"
        description="Sélectionnez les statistiques à afficher puis naviguez avec les flèches"
      />
    </HelpListContainer>
  </>,

  <>
    <HelpTitle>🔧 Comment personnaliser</HelpTitle>

    <HelpListContainer>
      <HelpStepItem
        stepChar="1"
        title="Ajoutez vos sets"
        description="Créez ou chargez les combinaisons que vous voulez comparer"
      />

      <HelpStepItem
        stepChar="2"
        title="Modifiez les éléments"
        description="Cliquez sur le crayon d'un set pour modifier ses éléments"
      />

      <HelpStepItem
        stepChar="3"
        title="Filtrez les stats"
        description="Sélectionnez uniquement les statistiques importantes pour vous"
      />

      <HelpStepItem
        stepChar="4"
        title="Analysez et comparez"
        description="Observez les différences et trouvez le set optimal"
      />
    </HelpListContainer>
  </>,

  <>
    <HelpTitle>📊 Interpréter les barres</HelpTitle>

    <HelpText>
      Chaque couleur représente un set différent. Analysez facilement les différences entre vos combinaisons.
    </HelpText>

    <HelpFullWidthContainer>
      <StatSliderCompare
        name="speedGround"
        setsIdAndValue={[{ id: "1", value: 5, color: "red" }]}
        scrollToSetCard={() => {}}
      />
    </HelpFullWidthContainer>

    <HelpHighlightBox type="tips" title="🎯 Astuce de lecture">
      <Text style={{ color: "#92400e", fontSize: 12, marginTop: 8, lineHeight: 16 }}>
        • Rouge = Set 1, Bleu = Set 2, Vert = Set 3...{"\n"}• Appuyez sur une barre pour naviguer vers la carte du set
        {"\n"}• Masquez les stats moins importantes pour plus de clarté
      </Text>
    </HelpHighlightBox>
  </>,

  <>
    <HelpTitle>⭐ Gérer vos sets</HelpTitle>

    <HelpText>Une fois vos sets comparés, vous pouvez :</HelpText>

    <HelpListContainer>
      <HelpFeatureItem
        iconName="heart-outline"
        iconType={IconType.MaterialCommunityIcons}
        title="Sauvegarder en favoris"
        description="Gardez vos meilleures combinaisons pour plus tard"
        withBackground={false}
      />

      <HelpFeatureItem
        iconName="magnify"
        iconType={IconType.MaterialCommunityIcons}
        title="Rechercher des variantes"
        description="Utilisez les stats d'un set pour trouver des alternatives similaires"
        withBackground={false}
      />

      <HelpFeatureItem
        iconName="clipboard-outline"
        iconType={IconType.MaterialCommunityIcons}
        title="Partager facilement"
        description="Exportez vos sets optimaux pour vos amis coureurs"
        withBackground={false}
      />
    </HelpListContainer>

    <HelpHighlightBox type="tips" title="🏆 Conseils de comparaison">
      <Text style={{ color: "#92400e", fontSize: 12, marginTop: 8, lineHeight: 16 }}>
        • Comparez 2-3 sets maximum pour une lecture claire{"\n"}• Concentrez-vous sur vos stats prioritaires{"\n"}•
        N'hésitez pas à modifier en temps réel pour tester
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
      🏁 Trouvez votre combinaison gagnante !
    </HelpText>
  </>,
];

export default HelpDisplaySetScreen;
