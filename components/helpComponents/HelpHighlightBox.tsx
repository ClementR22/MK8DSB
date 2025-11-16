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
  children: ReactNode;
}

const HelpHighlightBox = ({ type, title, namespace, children }: HelpHighlightBoxProps) => {
  const { backgroundColor, borderColor, textColor } = HELP_HIGHLIGHT_BOX_COLORS[type];

  if (!children) return;

  return (
    <View
      style={[
        styles.container,
        title && { paddingTop: 12 },
        {
          backgroundColor: backgroundColor,
          borderLeftColor: borderColor,
        },
      ]}
    >
      <Text role="title" size="medium" color={textColor} textAlign="center" namespace={namespace}>
        {title}
      </Text>
      <Text role="body" size="large" color={textColor} textAlign="center" namespace={namespace}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    padding: 16,
    gap: 6,
    borderRadius: BORDER_RADIUS_STANDARD,
  },
});

export default HelpHighlightBox;
