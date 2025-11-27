import React, { ReactNode, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { HELP_HIGHLIGHT_BOX_COLORS } from "@/constants/Colors";
import { BORDER_RADIUS_STANDARD } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

type BoxType = "info" | "result" | "tips";

interface HelpHighlightBoxProps {
  type: BoxType;
  title: string;
  namespace: string;
  children: ReactNode[];
}

const HelpHighlightBox = ({ type, title, namespace, children }: HelpHighlightBoxProps) => {
  const { backgroundColor, borderColor, textColor } = HELP_HIGHLIGHT_BOX_COLORS[type];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderLeftColor: borderColor,
        },
      ]}
    >
      <Text role="title" size="medium" color={textColor} textAlign="center" namespace={namespace}>
        {title}
      </Text>
      {children.map((child, index) => (
        <Text key={index} role="body" size="large" color={textColor} textAlign="left" namespace={namespace}>
          {child}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    padding: 16,
    gap: 10,
    borderRadius: BORDER_RADIUS_STANDARD,
    paddingTop: 12,
  },
});

export default HelpHighlightBox;
