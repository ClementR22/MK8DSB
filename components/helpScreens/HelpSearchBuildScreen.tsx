import React, { memo } from "react";
import { View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import { PADDING_BUILD_CARD, BUILD_CARD_WIDTH } from "@/utils/designTokens";
import Button from "@/primitiveComponents/Button";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
// import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import StatGaugeBarBuildCard from "../statGauge/StatGaugeBarBuildCard";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";

const HelpSearchBuildScreen = () => {
  return (
    <HelpModal title="guideBuildFinder">
      {/* Intro */}
      <Text role="body" size="large" textAlign="center" namespace="not">
        <Text role="body" size="large" weight="bold" namespace="helpSearch">
          intro.pick_stats
        </Text>
        <Text role="body" size="large" namespace="helpSearch">
          intro.find_sets
        </Text>
      </Text>

      {/* Section 1 — How to use */}
      <HelpSection title="how_to_use.title" namespace="helpSearch" contentType="step">
        <HelpStepItem key={1} stepChar="1" title="how_to_use.step.choose_criteria" namespace="helpSearch">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="how_to_use.step.choose_criteria.add_stat"
            namespace="helpSearch"
          />
        </HelpStepItem>

        <HelpStepItem key={2} stepChar="2" title="how_to_use.step.adjust_values" namespace="helpSearch">
          <StatSliderPreview name="speedGround" />
          <Text role="body" size="large" fontStyle="italic" namespace="not">
            {"≈"}
            <Text role="body" size="large" namespace="text">
              colon
            </Text>
            <Text role="body" size="large" namespace="helpSearch">
              value_type.approximate
            </Text>
            {"\n"}
            {"="}
            <Text role="body" size="large" namespace="text">
              colon
            </Text>
            <Text role="body" size="large" namespace="helpSearch">
              value_type.exact
            </Text>
            {"\n"}
            {"≥"}
            <Text role="body" size="large" namespace="text">
              colon
            </Text>
            <Text role="body" size="large" namespace="helpSearch">
              value_type.minimum
            </Text>
          </Text>
        </HelpStepItem>

        <HelpStepItem
          key={3}
          stepChar="3"
          title="how_to_use.step.start_search"
          alignItems="center"
          namespace="helpSearch"
        >
          <Button
            onPress={() => {}}
            tooltipText="search"
            iconProps={{
              type: IconType.MaterialCommunityIcons,
              name: "magnify",
            }}
          >
            search
          </Button>
        </HelpStepItem>

        <HelpStepItem
          key={4}
          stepChar="4"
          title="how_to_use.step.review_results"
          alignItems="center"
          namespace="helpSearch"
        >
          <Text role="body" size="large" namespace="helpSearch">
            how_to_use.step.review_results.ranked_by_score
          </Text>
          <View style={{ width: BUILD_CARD_WIDTH - PADDING_BUILD_CARD * 2 }}></View>
          <Text role="body" size="large" fontStyle="italic" namespace="helpSearch">
            how_to_use.step.review_results.tap_to_view_gap
          </Text>
        </HelpStepItem>
      </HelpSection>

      {/* Section 2 — Advanced options */}
      <HelpSection title="advanced_options.title" namespace="helpSearch" contentType="step">
        <HelpStepItem key="A" stepChar="A" title="advanced_options.step.customize_display" namespace="helpSearch">
          <HelpButtonDescription
            iconName="checkbox-multiple-marked"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.customize_display.choose_stats_to_show"
            namespace="helpSearch"
          />
        </HelpStepItem>

        <HelpStepItem key="B" stepChar="B" title="advanced_options.step.filters" namespace="helpSearch">
          <HelpButtonDescription
            iconName="filter"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.filters.lock_item"
            namespace="helpSearch"
          />
        </HelpStepItem>

        <HelpStepItem key="C" stepChar="C" title="advanced_options.step.reuse_stats" namespace="helpSearch">
          <HelpButtonDescription
            iconName="cards-outline"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.reuse_stats.open_collection"
            namespace="helpSearch"
          />
          <HelpButtonDescription
            iconName="download"
            iconType={IconType.MaterialCommunityIcons}
            description="advanced_options.step.reuse_stats.import_variations"
            namespace="helpSearch"
          />
        </HelpStepItem>
      </HelpSection>

      {/* Section 3 — Results management */}
      <HelpSection title="results_management.title" namespace="helpSearch" contentType="button">
        <HelpButtonDescription
          iconName="content-save"
          iconType={IconType.MaterialCommunityIcons}
          description="results_management.save_to_collection"
          namespace="helpSearch"
        />
        <HelpButtonDescription
          iconName="compare"
          iconType={IconType.MaterialCommunityIcons}
          description="results_management.move_to_comparator"
          namespace="helpSearch"
        />
        <HelpButtonDescription
          iconName="clipboard-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="results_management.export_set"
          namespace="helpSearch"
        />
      </HelpSection>

      {/* Tips */}
      <HelpHighlightBox type="tips" title="tips.title" namespace="helpSearch">
        tips.start_with_key_stats
      </HelpHighlightBox>
    </HelpModal>
  );
};

export default memo(HelpSearchBuildScreen);
