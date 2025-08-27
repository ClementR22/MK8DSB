import React from "react";
import { StyleSheet } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import HelpIconAndText from "./HelpIconAndText";
import IconContainer from "@/primitiveComponents/IconContainer";

interface HelpFeatureItemProps {
  iconName: string;
  iconType: IconType;
  containerSize?: number;
  title: string;
  description: string;
  withBackground?: boolean;
}

const HelpFeatureItem = ({
  iconName,
  iconType,
  containerSize = 40,
  title,
  description,
  withBackground = true,
}: HelpFeatureItemProps) => {
  return (
    <HelpIconAndText
      icon={<IconContainer iconName={iconName} iconType={iconType} containerSize={containerSize} />}
      title={title}
      description={description}
      withBackground={withBackground}
    />
  );
};

const styles = StyleSheet.create({
  buttonIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HelpFeatureItem;
