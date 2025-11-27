import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/primitiveComponents/Text";
import Separator from "../Separator";

interface HelpSectionProps {
  title: string;
  namespace: string;
  contentType: "step" | "button";
  children: React.ReactElement[];
}

const HelpSection: React.FC<HelpSectionProps> = ({ title, namespace, contentType, children }) => {
  return (
    <View>
      <Separator direction="horizontal" wrapperStyle={styles.topSeparatorWrapper} />
      <Text role="title" size="large" textAlign="center" namespace={namespace}>
        {title}
      </Text>
      <Separator direction="horizontal" wrapperStyle={styles.bottomSeparatorWrapper} />
      <View style={{ gap: contentType === "step" ? 25 : 15 }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSeparatorWrapper: { marginTop: 10, marginBottom: 20 },
  bottomSeparatorWrapper: { marginVertical: 20 },
});

export default HelpSection;
