import { useRef } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native";

type Axis = "x" | "y";

export const useScrollClamp = (scrollViewRef: React.RefObject<ScrollView>, axis: Axis = "y") => {
  const currentOffset = useRef(0);
  const layoutSize = useRef(0);

  const onLayout = (e: any) => {
    layoutSize.current = axis === "y" ? e.nativeEvent.layout.height : e.nativeEvent.layout.width;
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    currentOffset.current = axis === "y" ? e.nativeEvent.contentOffset.y : e.nativeEvent.contentOffset.x;
  };

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    const contentSize = axis === "y" ? contentHeight : contentWidth;
    const maxScroll = Math.max(0, contentSize - layoutSize.current);

    if (currentOffset.current > maxScroll) {
      scrollViewRef.current?.scrollTo({
        [axis]: maxScroll,
        animated: true,
      });
    }
  };

  return {
    onLayout,
    onScroll,
    onContentSizeChange,
  };
};
