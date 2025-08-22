import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

interface HelpListContainerProps {
  children: ReactElement[];
}

const HelpListContainer = ({ children }: HelpListContainerProps) => <View style={styles.container}>{children}</View>;

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, gap: 8 },
});

export default HelpListContainer;
