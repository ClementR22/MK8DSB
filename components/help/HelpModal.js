import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-dynamic-vector-icons";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";

export default HelpModal = ({ slides, setIsHelpModalVisible }) => {
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const onDoneOrSkip = () => {
    setIsHelpModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const { content, config } = item;
    return <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>{content}</View>;
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

export const HelpTitle = ({ children }) => <Text style={styles.title}>{children}</Text>;

export const HelpText = ({ children, style }) => <Text style={[styles.text, style]}>{children}</Text>;

export const HelpListContainer = ({ children }) => (
  <View style={{ width: "100%", paddingHorizontal: 15, gap: 20 }}>{children}</View>
);

export const HelpIconAndText = ({ name, type, isButton = true, children }) => {
  const { theme } = useThemeStore();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={isButton && [styles.buttonIconContainer, { backgroundColor: theme.primary }]}>
        <Icon name={name} type={type} size={24} color={theme.on_primary} />
      </View>
      <Text style={{ flex: 1, marginLeft: 10 }}>{children}</Text>
    </View>
  );
};

export const HelpFullWidthContainer = ({ paddingHorizontal, marginHorizontal, children }) => (
  <View style={{ width: "100%", paddingHorizontal, marginHorizontal }}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 200,
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
  buttonIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 100,
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
