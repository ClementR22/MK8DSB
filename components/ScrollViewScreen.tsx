import { useContainerLowestStyle } from "@/hooks/useScreenStyle";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView } from "react-native";

interface ScrollViewScreenProps {
  scrollEnabled: boolean;
  children: React.ReactNode;
}

export interface ScrollViewScreenHandles {
  scrollToStart;
  scrollToEnd: () => void;
}

const ScrollViewScreen = forwardRef<ScrollViewScreenHandles, ScrollViewScreenProps>(
  ({ scrollEnabled, children }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);

    useImperativeHandle(ref, () => ({
      scrollToStart: () => {
        scrollViewRef.current?.scrollTo({ y: 0 });
      },
      scrollToEnd: () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      },
    }));

    const containerLowestStyle = useContainerLowestStyle("scrollview");

    return (
      <ScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={containerLowestStyle}
        style={{ height: "100%" }}
        ref={scrollViewRef}
      >
        {children}
      </ScrollView>
    );
  }
);

export default ScrollViewScreen;
