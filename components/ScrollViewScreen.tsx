import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";
import React from "react";
import { ScrollView } from "react-native";

interface ScrollViewScreenProps {
  scrollEnabled: boolean;
  children: React.ReactNode;
}

const ScrollViewScreen: React.FC<ScrollViewScreenProps> = ({ scrollEnabled, children }) => {
  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      contentContainerStyle={{ gap: MARGIN_CONTAINER_LOWEST, marginVertical: MARGIN_CONTAINER_LOWEST }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewScreen;
