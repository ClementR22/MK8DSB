import React, { useMemo, useState } from "react";
import { Text, ScrollView, View, Pressable } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import Button from "@/primitiveComponents/Button";
import HelpTitle from "../helpComponents/HelpTitle";
import HelpText from "../helpComponents/HelpText";
import HelpHighlightBox, { BoxType } from "../helpComponents/HelpHighlightBox";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import HelpBoldText from "../helpComponents/HelpBoldText";
import HelpSubtitle from "../helpComponents/HelpSubtitle";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import Separator from "../Separator";
import Modal from "@/primitiveComponents/Modal";
import ButtonAndModal from "../modal/ButtonAndModal";
import { StyleSheet } from "react-native";

export type HelpContentItem = {
  type: "title" | "subtitle" | "highlight" | "step" | "feature" | "custom";
  content: any;
  props?: any;
};

export type HelpModalProps = {
  title: string;
  introHighlight: {
    content: React.ReactNode;
    title?: string;
  };
  sections: Array<{
    title: string;
    items: HelpContentItem[];
  }>;
  outroAdviceHighlightContent?: React.ReactNode;
};

const HelpModal: React.FC<HelpModalProps> = ({ title, introHighlight, sections, outroAdviceHighlightContent }) => {
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const renderContentItem = (item: HelpContentItem, index: number) => {
    switch (item.type) {
      case "title":
        return <HelpTitle key={index}>{item.content}</HelpTitle>;
      case "subtitle":
        return <HelpSubtitle key={index}>{item.content}</HelpSubtitle>;
      case "highlight":
        return (
          <HelpHighlightBox key={index} type={item.props?.type || "info"} title={item.props?.title}>
            {item.content}
          </HelpHighlightBox>
        );
      case "step":
        return (
          <HelpStepItem
            key={index}
            stepChar={item.props.stepChar}
            title={item.props.title}
            alignItems={item.props.alignItems}
          >
            {item.content}
          </HelpStepItem>
        );
      case "feature":
        return (
          <HelpButtonDescription
            key={index}
            iconName={item.props.iconName}
            iconType={item.props.iconType}
            description={item.content}
            containerSize={item.props.containerSize}
          />
        );
      default:
        return null;
    }
  };

  const customTrigger = useMemo(
    () => <ButtonIcon tooltipText={"DisplayedStatsInSets"} iconName={"help-circle"} iconType={IconType.Feather} />,
    []
  );

  return (
    <ButtonAndModal customTrigger={customTrigger} modalTitle={title}>
      <ScrollView scrollEnabled={true} style={{ maxHeight: 450 }}>
        <Pressable style={styles.container}>
          <HelpHighlightBox type="info" title={introHighlight.title}>
            {introHighlight.content}
          </HelpHighlightBox>

          <View style={styles.sections}>
            {sections.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <HelpSubtitle>{section.title}</HelpSubtitle>
                {section.items.map((item, itemIndex) => renderContentItem(item, itemIndex))}
              </View>
            ))}
          </View>

          <HelpHighlightBox type="tips" title="Conseil pratique">
            {outroAdviceHighlightContent}
          </HelpHighlightBox>
        </Pressable>
      </ScrollView>
    </ButtonAndModal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, padding: 10 },
  sections: { gap: 30 },
  section: { gap: 15 },
});

export default React.memo(HelpModal);
