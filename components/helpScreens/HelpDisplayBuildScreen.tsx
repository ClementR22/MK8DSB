import React, { memo } from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import StatGaugeContainerCompare from "../statGaugeCompare/StatGaugeContainerCompare";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";
import Button from "@/primitiveComponents/Button";

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
      <HelpSection title="how_to_use.title" namespace="helpDisplay" contentType="step">
        <HelpStepItem key={1} stepChar="1" title="how_to_use.step.add_sets" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use.step.add_sets.label_create_set"
            namespaceDescription="helpDisplay"
            tooltipText="addABuild"
          />
        </HelpStepItem>

        <HelpStepItem key={2} stepChar="2" title="how_to_use.step.edit_sets" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="pencil"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use.step.edit_sets.label_edit_elements"
            namespaceDescription="helpDisplay"
            tooltipText="editTheBuild"
          />
        </HelpStepItem>

        <HelpStepItem key={3} stepChar="3" title="how_to_use.step.view_differences" namespace="helpDisplay">
          <StatGaugeContainerCompare
            name="speedGround"
            buildsIdAndValue={[
              { id: "1", value: 5, color: "#E74C3C" },
              { id: "2", value: 3, color: "#3498DB" },
              { id: "3", value: 7, color: "#2ECC71" },
            ]}
          />
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            how_to_use.step.view_differences.label_each_color
          </Text>
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            how_to_use.step.view_differences.label_tap_to_navigate
          </Text>
        </HelpStepItem>

        <HelpStepItem
          key={4}
          stepChar="4"
          title="how_to_use.step.choose_stats"
          namespace="helpDisplay"
          alignItems="center"
        >
          <Button
            iconProps={{ name: "checkbox-multiple-marked", type: IconType.MaterialCommunityIcons }}
            onPress={null}
            tooltipText="statsToCompare"
          >
            statsToCompare
          </Button>
        </HelpStepItem>
      </HelpSection>

      {/* Section 2 — Advanced options */}
      <HelpSection title="advanced_options.title" namespace="helpDisplay" contentType="step">
        <HelpStepItem key="A" stepChar="A" title="advanced_options.step.import_from_collection" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="cards-outline"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.import_from_collection.label_open_collection"
            namespaceDescription="helpDisplay"
            tooltipText="loadABuild"
          />
          <HelpButtonDescription
            iconName="check"
            iconType={IconType.FontAwesome5}
            description="advanced_options.step.import_from_collection.label_import_set"
            namespaceDescription="helpDisplay"
            tooltipText="loadTheBuild"
          />
        </HelpStepItem>

        <HelpStepItem key="B" stepChar="B" title="advanced_options.step.sort_sets" namespace="helpDisplay">
          <HelpButtonDescription
            iconName="sort"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.sort_sets.label_open_sorts"
            namespaceDescription="helpDisplay"
            tooltipText="sortBuilds"
          />
          <HelpButtonDescription
            iconName="sort-alphabetical-ascending"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.sort_sets.label_select_sort"
            namespaceDescription="helpDisplay"
            tooltipText="name"
            namespaceTooltipText="sort"
          />
          <Text role="body" size="large" fontStyle="italic" namespace="helpDisplay">
            advanced_options.step.sort_sets.label_long_press_hint
          </Text>
        </HelpStepItem>
      </HelpSection>

      {/* Section 3 — Actions */}
      <HelpSection title="actions.title" namespace="helpDisplay" contentType="button">
        <HelpButtonDescription
          iconName="content-save-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_save_to_collection"
          namespaceDescription="helpDisplay"
          tooltipText="save"
        />
        <HelpButtonDescription
          iconName="magnify"
          iconType={IconType.MaterialCommunityIcons}
          description="actions.label_copy_to_finder"
          namespaceDescription="helpDisplay"
          tooltipText="loadTheStats"
        />
        <HelpButtonDescription
          iconName="share"
          iconType={IconType.MaterialIcons}
          description="actions.label_export_set"
          namespaceDescription="helpDisplay"
          tooltipText="share"
        />
      </HelpSection>

      {/* Tips */}
      <HelpHighlightBox type="tips" title="tips.title" namespace="helpDisplay">
        {["tips.limit_sets", "tips.tooltip"]}
      </HelpHighlightBox>
    </HelpModal>
  );
};

export default memo(HelpDisplayBuildScreen);
