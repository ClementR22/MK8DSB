import React, { memo } from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import StatGaugeContainerCompare from "../statGaugeCompare/StatGaugeContainerCompare";
import { PAGES_NAVIGATOR_DOTS_BUTTON_SIZE } from "../elementPickerCompact/PagesNavigator";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";

const HelpDisplayBuildScreen = () => {
  return (
    <HelpModal title="guideBuildComparator">
      {/* Intro */}
      <Text role="body" size="large" textAlign="center" namespace="not">
        <Text role="body" size="large" weight="bold" namespace="helpDisplay">
          intro.compare_sets
        </Text>
        <Text role="body" size="large" textAlign="center" namespace="helpDisplay">
          intro.compare_description
        </Text>
      </Text>

      {/* Section 1 — How to use */}
      <HelpSection title="how_to_use_comparator.title" namespace="helpDisplay" contentType="step">
        <HelpStepItem key={1} stepChar="1" title="how_to_use_comparator.step.add_sets" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use_comparator.step.add_sets.label_create_set"
            namespace="helpDisplay"
          />
        </HelpStepItem>

        <HelpStepItem key={2} stepChar="2" title="how_to_use_comparator.step.edit_sets" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="pencil"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use_comparator.step.edit_sets.label_edit_elements"
            namespace="helpDisplay"
          />
        </HelpStepItem>

        <HelpStepItem key={3} stepChar="3" title="how_to_use_comparator.step.view_differences" namespace="helpDisplay">
          <StatGaugeContainerCompare
            name="speedGround"
            buildsIdAndValue={[
              { id: "1", value: 5, color: "#E74C3C" },
              { id: "2", value: 3, color: "#3498DB" },
              { id: "3", value: 7, color: "#2ECC71" },
            ]}
          />
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            how_to_use_comparator.step.view_differences.label_each_color
          </Text>
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            how_to_use_comparator.step.view_differences.label_tap_to_navigate
          </Text>
        </HelpStepItem>

        <HelpStepItem key={4} stepChar="4" title="how_to_use_comparator.step.choose_stats" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use_comparator.step.choose_stats.label_select_stats"
            namespace="helpDisplay"
            containerSize={PAGES_NAVIGATOR_DOTS_BUTTON_SIZE}
          />
        </HelpStepItem>
      </HelpSection>

      {/* Section 2 — Advanced options */}
      <HelpSection title="advanced_options_comparator.title" namespace="helpDisplay" contentType="step">
        <HelpStepItem
          key="A"
          stepChar="A"
          title="advanced_options_comparator.step.import_from_collection"
          namespace="helpDisplay"
        >
          <HelpButtonDescription
            iconName="cards-outline"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options_comparator.step.import_from_collection.label_open_collection"
            namespace="helpDisplay"
          />
          <HelpButtonDescription
            iconName="download"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options_comparator.step.import_from_collection.label_import_set"
            namespace="helpDisplay"
          />
        </HelpStepItem>

        <HelpStepItem key="B" stepChar="B" title="advanced_options_comparator.step.sort_sets" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="sort"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options_comparator.step.sort_sets.label_open_sorts"
            namespace="helpDisplay"
          />
          <HelpButtonDescription
            iconName="sort-alphabetical-ascending"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options_comparator.step.sort_sets.label_select_sort"
            namespace="helpDisplay"
          />
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            advanced_options_comparator.step.sort_sets.label_long_press_hint
          </Text>
        </HelpStepItem>
      </HelpSection>

      {/* Section 3 — Actions */}
      <HelpSection title="actions_comparator.title" namespace="helpDisplay" contentType="button">
        <HelpButtonDescription
          iconName="content-save"
          iconType={IconType.MaterialCommunityIcons}
          description="actions_comparator.label_save_to_collection"
          namespace="helpDisplay"
        />
        <HelpButtonDescription
          iconName="magnify"
          iconType={IconType.MaterialCommunityIcons}
          description="actions_comparator.label_copy_to_finder"
          namespace="helpDisplay"
        />
        <HelpButtonDescription
          iconName="clipboard-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="actions_comparator.label_export_set"
          namespace="helpDisplay"
        />
      </HelpSection>

      {/* Tips */}
      <HelpHighlightBox type="tips" title="tips_comparator.title" namespace="helpDisplay">
        tips_comparator.limit_sets
      </HelpHighlightBox>
    </HelpModal>
  );
};

export default memo(HelpDisplayBuildScreen);
