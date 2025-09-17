import React from "react";
import { Text } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonAndHelpmodal from "./ButtonAndHelpmodal";
import StatGaugeCompare from "../statGaugeCompare/StatGaugeCompare";
import HelpText from "../helpComponents/HelpText";
import { PAGES_NAVIGATOR_DOTS_BUTTON_SIZE } from "../paginatedWrapper/PagesNavigator";
import HelpBoldText from "../helpComponents/HelpBoldText";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";

const HelpDisplaySetScreen = () => {
  return (
    <ButtonAndHelpmodal
      title="Guide du Comparateur de Sets"
      introHighlight={{
        content: (
          <>
            <HelpBoldText>Comparez</HelpBoldText> jusqu'à 12 sets simultanément pour identifier le set qui vous
            convient.
          </>
        ),
      }}
      sections={[
        {
          title: "🎯 Comment utiliser le Comparateur",
          items: [
            {
              type: "step",
              props: { stepChar: "1", title: "Ajoutez vos sets à comparer" },
              content: (
                <HelpButtonDescription
                  iconName="plus"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Créer un nouveau set"
                />
              ),
            },
            {
              type: "step",
              props: { stepChar: "2", title: "Modifiez les sets rapidement" },
              content: (
                <HelpButtonDescription
                  iconName="pencil"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Cliquez sur le crayon pour modifier les éléments d'un set"
                />
              ),
            },
            {
              type: "step",
              props: { stepChar: "3", title: "Visualisez les différences" },
              content: (
                <>
                  <StatGaugeCompare
                    name="speedGround"
                    setsIdAndValue={[
                      { id: "1", value: 5, color: "#E74C3C" },
                      { id: "2", value: 3, color: "#3498DB" },
                      { id: "3", value: 7, color: "#2ECC71" },
                    ]}
                    scrollToSetCard={() => {}}
                  />
                  <HelpText style={{ fontSize: 12, fontStyle: "italic" }}>
                    Chaque couleur = un set différent. Appuyez sur une barre pour naviguer vers le set correspondant.
                  </HelpText>
                </>
              ),
            },
            {
              type: "step",
              props: { stepChar: "4", title: "Modifier les stats à comparer" },
              content: (
                <HelpButtonDescription
                  iconName="plus"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Choisissez les statistiques à afficher"
                  containerSize={PAGES_NAVIGATOR_DOTS_BUTTON_SIZE}
                />
              ),
            },
          ],
        },
        {
          title: "⚙️ Options avancées",
          items: [
            {
              type: "step",
              props: { stepChar: "A", title: "Importer un set depuis les favoris" },
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
                    description="Importer un set enregistré pour le comparer"
                  />
                </>
              ),
            },
            {
              type: "step",
              props: { stepChar: "B", title: "Trier les sets" },
              content: (
                <>
                  <HelpButtonDescription
                    iconName="sort"
                    iconType={IconType.MaterialCommunityIcons}
                    description="Ouvrez les différents tris possibles"
                  />
                  <HelpButtonDescription
                    iconName="sort-alphabetical-ascending"
                    iconType={IconType.MaterialCommunityIcons}
                    description="Selectionner le tri qui vous convient"
                  />
                  <HelpText style={{ fontSize: 12, fontStyle: "italic" }}>
                    Cliquez longuement sur un bouton de tri pour afficher son nom
                  </HelpText>
                </>
              ),
            },
          ],
        },
        {
          title: "💾 Actions disponibles",
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
                iconName: "magnify",
                iconType: IconType.MaterialCommunityIcons,
              },
              content: "Copier les stats dans le Set Builder et utiliser comme base de recherche",
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
        <HelpText>
          Limitez-vous à 2-3 sets pour une comparaison claire, et concentrez-vous sur vos statistiques prioritaires.
        </HelpText>
      }
    />
  );
};

export default HelpDisplaySetScreen;
