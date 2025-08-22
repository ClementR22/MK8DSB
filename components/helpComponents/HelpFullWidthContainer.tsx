import React from "react";
import { StyleSheet, View } from "react-native";

interface HelpFullWidthContainerProps {
  paddingHorizontal?: number;
  marginHorizontal?: number;
  children: React.ReactElement;
}

const HelpFullWidthContainer = ({ paddingHorizontal, marginHorizontal, children }: HelpFullWidthContainerProps) => (
  <View style={[styles.container, { paddingHorizontal, marginHorizontal }]}>{children}</View>
);

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
});

export default HelpFullWidthContainer;
