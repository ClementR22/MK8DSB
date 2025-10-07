import React from "react";
import { View } from "react-native";
import Text from "@/primitiveComponents/Text";

interface HelpSectionProps {
  title: string;
  contentType: "step" | "button";
  children: React.ReactElement[];
}

const HelpSection: React.FC<HelpSectionProps> = ({ title, contentType, children }) => {
  return (
    <View>
      <Text role="title" size="large" textAlign="center" style={{ marginBottom: 20 }}>
        {title}
      </Text>
      <View style={{ gap: contentType === "step" ? 25 : 15 }}>{children}</View>
    </View>
  );
};

export default HelpSection;
