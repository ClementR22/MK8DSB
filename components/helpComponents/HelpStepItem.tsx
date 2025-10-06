import React from "react";
import { StyleSheet, View } from "react-native";
import StepCircle from "./StepCircle";
import { BUTTON_SIZE } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

interface HelpStepItemProps {
  stepChar: number | string;
  title: string;
  alignItems?: "flex-start" | "center" | "flex-end";
  children: React.ReactNode;
}

const HelpStepItem = ({ stepChar, title, alignItems, children }: HelpStepItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{<StepCircle number={stepChar} />}</View>

      <View style={styles.contentContainer}>
        <Text role="label" size="large">
          {title}
        </Text>

        {children && <View style={{ gap: 10, alignSelf: alignItems, alignItems }}>{children}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  iconWrapper: { width: BUTTON_SIZE, alignItems: "center" },
  contentContainer: { flex: 1, gap: 12, justifyContent: "center" },
});

export default React.memo(HelpStepItem);
