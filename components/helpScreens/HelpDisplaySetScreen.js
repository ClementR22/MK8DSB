import React, { useState } from "react";
import { Text, Modal, Pressable, ScrollView, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import Button from "@/primitiveComponents/Button";
import StatSliderCompare from "../statSliderCompare/StatSliderCompare";
import HelpTitle from "../helpComponents/HelpTitle";
import HelpListContainer from "../helpComponents/HelpListContainer";
import HelpText from "../helpComponents/HelpText";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpFeatureItem from "../helpComponents/HelpFeatureItem";
import HelpBoldText from "../helpComponents/HelpBoldText";
import HelpSubtitle from "../helpComponents/HelpSubtitle";
import HelpFullWidthContainer from "../helpComponents/HelpFullWidthContainer";
import { PAGES_NAVIGATOR_DOTS_BUTTON_SIZE } from "../paginatedWrapper/PagesNavigator";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import useGeneralStore from "@/stores/useGeneralStore";

const HelpDisplaySetScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const language = useLanguageStore((state) => state.language);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)}>
        <Text>Aide Comparateur de Sets</Text>
      </Pressable>

      {isVisible && (
        <Modal visible={isVisible} animationType="slide">
          <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }} scrollEnabled={isScrollEnable}>
            <HelpTitle>Guide du Comparateur de Sets</HelpTitle>

            <HelpHighlightBox type="info">
              <HelpBoldText>Comparez</HelpBoldText> jusqu'à 12 sets simultanément pour identifier le set qui vous
              convient.
            </HelpHighlightBox>

            <HelpSubtitle>🎯 Comment utiliser le Comparateur</HelpSubtitle>

            <HelpListContainer>
              {/* Étape 1 */}
              <HelpStepItem stepChar="1" title="Ajoutez vos sets à comparer">
                <HelpFeatureItem
                  iconName="plus"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Créer un nouveau set"
                />
              </HelpStepItem>

              {/* Étape 2 */}
              <HelpStepItem stepChar="2" title="Modifiez les sets rapidement">
                <HelpFeatureItem
                  iconName="pencil"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Cliquez sur le crayon pour modifier les éléments d'un set"
                />
              </HelpStepItem>

              {/* Étape 3 */}
              <HelpStepItem stepChar="3" title="Visualisez les différences">
                <HelpFullWidthContainer>
                  <StatSliderCompare
                    name="speedGround"
                    setsIdAndValue={[
                      { id: "1", value: 5, color: "#E74C3C" },
                      { id: "2", value: 3, color: "#3498DB" },
                      { id: "3", value: 7, color: "#2ECC71" },
                    ]}
                    scrollToSetCard={() => {}}
                    width={"100%"}
                  />
                </HelpFullWidthContainer>
                <HelpText style={{ fontSize: 12, fontStyle: "italic" }}>
                  Chaque couleur = un set différent. Appuyez sur une barre pour naviguer vers le set correspondant.
                </HelpText>
              </HelpStepItem>

              {/* Étape 4 */}
              <HelpStepItem stepChar="4" title="Modifier les stats à comparer" alignItems="center">
                <HelpFeatureItem
                  iconName="plus"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Choisissez les statistiques à afficher"
                  containerSize={PAGES_NAVIGATOR_DOTS_BUTTON_SIZE}
                />
              </HelpStepItem>
            </HelpListContainer>

            <HelpSubtitle>⚙️ Options avancées</HelpSubtitle>

            <HelpListContainer>
              {/* Option 1 */}
              <HelpStepItem stepChar="A" title="Importer un set">
                <HelpFeatureItem
                  iconName="cards-outline"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Ouvrez votre collection de sets favoris"
                />
                <HelpFeatureItem
                  iconName="download"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Importer un set enregistré pour le comparer"
                />
              </HelpStepItem>

              {/* Option 2 */}
              <HelpStepItem stepChar="B" title="Trier les sets">
                <HelpFeatureItem
                  iconName="sort"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Ouvrez les différents tris possibles"
                />
                <HelpFeatureItem
                  iconName="sort-alphabetical-ascending"
                  iconType={IconType.MaterialCommunityIcons}
                  title="Selectionner le tri qui vous convient"
                />
                <HelpText style={{ fontSize: 12, fontStyle: "italic" }}>
                  Cliquez longuement sur un bouton de tri pour afficher son nom
                </HelpText>
              </HelpStepItem>
            </HelpListContainer>

            <HelpSubtitle>💾 Actions disponibles</HelpSubtitle>

            <HelpListContainer>
              <HelpFeatureItem
                iconName="heart-outline"
                iconType={IconType.MaterialCommunityIcons}
                title="Sauvegarder dans vos favoris"
              />
              <HelpFeatureItem
                iconName="magnify"
                iconType={IconType.MaterialCommunityIcons}
                title="Copier les stats dans le Set Builder"
              />
              <HelpFeatureItem
                iconName="clipboard-outline"
                iconType={IconType.MaterialCommunityIcons}
                title="Exporter le set"
              />
            </HelpListContainer>

            <HelpHighlightBox type="tips" title="Conseil pratique">
              <HelpText>
                Limitez-vous à 2-3 sets pour une comparaison claire, et concentrez-vous sur vos statistiques
                prioritaires.
              </HelpText>
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

export default HelpDisplaySetScreen;
