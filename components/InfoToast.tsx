// InfoToast.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "@/primitiveComponents/Text";

interface InfoToastProps {
  text1?: string;
}

export default function InfoToast({ text1 }: InfoToastProps) {
  const insets = useSafeAreaInsets();

  const bottomOffset = insets.bottom;

  return (
    <View style={[styles.toast, { marginBottom: bottomOffset }]}>
      <Text role="body" size="medium" inverse>
        {text1}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    width: "90%",
    backgroundColor: "#323232",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 4,
  },
});
