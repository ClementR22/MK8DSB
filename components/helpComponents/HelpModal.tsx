import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";

interface HelpModalProps {
  slides: React.JSX.Element[];
  setIsHelpModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal = ({ slides, setIsHelpModalVisible }: HelpModalProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const onDoneOrSkip = () => {
    setIsHelpModalVisible(false);
  };

  const renderItem = ({ item }) => {
    return <View style={[styles.container, { backgroundColor: theme.surface }]}>{item}</View>;
  };

  const renderButton = (label) => (
    <View style={styles.navigationButtonContainer}>
      <Text style={styles.navigationButtonText}>{label}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDoneOrSkip}
      onSkip={onDoneOrSkip}
      showSkipButton
      showPrevButton
      renderDoneButton={() => renderButton("Terminer")}
      renderPrevButton={() => renderButton("Précédent")}
      renderNextButton={() => renderButton("Suivant")}
      renderSkipButton={() => renderButton("Fermer")}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      scrollEnabled={isScrollEnable}
    />
  );
};

export default HelpModal;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    gap: 20,
  },
  navigationButtonContainer: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationButtonText: {
    color: "#000",
    fontSize: 16,
  },
  dotStyle: {
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  activeDotStyle: {
    backgroundColor: "rgba(0, 0, 0, .9)",
  },
});
