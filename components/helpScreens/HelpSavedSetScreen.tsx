import React from "react";
import { Text, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import HelpBoldText from "../helpComponents/HelpBoldText";
import HelpText from "../helpComponents/HelpText";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";

const HelpFavoritesScreen = () => {
  return (
    <HelpModal
      title="Guide des Sets Favoris"
      intro={{
        content: (
          <>
            <HelpBoldText>Centralisez et organisez</HelpBoldText> tous vos sets préférés pour y accéder rapidement.
          </>
        ),
      }}
      sections={[
        {
          title: "🎯 Comment gérer vos sets favoris",
          items: [
            {
              type: "step",
              props: { stepChar: "1", title: "Enregister un nouveau set" },
              content: (
                <HelpButtonDescription
                  iconName="heart-outline"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Après avoir trouvé un set qui vous convient, enregistrez-le pour le retrouver ici"
                />
              ),
            },
            {
              type: "step",
              props: { stepChar: "2", title: "Modifier les stats à afficher" },
              content: (
                <HelpButtonDescription
                  iconName="checkbox-multiple-marked"
                  iconType={IconType.MaterialCommunityIcons}
                  description="Choisissez les statistiques à afficher"
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
              props: { stepChar: "A", title: "Importer un nouveau set" },
              content: (
                <HelpButtonDescription
                  iconName="paste"
                  iconType={IconType.FontAwesome5}
                  description="Importer un set copié dans le presse-papier"
                />
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
          title: "⚙️ Actions disponibles",
          items: [
            {
              type: "feature",
              props: {
                iconName: "pencil",
                iconType: IconType.MaterialCommunityIcons,
              },
              content: "Modifier les éléments du set (personnage, kart, roues, ailes)",
            },
            {
              type: "feature",
              props: {
                iconName: "compare",
                iconType: IconType.MaterialCommunityIcons,
              },
              content: "Ajouter au comparateur de sets",
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
            {
              type: "feature",
              props: {
                iconName: "trash-can",
                iconType: IconType.MaterialCommunityIcons,
              },
              content: "Supprimer le set de vos favoris",
            },
          ],
        },
      ]}
    />
  );
};

export default HelpFavoritesScreen;
