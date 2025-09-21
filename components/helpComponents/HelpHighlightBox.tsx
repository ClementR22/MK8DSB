import React, { ReactNode, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HELP_HIGHLIGHT_BOX_COLORS } from "@/constants/Colors";
import { BORDER_RADIUS_12 } from "@/utils/designTokens";

export type BoxType = "info" | "result" | "tips";

interface HelpHighlightBoxProps {
  type: BoxType;
  title?: string;
  fontSize?: number;
  lineHeight?: number;
  children: ReactNode;
}

const HelpHighlightBox = ({ children, type, title, fontSize = 13, lineHeight = 18 }: HelpHighlightBoxProps) => {
  const { backgroundColor, borderColor, textColor } = HELP_HIGHLIGHT_BOX_COLORS[type];

  const containerStyle = useMemo(
    () => [
      styles.container,
      title && { paddingTop: 12 },
      {
        backgroundColor,

        borderLeftColor: borderColor,
      },
    ],
    [title, backgroundColor, borderColor]
  );

  const textStyle = useMemo(
    () => [styles.text, { color: textColor, fontSize, lineHeight }],
    [textColor, fontSize, lineHeight]
  );

  const renderTitle = useCallback(() => {
    if (title) {
      return <Text style={[textStyle, { color: "black" }]}>{title}</Text>;
    } else {
      return;
    }
  }, [title, textStyle]);

  if (!children) return;

  return (
    <View style={containerStyle}>
      {renderTitle()}
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    padding: 16,
    gap: 8,
    borderRadius: BORDER_RADIUS_12,
  },
  text: { fontSize: 13, textAlign: "center", lineHeight: 18 },
});

export default HelpHighlightBox;
