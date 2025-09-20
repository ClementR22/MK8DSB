import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";
import React from "react";
import { ScrollView } from "react-native";

interface ScrollViewScreenProps {
  scrollEnabled: boolean;
  paddingBottom?: number;
  children: React.ReactNode;
}

const ScrollViewScreen: React.FC<ScrollViewScreenProps> = ({ scrollEnabled, paddingBottom, children }) => {
  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      contentContainerStyle={{
        gap: MARGIN_CONTAINER_LOWEST,
        paddingVertical: MARGIN_CONTAINER_LOWEST,
        paddingBottom: paddingBottom,
      }}
      style={{ height: "100%" }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewScreen;
