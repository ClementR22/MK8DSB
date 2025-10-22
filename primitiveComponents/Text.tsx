import React, { useMemo } from "react";
import { Text as RNText, StyleProp } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { fontWeights, TextRole, TextSize, TextWeight, typography } from "@/components/styles/typography";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { useTranslation } from "react-i18next";

interface TextProps {
  role: TextRole;
  size: TextSize;
  weight?: TextWeight;
  fontStyle?: "italic" | "normal";
  textAlign?: "auto" | "left" | "right" | "center" | "justify"; // from React StyleProps.d.ts
  color?: string;
  inverse?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: "clip" | "head" | "middle" | "tail";
  namespace: string | string[];
  style?: StyleProp<TextStyle>;
  children: string;
}

const Text: React.FC<TextProps> = ({
  role,
  size,
  weight,
  fontStyle = "normal",
  textAlign,
  color,
  inverse = false,
  numberOfLines,
  ellipsizeMode,
  namespace,
  style,
  children,
}) => {
  const { t } = useTranslation(namespace);

  const theme = useThemeStore((state) => state.theme);
  const typo = typography[role][size];
  const textColor = color ? color : inverse ? theme.inverse_on_surface : theme.on_surface;

  if (!typo) {
    console.error("dans Text, typo n'existe pas", { role, size, children });
  }

  const textStyle = [
    {
      ...typo,
      color: textColor,
      fontStyle: fontStyle,
      textAlign: textAlign,
    },
    weight && { fontWeight: fontWeights[weight] },
    style,
  ] as StyleProp<TextStyle>;

  return (
    <RNText style={textStyle} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
      {t(children)}
    </RNText>
  );
};

Text.displayName = "Text";

export default React.memo(Text);
