import React, { memo } from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";
import { sortsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";
import { Platform } from "react-native";

const HelpFavoritesScreen = () => {
  const game = useGameStore((state) => state.game);

  return (
    <HelpModal title="guideBuildCollection">
      {/* Intro */}
      <Text role="body" size="large" textAlign="center" namespace="not">
        <Text role="body" size="large" weight="bold" namespace="helpSave">
          intro.centralize
        </Text>
        <Text role="body" size="large" textAlign="center" namespace="helpSave">
          intro.description
        </Text>
      </Text>

      <HelpSection title="how_to_use_collection.title" namespace="helpSave" contentType="step">
        <HelpStepItem stepChar={"1"} title="how_to_use_collection.step.save_set" namespace="helpSave">
          <HelpButtonDescription
            iconName="content-save-outline"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use_collection.step.save_set.label_description"
            namespaceDescription="helpSave"
            tooltipText="save"
          />
        </HelpStepItem>

        <HelpStepItem stepChar={"2"} title="how_to_use_collection.step.choose_stats" namespace="helpSave">
          <HelpButtonDescription
            iconName="checkbox-multiple-marked"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use_collection.step.choose_stats.label_description"
            namespaceDescription="helpSave"
            tooltipText="displayedStatsInBuilds"
          />
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="advanced_options.title" namespace="helpSave" contentType="step">
        <HelpStepItem stepChar={"A"} title="advanced_options.step.import_set" namespace="helpSave">
          <HelpButtonDescription
            iconName="content-paste"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.import_set.label_description"
            namespaceDescription="helpSave"
            tooltipText="importACopiedBuild"
          />
        </HelpStepItem>

        <HelpStepItem stepChar={"B"} title="advanced_options.step.sort_sets" namespace="helpSave">
          <HelpButtonDescription
            iconName="sort"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.sort_sets.label_open_sorts"
            namespaceDescription="helpSave"
            tooltipText="sortBuilds"
          />
          <HelpButtonDescription
            iconName="sort-alphabetical-ascending"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.sort_sets.label_select_sort"
            namespaceDescription="helpSave"
            tooltipText="name"
            namespaceTooltipText={sortsNamespaceByGame[game]}
          />
          <Text role="body" size="large" fontStyle="italic" namespace="helpSave">
            advanced_options.step.sort_sets.label_long_press_hint
          </Text>
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="actions.title" namespace="helpSave" contentType="button">
        <HelpButtonDescription
          iconName="pencil"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_edit_elements"
          namespaceDescription="helpSave"
          tooltipText="editTheBuild"
        />
        <HelpButtonDescription
          iconName="compare"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_add_to"
          namespaceDescription="helpSave"
          tooltipText="loadTheBuildToDisplayScreen"
        />
        <HelpButtonDescription
          iconName="magnify"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_copy_to_finder"
          namespaceDescription="helpSave"
          tooltipText="loadTheStatsToSearchScreen"
        />
        <HelpButtonDescription
          iconName={Platform.OS === "ios" ? "share-outline" : "share"}
          iconType={Platform.OS === "ios" ? IconType.Ionicons : IconType.MaterialIcons}
          description="actions.label_export_set"
          namespaceDescription="helpSave"
          tooltipText="share"
        />
        <HelpButtonDescription
          iconName="trash-can"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_delete_set"
          namespaceDescription="helpSave"
          tooltipText="remove"
          namespaceTooltipText="button"
        />
      </HelpSection>
    </HelpModal>
  );
};

export default memo(HelpFavoritesScreen);
