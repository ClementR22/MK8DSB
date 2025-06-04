import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import ButtonAndModalForHelp from "../modal/ButtonAndModalForHelp";
import ButtonIcon from "../ButtonIcon";
import Icon from "react-native-dynamic-vector-icons";
import { useThemeStore } from "@/stores/useThemeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default HelpModal = ({ slides }) => {
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

  const onDoneOrSkip = () => {
    setIsHelpModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const { content, config } = item;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: config.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 200,
        }}
      >
        {content}
      </View>
    );
  };

  const renderButton = (label) => (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{label}</Text>
    </View>
  );

  return (
    <ButtonAndModalForHelp isHelpModalVisible={isHelpModalVisible} setIsHelpModalVisible={setIsHelpModalVisible}>
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
      />
    </ButtonAndModalForHelp>
  );
};

export const HelpTitle = ({ children }) => <Text style={styles.title}>{children}</Text>;

export const HelpText = ({ children }) => <Text style={styles.text}>{children}</Text>;

export const HelpListContainer = ({ children }) => (
  <View style={{ width: "100%", paddingHorizontal: 15, gap: 20 }}>{children}</View>
);

export const HelpIconAndText = ({ name, type, isButton = false, children }) => {
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

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIconContainer: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
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
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
