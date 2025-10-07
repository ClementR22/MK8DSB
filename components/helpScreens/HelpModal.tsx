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
  children: React.ReactElement[];
};

const HelpModal: React.FC<HelpModalProps> = ({ title, children }) => {
  const customTrigger = useMemo(() => <ButtonIcon iconName={"help-circle"} iconType={IconType.Feather} />, []);

  return (
    <ButtonAndModal customTrigger={customTrigger} modalTitle={title}>
      <ScrollView scrollEnabled={true} style={styles.scrollView}>
        <Pressable style={styles.container}>
          {children.map((section, index) => (
            <>
              {index != 0 && index != 4 && <Separator direction="horizontal" />}
              {section}
            </>
          ))}
        </Pressable>
      </ScrollView>
    </ButtonAndModal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, padding: 10, paddingTop: 20 },
  scrollView: { maxHeight: 450 },
});

export default React.memo(HelpModal);
