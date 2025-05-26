import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { slides } from "@/data/helpSlides/slides";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpSearchSetScreen = () => {
  const router = useRouter();

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onDoneOrSkip = () => {
    router.back(); // pour revenir à l'écran précédent
  };

  const renderDoneButton = () => (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Terminer</Text>
    </View>
  );

  const renderPrevButton = () => (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Précédent</Text>
    </View>
  );

  const renderNextButton = () => (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Suivant</Text>
    </View>
  );

  const renderSkipButton = () => (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Fermer</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        onDone={onDoneOrSkip}
        onSkip={onDoneOrSkip}
        showSkipButton={true}
        showPrevButton={true}
        renderDoneButton={renderDoneButton}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: 100,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
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
});

export default HelpSearchSetScreen;
