import { useThemeStore } from "@/stores/useThemeStore";
import {
  BORDER_RADIUS_18,
  BORDER_RADIUS_INF,
  LEFT_PANNEL_WIDTH_COLLAPSED,
  LEFT_PANNEL_WIDTH_EXPANDED,
} from "@/utils/designTokens";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, runOnJS, SharedValue } from "react-native-reanimated";
import { box_shadow_z1 } from "./styles/shadow";

interface PannelProps {
  isLeftPannelExpanded: boolean;
  setIsLeftPannelExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  overlayOpacity: SharedValue<number>;
  children: React.ReactElement;
}

const THRESHOLD = (LEFT_PANNEL_WIDTH_COLLAPSED + LEFT_PANNEL_WIDTH_EXPANDED) / 2;
const HANDLE_WIDTH = 20; // Largeur de la zone de glissement dédiée

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
    // Limiter le glissement pour qu'il soit principalement horizontal (pour éviter le vol de geste)
    .activeOffsetX([-10, 10])
    .onStart(() => {
      // Capture la largeur réelle au début
      startWidth.value = width.value;
    })
    .onUpdate((e) => {
      // Calculer la nouvelle largeur basée sur la position de départ + glissement horizontal
      const newWidth = startWidth.value + e.translationX;

      // Limiter entre min et max
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
    <Animated.View
      style={[styles.container, animatedContainerStyle, { backgroundColor: theme.surface_container_high }]}
    >
      <View style={styles.childrenWrapper}>{children}</View>

      {/* la poignée de glissement (Handle) - C'est la seule zone qui réagit au glissement */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.dragHandle,
            animatedHandleStyle,
            {
              // Assurer que le handle suit le panneau
              left: width,
              backgroundColor: theme.outline_variant, // Un indicateur visuel
            },
          ]}
        >
          {/* Un petit indicateur visuel à l'intérieur du handle */}
          <View style={[styles.handleIndicator, { backgroundColor: theme.outline }]} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // nécessaire pour que la FlatList enfant ne déborde pas
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
    marginLeft: 1,
    width: HANDLE_WIDTH, // Largeur de la zone de glissement
    // marginLeft: -HANDLE_WIDTH, // Centrer la zone par rapport à la bordure du panneau
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // S'assurer qu'il est au-dessus du contenu principal
    // Rendre la poignée semi-transparente
    borderRadius: BORDER_RADIUS_INF,
  },
  handleIndicator: {
    width: 4,
    height: 36,
    borderRadius: 2,
  },
});

export default Pannel;
