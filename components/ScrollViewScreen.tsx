import { useContainerLowestStyle } from "@/hooks/useScreenStyle";
import useGeneralStore from "@/stores/useGeneralStore";
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ScrollView } from "react-native";

interface ScrollViewScreenProps {
  scrollEnabled: boolean;
  children: React.ReactNode;
}

export interface ScrollViewScreenHandles {
  scrollToStart: () => void;
  scrollToEnd: () => void;
}

const ScrollViewScreen = forwardRef<ScrollViewScreenHandles, ScrollViewScreenProps>(
  ({ scrollEnabled, children }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const shouldScrollToTop = useGeneralStore((state) => state.shouldScrollToTop);
    const resetScrollToTop = useGeneralStore((state) => state.resetScrollToTop);

    // expose les fonctions au parent
    useImperativeHandle(ref, () => ({
      scrollToStart: () => {
        scrollViewRef.current?.scrollTo({ y: 0 });
      },
      scrollToEnd: () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      },
    }));

    useEffect(() => {
      if (shouldScrollToTop && scrollViewRef.current) {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        resetScrollToTop(); // Réinitialiser le flag
      }
    }, [shouldScrollToTop, resetScrollToTop]);

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
