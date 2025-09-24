import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView } from "react-native";

interface ScrollViewScreenProps {
  scrollEnabled: boolean;
  paddingBottom?: number;
  children: React.ReactNode;
}

export interface ScrollViewScreenHandles {
  scrollToEnd: () => void;
}

const ScrollViewScreen = forwardRef<ScrollViewScreenHandles, ScrollViewScreenProps>(
  ({ scrollEnabled, paddingBottom, children }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);

    useImperativeHandle(ref, () => ({
      scrollToEnd: () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      },
    }));

    return (
      <ScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={{
          gap: MARGIN_CONTAINER_LOWEST,
          paddingVertical: MARGIN_CONTAINER_LOWEST,
          paddingBottom: paddingBottom,
        }}
        style={{ height: "100%" }}
        ref={scrollViewRef}
      >
        {children}
      </ScrollView>
    );
  }
);

export default ScrollViewScreen;
