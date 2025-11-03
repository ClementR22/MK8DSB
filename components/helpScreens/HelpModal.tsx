import React, { useMemo } from "react";
import { ScrollView, Pressable } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import ButtonAndModal from "../modal/ButtonAndModal";
import { StyleSheet } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import { Placement } from "react-native-popover-view/dist/Types";

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
  const theme = useThemeStore((state) => state.theme);

  const customTrigger = useMemo(
    () => (
      <ButtonIcon
        iconName={"help-circle-outline"}
        iconType={IconType.MaterialCommunityIcons}
        buttonSize={48}
        color={theme.on_surface}
        style={{ backgroundColor: "transparent" }}
        tooltipText="help"
        toolTipPlacement={Placement.LEFT}
      />
    ),
    [theme.on_surface]
  );

  return (
    <ButtonAndModal modalTitle={title} customTrigger={customTrigger} tooltipText="help">
      <ScrollView scrollEnabled={true} style={styles.scrollView}>
        <Pressable style={styles.container}>{children}</Pressable>
      </ScrollView>
    </ButtonAndModal>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, padding: 10, paddingTop: 20 },
  scrollView: { maxHeight: 450 },
});

export default React.memo(HelpModal);
