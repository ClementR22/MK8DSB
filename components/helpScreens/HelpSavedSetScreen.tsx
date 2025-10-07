import React, { memo } from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";

const HelpFavoritesScreen = () => {
  return (
    <HelpModal title="Guide des Sets Favoris">
      <Text role="body" size="large" textAlign="center">
        <Text role="body" size="large" weight="bold">
          Centralisez et organisez
        </Text>{" "}
        tous vos sets préférés pour y accéder rapidement.
      </Text>

      <HelpSection title="🎯 Comment gérer vos sets favoris" contentType="step">
        <HelpStepItem key={1} stepChar={"1"} title="Enregister un nouveau set">
          <HelpButtonDescription
            iconName="heart-outline"
            iconType={IconType.MaterialCommunityIcons}
            description="Après avoir trouvé un set qui vous convient, enregistrez-le pour le retrouver ici"
          />
        </HelpStepItem>

        <HelpStepItem key={2} stepChar={"2"} title="Modifier les stats à afficher">
          <HelpButtonDescription
            iconName="checkbox-multiple-marked"
            iconType={IconType.MaterialCommunityIcons}
            description="Choisissez les statistiques à afficher"
          />
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="⚙️ Options avancées" contentType="step">
        <HelpStepItem key={"A"} stepChar={"A"} title="Importer un nouveau set">
          <HelpButtonDescription
            iconName="paste"
            iconType={IconType.FontAwesome5}
            description="Importer un set copié dans le presse-papier"
          />
        </HelpStepItem>

        <HelpStepItem key={"B"} stepChar={"B"} title="Trier les sets">
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
          <Text role="body" size="large" fontStyle="italic">
            Cliquez longuement sur un bouton de tri pour afficher son nom
          </Text>
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="⚙️ Actions disponibles" contentType="button">
        <HelpButtonDescription
          iconName="pencil"
          iconType={IconType.MaterialCommunityIcons}
          description="Modifier les éléments du set (personnage, kart, roues, ailes)"
        />

        <HelpButtonDescription
          iconName="compare"
          iconType={IconType.MaterialCommunityIcons}
          description="Ajouter au comparateur de sets"
        />

        <HelpButtonDescription
          iconName="magnify"
          iconType={IconType.MaterialCommunityIcons}
          description="Copier les stats dans le Set Builder et utiliser comme base de recherche"
        />

        <HelpButtonDescription
          iconName="clipboard-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="Exporter le set"
        />

        <HelpButtonDescription
          iconName="trash-can"
          iconType={IconType.MaterialCommunityIcons}
          description="Supprimer le set de vos favoris"
        />
      </HelpSection>
    </HelpModal>
  );
};

export default memo(HelpFavoritesScreen);
