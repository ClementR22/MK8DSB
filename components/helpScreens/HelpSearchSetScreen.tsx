import React, { useState } from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpTitle from "../helpComponents/HelpTitle";
import HelpListContainer from "../helpComponents/HelpListContainer";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpFeatureItem from "../helpComponents/HelpFeatureItem";
import HelpText from "../helpComponents/HelpText";
import HelpBoldText from "../helpComponents/HelpBoldText";
import HelpSubtitle from "../helpComponents/HelpSubtitle";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import { Modal, Pressable, ScrollView, View } from "react-native";
import Button from "@/primitiveComponents/Button";
import { Text } from "react-native";
import StatSliderCompact from "../statSlider/StatSliderCompact";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import { SET_CARD_WIDTH } from "@/utils/designTokens";
import useGeneralStore from "@/stores/useGeneralStore";

const HelpSearchSetScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)}>
        <Text>Aide Set Builder</Text>
      </Pressable>

      {isVisible && (
        <Modal visible={isVisible} animationType="slide">
          <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }} scrollEnabled={isScrollEnable}>
            <HelpTitle>Guide du Set Builder</HelpTitle>

            <HelpHighlightBox type="info">
              <HelpBoldText>Créez la combinaison idéale</HelpBoldText> en définissant les statistiques que vous
              souhaitez. L'algorithme trouvera pour vous les meilleurs sets correspondants.
            </HelpHighlightBox>

            <HelpSubtitle>🎯 Comment utiliser le Set Builder</HelpSubtitle>

            <HelpListContainer>
              {/* Étape 1 */}
              <HelpStepItem stepChar="1" title="Choisissez vos critères">
                <HelpFeatureItem
                  iconName="plus"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Ajouter une statistique"
                />
              </HelpStepItem>

              {/* Étape 2 */}
              <HelpStepItem stepChar="2" title="Ajustez les valeurs et la tolérance">
                <StatSliderPreview name="speedGround" />
                <HelpText style={{ fontSize: 12, fontStyle: "italic" }}>
                  ≈ : valeur approximative | = : valeur exacte | ≥ : valeur minimale
                </HelpText>
              </HelpStepItem>

              {/* Étape 3 */}
              <HelpStepItem stepChar="3" title="Lancez la recherche" alignItems="center">
                <Button onPress={() => {}} iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
                  <Text>{translateToLanguage("Search", language)}</Text>
                </Button>
              </HelpStepItem>

              {/* Étape 4 */}
              <HelpStepItem stepChar="4" title="Analysez les résultats" alignItems="center">
                <HelpText>Les sets sont classés par pourcentage de correspondance</HelpText>
                <View style={{ width: SET_CARD_WIDTH - 11 }}>
                  <StatSliderCompact name="spdG" value={4} isInSetCard={true} chosenValue={5} />
                </View>
                <HelpText style={{ fontSize: 12 }}>Appuyez sur une barre pour voir l'écart avec votre critère</HelpText>
              </HelpStepItem>
            </HelpListContainer>

            <HelpSubtitle>⚙️ Options avancées</HelpSubtitle>

            <HelpListContainer>
              {/* Option 1 */}
              <HelpStepItem stepChar="A" title="Personnalisation de l'affichage">
                <HelpFeatureItem
                  iconName="checkbox-multiple-marked"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Choisissez quelles statistiques afficher dans les résultats"
                />
              </HelpStepItem>

              {/* Option 2 */}
              <HelpStepItem stepChar="B" title="Filtres (option)">
                <HelpFeatureItem
                  iconName="pin"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Sélectionner un personnage, kart, roue ou aile à imposer"
                />
              </HelpStepItem>

              {/* Option 3 */}
              <HelpStepItem stepChar="C" title="Réutiliser les stats d'un set">
                <HelpFeatureItem
                  iconName="cards-outline"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Ouvrez votre collection de sets favoris"
                />
                <HelpFeatureItem
                  iconName="download"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Importer les stats d'un set pour chercher des variantes"
                />
              </HelpStepItem>
            </HelpListContainer>

            <HelpSubtitle>💾 Gestion des résultats</HelpSubtitle>

            <HelpListContainer>
              <HelpFeatureItem
                iconName="heart-outline"
                iconType={IconType.MaterialCommunityIcons}
                title="Sauvegarder dans vos favoris"
              />
              <HelpFeatureItem
                iconName="compare"
                iconType={IconType.MaterialCommunityIcons}
                title="Déplacer dans le comparateur de sets"
              />
              <HelpFeatureItem
                iconName="clipboard-outline"
                iconType={IconType.MaterialCommunityIcons}
                title="Exporter le set"
              />
            </HelpListContainer>

            <HelpHighlightBox type="tips" title="Conseil pratique">
              <HelpText>Commencez avec 2-3 statistiques principales pour des résultats plus pertinents</HelpText>
            </HelpHighlightBox>

            <Button onPress={() => setIsVisible(false)} style={{ marginTop: 20 }}>
              <Text>Commencer</Text>
            </Button>
          </ScrollView>
        </Modal>
      )}
    </>
  );
};

export default HelpSearchSetScreen;
