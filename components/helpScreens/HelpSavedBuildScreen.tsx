import React, { memo } from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";

const HelpFavoritesScreen = () => {
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

      <HelpSection title="how_to_use_collection.title" contentType="step" namespace="helpSave">
        <HelpStepItem stepChar={"1"} title="how_to_use_collection.step.save_set" namespace="helpSave">
          <HelpButtonDescription
            iconName="content-save"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use_collection.step.save_set.label_description"
            namespace="helpSave"
          />
        </HelpStepItem>

        <HelpStepItem stepChar={"2"} title="how_to_use_collection.step.choose_stats" namespace="helpSave">
          <HelpButtonDescription
            iconName="checkbox-multiple-marked"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use_collection.step.choose_stats.label_description"
            namespace="helpSave"
          />
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="advanced_options.title" contentType="step" namespace="helpSave">
        <HelpStepItem stepChar={"A"} title="advanced_options.step.import_set" namespace="helpSave">
          <HelpButtonDescription
            iconName="content-paste"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.import_set.label_description"
            namespace="helpSave"
          />
        </HelpStepItem>

        <HelpStepItem stepChar={"B"} title="advanced_options.step.sort_sets" namespace="helpSave">
          <HelpButtonDescription
            iconName="sort"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.sort_sets.label_open_sorts"
            namespace="helpSave"
          />
          <HelpButtonDescription
            iconName="sort-alphabetical-ascending"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.sort_sets.label_select_sort"
            namespace="helpSave"
          />
          <Text role="body" size="large" fontStyle="italic" namespace="helpSave">
            advanced_options.step.sort_sets.label_long_press_hint
          </Text>
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="actions.title" contentType="button" namespace="helpSave">
        <HelpButtonDescription
          iconName="pencil"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_edit_elements"
          namespace="helpSave"
        />
        <HelpButtonDescription
          iconName="compare"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_add_to"
          namespace="helpSave"
        />
        <HelpButtonDescription
          iconName="magnify"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_copy_to_finder"
          namespace="helpSave"
        />
        <HelpButtonDescription
          iconName="clipboard-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_export_set"
          namespace="helpSave"
        />
        <HelpButtonDescription
          iconName="trash-can"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_delete_set"
          namespace="helpSave"
        />
      </HelpSection>
    </HelpModal>
  );
};

export default memo(HelpFavoritesScreen);
