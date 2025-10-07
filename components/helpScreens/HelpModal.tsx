import React, { useMemo } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpHighlightBox from "../helpComponents/HelpHighlightBox";
import HelpStepItem from "../helpComponents/HelpStepItem";
import HelpButtonDescription from "../helpComponents/HelpButtonDescription";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import ButtonAndModal from "../modal/ButtonAndModal";
import { StyleSheet } from "react-native";
import Text from "@/primitiveComponents/Text";
import Separator from "../Separator";

export type HelpContentItem = {
  type: "title" | "highlight" | "step" | "feature" | "custom";
  content: any;
  props?: any;
};

export type HelpModalProps = {
  title: string;
  intro: {
    content: React.ReactNode;
    title?: string;
  };
  sections: Array<{
    title: string;
    items: HelpContentItem[];
  }>;
  outroAdviceHighlightContent?: React.ReactNode;
};

const HelpModal: React.FC<HelpModalProps> = ({ title, intro, sections, outroAdviceHighlightContent }) => {
  const renderContentItem = (item: HelpContentItem, index: number) => {
    switch (item.type) {
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

  const customTrigger = useMemo(() => <ButtonIcon iconName={"help-circle"} iconType={IconType.Feather} />, []);

  return (
    <ButtonAndModal customTrigger={customTrigger} modalTitle={title}>
      <ScrollView scrollEnabled={true} style={styles.scrollView}>
        <Pressable style={styles.container}>
          <Text role="body" size="large" textAlign="center">
            {intro.content}
          </Text>

          <View key="body-sections">
            {sections.map((section, sectionIndex) => (
              <View key={sectionIndex}>
                <Separator direction="horizontal" wrapperStyle={{ marginVertical: 20 }} />
                <View key={sectionIndex} style={styles.section}>
                  <Text role="title" size="large" textAlign="center">
                    {section.title}
                  </Text>
                  {section.items.map((item, itemIndex) => renderContentItem(item, itemIndex))}
                </View>
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
  container: { gap: 0, padding: 10, paddingTop: 20 },
  section: { gap: 25 },
  scrollView: { maxHeight: 450 },
});

export default React.memo(HelpModal);
