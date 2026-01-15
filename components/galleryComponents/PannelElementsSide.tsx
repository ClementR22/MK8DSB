import useThemeStore from "@/stores/useThemeStore";
import {
  BORDER_RADIUS_18,
  BORDER_RADIUS_INF,
  LEFT_PANNEL_WIDTH_COLLAPSED,
  LEFT_PANNEL_WIDTH_EXPANDED,
} from "@/utils/designTokens";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, runOnJS, SharedValue } from "react-native-reanimated";
import { box_shadow_z1 } from "../styles/shadow";

interface PannelElementsSideProps {
  isLeftPannelExpanded: boolean;
  setIsLeftPannelExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  overlayOpacity: SharedValue<number>;
  children: React.ReactElement;
}

const THRESHOLD = (LEFT_PANNEL_WIDTH_COLLAPSED + LEFT_PANNEL_WIDTH_EXPANDED) / 2;
const HANDLE_WIDTH = 25;
const OVERLAY_MAX = 0.5;

const PannelElementsSide: React.FC<PannelElementsSideProps> = ({
  isLeftPannelExpanded,
  setIsLeftPannelExpanded,
  overlayOpacity,
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const width = useSharedValue(isLeftPannelExpanded ? LEFT_PANNEL_WIDTH_EXPANDED : LEFT_PANNEL_WIDTH_COLLAPSED);
  const startWidth = useSharedValue(LEFT_PANNEL_WIDTH_COLLAPSED);

  // Sync externe
  useEffect(() => {
    const targetWidth = isLeftPannelExpanded ? LEFT_PANNEL_WIDTH_EXPANDED : LEFT_PANNEL_WIDTH_COLLAPSED;

    width.value = withTiming(targetWidth, { duration: 300 });
    overlayOpacity.value = withTiming(isLeftPannelExpanded ? OVERLAY_MAX : 0, {
      duration: 300,
    });
  }, [isLeftPannelExpanded, width, overlayOpacity]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onStart(() => {
      startWidth.value = width.value;
    })
    .onUpdate((e) => {
      const newWidth = startWidth.value + e.translationX;

      width.value = Math.max(LEFT_PANNEL_WIDTH_COLLAPSED, Math.min(LEFT_PANNEL_WIDTH_EXPANDED, newWidth));

      const progress =
        (width.value - LEFT_PANNEL_WIDTH_COLLAPSED) / (LEFT_PANNEL_WIDTH_EXPANDED - LEFT_PANNEL_WIDTH_COLLAPSED);

      overlayOpacity.value = progress * OVERLAY_MAX;
    })
    .onEnd((e) => {
      if (width.value > THRESHOLD || e.velocityX > 500) {
        width.value = withTiming(LEFT_PANNEL_WIDTH_EXPANDED, { duration: 200 });
        overlayOpacity.value = withTiming(OVERLAY_MAX, { duration: 200 });
        runOnJS(setIsLeftPannelExpanded)(true);
      } else {
        width.value = withTiming(LEFT_PANNEL_WIDTH_COLLAPSED, { duration: 200 });
        overlayOpacity.value = withTiming(0, { duration: 200 });
        runOnJS(setIsLeftPannelExpanded)(false);
      }
    });

  const animatedContainerStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const animatedHandleStyle = useAnimatedStyle(() => ({
    opacity: 1 - 2 * overlayOpacity.value,
  }));

  return (
    <GestureHandlerRootView
      style={[
        styles.gestureHandlerRootView,
        {
          width: isLeftPannelExpanded ? LEFT_PANNEL_WIDTH_EXPANDED : LEFT_PANNEL_WIDTH_COLLAPSED + HANDLE_WIDTH,
        },
      ]}
    >
      <Animated.View
        style={[styles.container, animatedContainerStyle, { backgroundColor: theme.surface_container_high }]}
      >
        <View style={styles.childrenWrapper}>{children}</View>

        {/* la poignée de glissement (Handle) */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.dragHandle,
              animatedHandleStyle,
              {
                backgroundColor: theme.outline_variant,
              },
            ]}
          >
            <View style={[styles.handleIndicator, { backgroundColor: theme.outline }]} />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: { flex: 1 },
  container: {
    flex: 1,
    borderTopEndRadius: BORDER_RADIUS_18,
    borderEndEndRadius: BORDER_RADIUS_18,
    boxShadow: box_shadow_z1,
  },
  childrenWrapper: {
    flex: 1,
    borderTopEndRadius: BORDER_RADIUS_18,
    borderEndEndRadius: BORDER_RADIUS_18,
    overflow: "hidden",
  },
  dragHandle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: -HANDLE_WIDTH,
    width: HANDLE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderRadius: BORDER_RADIUS_INF,
  },
  handleIndicator: {
    width: 4,
    height: 36,
    borderRadius: 2,
  },
});

export default PannelElementsSide;
