import React, { memo } from "react";
import { View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import { PADDING_SET_CARD, SET_CARD_WIDTH } from "@/utils/designTokens";
import Button from "@/primitiveComponents/Button";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import StatGaugeSetCardBar from "../statGauge/StatGaugeSetCardBar";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";

const HelpSearchSetScreen = () => {
  return (
    <HelpModal title="guideSetBuilder">
      <Text role="body" size="large" weight="bold" namespace="helpsearch">
        Créez la combinaison idéale
      </Text>
      <Text role="body" size="large" textAlign="center" namespace="helpsearch">
        en définissant les statistiques que vous souhaitez. L'algorithme trouvera pour vous les meilleurs sets
        correspondants.
      </Text>

      <HelpSection title="🎯 Comment utiliser le Set Builder" contentType="step">
        <HelpStepItem key={1} stepChar={"1"} title="Choisissez vos critères">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="Ajouter une statistique"
          />
        </HelpStepItem>

        <HelpStepItem key={2} stepChar={"2"} title="Ajustez les valeurs et la tolérance">
          <StatSliderPreview name="speedGround" />
          <Text role="body" size="large" namespace="helpsearch">
            appuyez longuement pour supprimer
          </Text>
          <Text role="body" size="large" fontStyle="italic" namespace="helpsearch">
            {"≈ : valeur approximative" + "\n" + "= : valeur exacte" + "\n" + "≥ : valeur minimale"}
          </Text>
        </HelpStepItem>

        <HelpStepItem key={3} stepChar={"3"} title={"Lancez la recherche"} alignItems="center">
          <Button onPress={() => {}} iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
            search
          </Button>
        </HelpStepItem>

        <HelpStepItem key={4} stepChar={"4"} title="Analysez les résultats" alignItems="center">
          <Text role="body" size="large" namespace="helpsearch">
            Les sets sont classés par score de correspondance
          </Text>
          <View style={{ width: SET_CARD_WIDTH - PADDING_SET_CARD * 2 }}>
            <StatGaugeContainer name="speedGround" value={4} isInSetCard={true} chosenValue={5} bonusEnabled={true}>
              <StatGaugeSetCardBar obtainedValue={4} chosenValue={5} isInSearchScreen={true} />
            </StatGaugeContainer>
          </View>
          <Text role="body" size="large" fontStyle="italic" namespace="helpsearch">
            Appuyez sur une barre pour voir l'écart avec votre critère
          </Text>
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="⚙️ Options avancées" contentType="step">
        <HelpStepItem key={"A"} stepChar={"A"} title="Personnalisation de l'affichage">
          <HelpButtonDescription
            iconName="checkbox-multiple-marked"
            iconType={IconType.MaterialCommunityIcons}
            description="Choisissez quelles statistiques afficher dans les résultats"
          />
        </HelpStepItem>

        <HelpStepItem key={"B"} stepChar={"B"} title="Filtres (option)">
          <HelpButtonDescription
            iconName="pin"
            iconType={IconType.MaterialCommunityIcons}
            description="Sélectionner un personnage, kart, roue ou aile à imposer"
          />
        </HelpStepItem>

        <HelpStepItem key={"C"} stepChar={"C"} title="Réutiliser les stats d'un set">
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
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="💾 Gestion des résultats" contentType="button">
        <HelpButtonDescription
          iconName="heart-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="Sauvegarder dans vos favoris"
        />

        <HelpButtonDescription
          iconName="compare"
          iconType={IconType.MaterialCommunityIcons}
          description="Déplacer dans le comparateur de set"
        />

        <HelpButtonDescription
          iconName="clipboard-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="Exporter le set"
        />
      </HelpSection>

      <HelpHighlightBox type="tips" title="Conseil pratique">
        <Text role="body" size="large" namespace="helpsearch">
          Commencez avec 2-3 statistiques principales pour des résultats plus pertinents
        </Text>
      </HelpHighlightBox>
    </HelpModal>
  );
};

export default memo(HelpSearchSetScreen);
