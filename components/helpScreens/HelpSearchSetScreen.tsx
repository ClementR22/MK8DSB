import React, { memo } from "react";
import { View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import { SET_CARD_WIDTH } from "@/utils/designTokens";
import Button from "@/primitiveComponents/Button";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import StatGaugeSetCardBar from "../statGauge/StatGaugeSetCardBar";
import Text from "@/primitiveComponents/Text";

const HelpSearchSetScreen = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <HelpModal
      title="Guide du Set Builder"
      intro={{
        content: (
          <>
            <Text role="body" size="large" weight="bold">
              Créez la combinaison idéale
            </Text>
            {"\n"}
            en définissant les statistiques que vous souhaitez. L'algorithme trouvera pour vous les meilleurs sets
            correspondants.
          </>
        ),
      }}
      sections={[
        {
          title: "🎯 Comment utiliser le\nSet Builder",
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
                  <Text role="body" size="large">
                    appuyez longuement pour supprimer
                  </Text>
                  <Text role="body" size="large" fontStyle="italic">
                    {"≈ : valeur approximative" + "\n" + "= : valeur exacte" + "\n" + "≥ : valeur minimale"}
                  </Text>
                </>
              ),
            },
            {
              type: "step",
              props: { stepChar: "3", title: "Lancez la recherche", alignItems: "center" },
              content: (
                <Button onPress={() => {}} iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
                  {translateToLanguage("Search", language)}
                </Button>
              ),
            },
            {
              type: "step",
              props: { stepChar: "4", title: "Analysez les résultats", alignItems: "center" },
              content: (
                <>
                  <Text role="body" size="large">
                    Les sets sont classés par score de correspondance
                  </Text>
                  <View style={{ width: SET_CARD_WIDTH - 11 }}>
                    <StatGaugeContainer name="SG" value={4} isInSetCard={true} chosenValue={5} bonusEnabled={true}>
                      <StatGaugeSetCardBar obtainedValue={4} chosenValue={5} isInSearchScreen={true} />
                    </StatGaugeContainer>
                  </View>
                  <Text role="body" size="large" fontStyle="italic">
                    Appuyez sur une barre pour voir l'écart avec votre critère
                  </Text>
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
        <Text role="body" size="large">
          Commencez avec 2-3 statistiques principales pour des résultats plus pertinents
        </Text>
      }
    />
  );
};

export default memo(HelpSearchSetScreen);
