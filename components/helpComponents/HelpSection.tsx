import React from "react";
import { View } from "react-native";
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
      <Separator direction="horizontal" wrapperStyle={{ marginTop: 10, marginBottom: 20 }} />
      <Text role="title" size="large" textAlign="center" namespace={namespace}>
        {title}
      </Text>
      <Separator direction="horizontal" wrapperStyle={{ marginVertical: 20 }} />
      <View style={{ gap: contentType === "step" ? 25 : 15 }}>{children}</View>
    </View>
  );
};

export default HelpSection;
