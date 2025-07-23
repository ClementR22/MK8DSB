import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import {
  CATEGORY_BUTTON_GALLERY_WIDTH,
  LEFT_PANNEL_WIDTH_COLLAPSED,
  LEFT_PANNEL_WIDTH_EXPANDED,
} from "@/utils/designTokens";

export const useGalleryAnimation = (
  isLeftPannelExpanded: boolean,
  setIsCategorySelectorExpanded: (value: boolean) => void
) => {
  const animatedLeftPannelWidth = useRef(new Animated.Value(LEFT_PANNEL_WIDTH_EXPANDED)).current;
  const animatedOverlayOpacity = useRef(new Animated.Value(0)).current;
  const animatedCategoryMarginLeft = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLeftPannelExpanded) {
      setIsCategorySelectorExpanded(true);
      Animated.parallel([
        Animated.timing(animatedLeftPannelWidth, {
          toValue: LEFT_PANNEL_WIDTH_EXPANDED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOverlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedCategoryMarginLeft, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      setTimeout(() => setIsCategorySelectorExpanded(false), 300);
      Animated.parallel([
        Animated.timing(animatedLeftPannelWidth, {
          toValue: LEFT_PANNEL_WIDTH_COLLAPSED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOverlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedCategoryMarginLeft, {
          toValue: -CATEGORY_BUTTON_GALLERY_WIDTH,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isLeftPannelExpanded, setIsCategorySelectorExpanded]);

  return { animatedLeftPannelWidth, animatedOverlayOpacity, animatedCategoryMarginLeft };
};
