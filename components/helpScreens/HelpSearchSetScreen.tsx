import React, { memo } from "react";
import { View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpModal from "./HelpModal";
import StatSliderPreview from "../statSlider/StatSliderPreview";
import { PADDING_SET_CARD, SET_CARD_WIDTH } from "@/utils/designTokens";
import Button from "@/primitiveComponents/Button";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import StatGaugeSetCardBar from "../statGauge/StatGaugeSetCardBar";
import Text from "@/primitiveComponents/Text";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpSection from "../helpComponents/HelpSection";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";

const helpSearchSetScreen = () => {
  return (
    <HelpModal title="guideSetBuilder">
      <Text role="body" size="large" textAlign="center" namespace="not">
        <Text role="body" size="large" weight="bold" namespace="helpSearch">
          Pick the stats you want
        </Text>
        <Text role="body" size="large" namespace="helpSearch">
          , and let the algorithm find the perfect sets for you.
        </Text>
      </Text>

      <HelpSection title="How to use the Build finder" namespace="helpSearch" contentType="step">
        <HelpStepItem key={1} stepChar={"1"} title="Choose your criteria" namespace="helpSearch">
          <HelpButtonDescription
            iconName="plus"
            iconType={IconType.MaterialCommunityIcons}
            description="Add/remove a statistic"
            namespace="helpSearch"
          />
        </HelpStepItem>

        <HelpStepItem key={2} stepChar={"2"} title="Adjust values and tolerance" namespace="helpSearch">
          <StatSliderPreview name="speedGround" />
          <Text role="body" size="large" fontStyle="italic" namespace="not">
            {"≈"}
            <Text role="body" size="large" namespace="text">
              colon
            </Text>
            <Text role="body" size="large" namespace="helpSearch">
              approximate value
            </Text>
            {"\n"}
            {"="}
            <Text role="body" size="large" namespace="text">
              colon
            </Text>
            <Text role="body" size="large" namespace="helpSearch">
              exact value
            </Text>
            {"\n"}
            {"≥"}
            <Text role="body" size="large" namespace="text">
              colon
            </Text>
            <Text role="body" size="large" namespace="helpSearch">
              minimum value
            </Text>
          </Text>
        </HelpStepItem>

        <HelpStepItem key={3} stepChar={"3"} title="Start the search" alignItems="center" namespace="helpSearch">
          <Button onPress={() => {}} iconProps={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
            search
          </Button>
        </HelpStepItem>

        <HelpStepItem key={4} stepChar={"4"} title="Review the results" alignItems="center" namespace="helpSearch">
          <Text role="body" size="large" namespace="helpSearch">
            Sets are ranked by matching score
          </Text>
          <View style={{ width: SET_CARD_WIDTH - PADDING_SET_CARD * 2 }}>
            <StatGaugeContainer name="speedGround" value={4} isInSetCard={true} chosenValue={5} bonusEnabled={true}>
              <StatGaugeSetCardBar obtainedValue={4} chosenValue={5} isInSearchScreen={true} />
            </StatGaugeContainer>
          </View>
          <Text role="body" size="large" fontStyle="italic" namespace="helpSearch">
            Tap a bar to view the gap with your criteria
          </Text>
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="Advanced options" namespace="helpSearch" contentType="step">
        <HelpStepItem key={"A"} stepChar={"A"} title="Customize the display" namespace="helpSearch">
          <HelpButtonDescription
            iconName="checkbox-multiple-marked"
            iconType={IconType.MaterialCommunityIcons}
            description="Choose which stats to show in the results"
            namespace="helpSearch"
          />
        </HelpStepItem>

        <HelpStepItem key={"B"} stepChar={"B"} title="Filters (option)" namespace="helpSearch">
          <HelpButtonDescription
            iconName="pin"
            iconType={IconType.MaterialCommunityIcons}
            description="Lock a character, kart, wheels, or glider"
            namespace="helpSearch"
          />
        </HelpStepItem>

        <HelpStepItem key={"C"} stepChar={"C"} title="Reuse a set's stats" namespace="helpSearch">
          <HelpButtonDescription
            iconName="cards-outline"
            iconType={IconType.MaterialCommunityIcons}
            description="Open your favorites collection"
            namespace="helpSearch"
          />
          <HelpButtonDescription
            iconName="download"
            iconType={IconType.MaterialCommunityIcons}
            description="Import a set's stats to find variations"
            namespace="helpSearch"
          />
        </HelpStepItem>
      </HelpSection>

      <HelpSection title="Results management" namespace="helpSearch" contentType="button">
        <HelpButtonDescription
          iconName="heart-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="Save to favorites"
          namespace="helpSearch"
        />

        <HelpButtonDescription
          iconName="compare"
          iconType={IconType.MaterialCommunityIcons}
          description="Move to the set comparator"
          namespace="helpSearch"
        />

        <HelpButtonDescription
          iconName="clipboard-outline"
          iconType={IconType.MaterialCommunityIcons}
          description="Export the set"
          namespace="helpSearch"
        />
      </HelpSection>

      <HelpHighlightBox type="tips" title="Pro tip" namespace="helpSearch">
        Start with 2–3 key stats for more relevant results
      </HelpHighlightBox>
    </HelpModal>
  );
};

export default memo(helpSearchSetScreen);
