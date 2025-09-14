import React from "react";
import { Text, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonAndHelpmodal from "./ButtonAndHelpmodal";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { SET_CARD_WIDTH } from "@/utils/designTokens";
import Button from "@/primitiveComponents/Button";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import HelpBoldText from "../helpComponents/HelpBoldText";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import HelpText from "../helpComponents/HelpText";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";

const HelpSearchSetScreen = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <ButtonAndHelpmodal
      title="Guide du Set Builder"
      introHighlight={{
        content: (
          <>
            <HelpBoldText>Créez la combinaison idéale</HelpBoldText> en définissant les statistiques que vous souhaitez.
            L'algorithme trouvera pour vous les meilleurs sets correspondants.
          </>
        ),
      }}
      sections={[
        {
          title: "🎯 Comment utiliser le Set Builder",
          items: [
            {
              type: "step",
              props: { stepChar: "1", title: "Choisissez vos critères" },
              content: (
                <HelpButtonDescription
                  iconName="plus"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Ajouter une statistique"
                />
              ),
            },
            {
              type: "step",
              props: { stepChar: "2", title: "Ajustez les valeurs et la tolérance" },
              content: (
                <>
                  <StatSliderPreview name="speedGround" />
                  <HelpText style={{ fontSize: 12, fontStyle: "italic" }}>
                    ≈ : valeur approximative | = : valeur exacte | ≥ : valeur minimale
                  </HelpText>
                </>
              ),
            },
            {
              type: "step",
              props: { stepChar: "3", title: "Lancez la recherche", alignItems: "center" },
              content: (
                <Button onPress={() => {}} iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
                  <Text>{translateToLanguage("Search", language)}</Text>
                </Button>
              ),
            },
            {
              type: "step",
              props: { stepChar: "4", title: "Analysez les résultats", alignItems: "center" },
              content: (
                <>
                  <HelpText>Les sets sont classés par pourcentage de correspondance</HelpText>
                  <View style={{ width: SET_CARD_WIDTH - 11 }}>
                    <StatSliderCompact name="spdG" value={4} isInSetCard={true} chosenValue={5} />
                  </View>
                  <HelpText style={{ fontSize: 12 }}>
                    Appuyez sur une barre pour voir l'écart avec votre critère
                  </HelpText>
                </>
              ),
            },
          ],
        },
        {
          title: "⚙️ Options avancées",
          items: [
            {
              type: "step",
              props: { stepChar: "A", title: "Personnalisation de l'affichage" },
              content: (
                <HelpButtonDescription
                  iconName="checkbox-multiple-marked"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Choisissez quelles statistiques afficher dans les résultats"
                />
              ),
            },
            {
              type: "step",
              props: { stepChar: "B", title: "Filtres (option)" },
              content: (
                <HelpButtonDescription
                  iconName="pin"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Sélectionner un personnage, kart, roue ou aile à imposer"
                />
              ),
            },
            {
              type: "step",
              props: { stepChar: "C", title: "Réutiliser les stats d'un set" },
              content: (
                <>
                  <HelpButtonDescription
                    iconName="cards-outline"
                    iconType={IconType.MaterialCommunityIcons}
                    description="Ouvrez votre collection de sets favoris"
                  />
                  <HelpButtonDescription
                    iconName="download"
                    iconType={IconType.MaterialCommunityIcons}
                    description="Importer les stats d'un set pour chercher des variantes"
                  />
                </>
              ),
            },
          ],
        },
        {
          title: "💾 Gestion des résultats",
          items: [
            {
              type: "feature",
              props: {
                iconName: "heart-outline",
                iconType: IconType.MaterialCommunityIcons,
              },
              content: "Sauvegarder dans vos favoris",
            },
            {
              type: "feature",
              props: {
                iconName: "compare",
                iconType: IconType.MaterialCommunityIcons,
              },
              content: "Déplacer dans le comparateur de sets",
            },
            {
              type: "feature",
              props: {
                iconName: "clipboard-outline",
                iconType: IconType.MaterialCommunityIcons,
              },
              content: "Exporter le set",
            },
          ],
        },
      ]}
      outroAdviceHighlightContent={
        <HelpText>Commencez avec 2-3 statistiques principales pour des résultats plus pertinents</HelpText>
      }
    />
  );
};

export default HelpSearchSetScreen;
