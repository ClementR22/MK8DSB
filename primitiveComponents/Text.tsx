import React, { useMemo } from "react";
import { StyleSheet, Text as NativeText, StyleProp, TextStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Text = ({ children, style, ...props }) => {
  const theme = useThemeStore((state) => state.theme);

  const finalTextStyle = useMemo(
    () =>
      StyleSheet.flatten([
        {
          color: theme.on_surface,
        },
        style,
      ]),
    [theme.on_surface, style]
  );

  return (
    <NativeText style={finalTextStyle} {...props}>
      {children}
    </NativeText>
  );
};

Text.displayName = "Text";

export default React.memo(Text);
