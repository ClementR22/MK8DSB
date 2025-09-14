import React, { useState } from "react";
import { Text, Modal, ScrollView, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import Button from "@/primitiveComponents/Button";
import HelpTitle from "../helpComponents/HelpTitle";
import HelpListContainer from "../helpComponents/HelpListContainer";
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

export type HelpContentItem = {
  type: "title" | "subtitle" | "highlight" | "step" | "feature" | "custom";
  content: any;
  props?: any;
};

export type HelpModalProps = {
  triggerIcon?: {
    name: string;
    type: IconType;
    tooltipText?: string;
    placement?: "top" | "bottom" | "left" | "right";
  };
  title: string;
  introHighlight: {
    content: React.ReactNode;
    title?: string;
  };
  sections: Array<{
    title: string;
    items: HelpContentItem[];
  }>;
  actionButton?: {
    text: string;
    onPress: () => void;
  };
  outroAdviceHighlightContent?: React.ReactNode;
};

const ButtonAndHelpmodal: React.FC<HelpModalProps> = ({
  triggerIcon = {
    name: "help-circle",
    type: IconType.Feather,
    tooltipText: "Help",
    placement: "bottom",
  },
  title,
  introHighlight,
  sections,
  actionButton,
  outroAdviceHighlightContent,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const language = useLanguageStore((state) => state.language);
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

  return (
    <>
      <ButtonIcon
        tooltipText={triggerIcon.tooltipText}
        toolTipPlacement={triggerIcon.placement}
        iconName={triggerIcon.name}
        iconType={triggerIcon.type}
        onPress={() => setIsVisible(true)}
      />

      {isVisible && (
        <Modal visible={isVisible} animationType="slide">
          <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }} scrollEnabled={isScrollEnable}>
            <HelpTitle>{title}</HelpTitle>

            <HelpHighlightBox type="info" title={introHighlight.title}>
              {introHighlight.content}
            </HelpHighlightBox>

            {sections.map((section, sectionIndex) => (
              <View key={sectionIndex}>
                <HelpSubtitle>{section.title}</HelpSubtitle>
                <HelpListContainer>
                  {section.items.map((item, itemIndex) => renderContentItem(item, itemIndex))}
                </HelpListContainer>
              </View>
            ))}

            <HelpHighlightBox type="tips" title="Conseil pratique">
              {outroAdviceHighlightContent}
            </HelpHighlightBox>
          </ScrollView>

          <Button onPress={() => setIsVisible(false)} style={{ marginTop: 20 }}>
            <Text>{actionButton?.text || translateToLanguage("Start", language)}</Text>
          </Button>
        </Modal>
      )}
    </>
  );
};

export default ButtonAndHelpmodal;
