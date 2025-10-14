// InfoToast.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "@/primitiveComponents/Text";
import { useThemeStore } from "@/stores/useThemeStore";

interface InfoToastProps {
  text1?: string;
}

export default function InfoToast({ text1 }: InfoToastProps) {
  const theme = useThemeStore((state) => state.theme);

  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom;

  return (
    <View style={[styles.toast, { backgroundColor: theme.toast_background_color, marginBottom: bottomOffset }]}>
      <Text role="body" size="medium" color="white">
        {text1}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    width: "90%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 4,
  },
});
