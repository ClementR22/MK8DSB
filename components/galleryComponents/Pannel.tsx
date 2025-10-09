import { useThemeStore } from "@/stores/useThemeStore";
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

interface PannelProps {
  isLeftPannelExpanded: boolean;
  setIsLeftPannelExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  overlayOpacity: SharedValue<number>;
  children: React.ReactElement;
}

const THRESHOLD = (LEFT_PANNEL_WIDTH_COLLAPSED + LEFT_PANNEL_WIDTH_EXPANDED) / 2;
const HANDLE_WIDTH = 25;

const Pannel: React.FC<PannelProps> = ({ isLeftPannelExpanded, setIsLeftPannelExpanded, overlayOpacity, children }) => {
  const theme = useThemeStore((state) => state.theme);

  const width = useSharedValue(isLeftPannelExpanded ? LEFT_PANNEL_WIDTH_EXPANDED : LEFT_PANNEL_WIDTH_COLLAPSED);
  const startWidth = useSharedValue(LEFT_PANNEL_WIDTH_COLLAPSED);

  // Synchroniser width quand isLeftPannelExpanded change de l'extérieur
  useEffect(() => {
    width.value = withTiming(isLeftPannelExpanded ? LEFT_PANNEL_WIDTH_EXPANDED : LEFT_PANNEL_WIDTH_COLLAPSED, {
      duration: 300,
    });
    // Gérer l'opacité de l'overlay simultanément
    overlayOpacity.value = withTiming(isLeftPannelExpanded ? 0.5 : 0, { duration: 300 });
  }, [isLeftPannelExpanded, width, overlayOpacity]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onStart(() => {
      startWidth.value = width.value;
    })
    .onBegin(() => {
      runOnJS(setIsLeftPannelExpanded)(true);
    })
    .onUpdate((e) => {
      // Calculer la nouvelle largeur basée sur la position de départ + glissement horizontal
      const newWidth = startWidth.value + e.translationX;
      width.value = Math.max(LEFT_PANNEL_WIDTH_COLLAPSED, Math.min(LEFT_PANNEL_WIDTH_EXPANDED, newWidth));

      // Calculer l'opacité de l'overlay en fonction de la progression de la largeur
      const progress =
        (width.value - LEFT_PANNEL_WIDTH_COLLAPSED) / (LEFT_PANNEL_WIDTH_EXPANDED - LEFT_PANNEL_WIDTH_COLLAPSED);
      overlayOpacity.value = progress * 0.5; // 0 à 0.5
    })
    .onEnd((e) => {
      if (width.value > THRESHOLD || e.velocityX > 500) {
        // Ouvrir
        width.value = withTiming(LEFT_PANNEL_WIDTH_EXPANDED, { duration: 200 });
        overlayOpacity.value = withTiming(0.5, { duration: 200 });
        runOnJS(setIsLeftPannelExpanded)(true);
      } else {
        // Fermer
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
            {/* Indicateur visuel */}
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
    flexDirection: "row", // IMPORTANT: pour que le handle soit à droite
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
    //    elevation: 5, // Android
  },
  handleIndicator: {
    width: 4,
    height: 36,
    borderRadius: 2,
  },
});

export default Pannel;
