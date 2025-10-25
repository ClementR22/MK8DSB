import React, { memo } from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import StatGaugeCompare from "../statGaugeCompare/StatGaugeCompare";
import { PAGES_NAVIGATOR_DOTS_BUTTON_SIZE } from "../elementPickerCompact/PagesNavigator";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";

const HelpDisplaySetScreen = () => {
  return (
    <HelpModal title="Guide du Comparateur de Sets">
      <Text role="body" size="large" weight="bold" namespace="helpDisplay">
        Comparez
      </Text>
      <Text role="body" size="large" textAlign="center" namespace="helpDisplay">
        jusqu'à 12 sets simultanément pour identifier le set qui vous convient.
      </Text>

      <HelpSection title="🎯 Comment utiliser le Comparateur" contentType="step">
        <HelpStepItem key={1} stepChar={"1"} title="Ajoutez vos sets à comparer">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="Créer un nouveau set"
          />
        </HelpStepItem>

        <HelpStepItem key={2} stepChar={"2"} title="Modifiez les sets rapidement">
          <HelpButtonDescription
            iconName="pencil"
            iconType={IconType.MaterialCommunityIcons}
            description="Cliquez sur le crayon pour modifier les éléments d'un set"
          />
        </HelpStepItem>

        <HelpStepItem key={3} stepChar={"3"} title="Visualisez les différences">
          <StatGaugeCompare
            name="speedGround"
            setsIdAndValue={[
              { id: "1", value: 5, color: "#E74C3C" },
              { id: "2", value: 3, color: "#3498DB" },
              { id: "3", value: 7, color: "#2ECC71" },
            ]}
          />
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            Chaque couleur = un set différent. Appuyez sur une barre pour naviguer vers le set correspondant.
          </Text>
        </HelpStepItem>

        <HelpStepItem key={4} stepChar={"4"} title="Modifier les stats à comparer">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="Choisissez les statistiques à afficher"
            containerSize={PAGES_NAVIGATOR_DOTS_BUTTON_SIZE}
          />
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="⚙️ Options avancées" contentType="step">
        <HelpStepItem key={"A"} stepChar={"A"} title="Importer un set depuis les favoris">
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
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            Cliquez longuement sur un bouton de tri pour afficher son nom
          </Text>
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="💾 Actions disponibles" contentType="button">
        <HelpButtonDescription
          iconName="heart-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="Sauvegarder dans vos favoris"
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
      </HelpSection>

      <HelpHighlightBox type="tips" title="Conseil pratique">
        Limitez-vous à 2-3 sets pour une comparaison claire, et concentrez-vous sur vos statistiques prioritaires.
      </HelpHighlightBox>
    </HelpModal>
  );
};

export default memo(HelpDisplaySetScreen);
