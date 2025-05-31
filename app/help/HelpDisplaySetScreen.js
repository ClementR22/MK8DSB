import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "@/components/ButtonIcon";
import Button from "@/components/Button";

const HelpDisplaySetScreen = () => {
  const router = useRouter();

  const onDoneOrSkip = () => {
    router.back();
  };

  const renderItem = ({ item }) => <>{item}</>;

  const renderButton = (label) => (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
    </SafeAreaView>
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

const slides = [
  <View
    style={{
      flex: 1,
      backgroundColor: "#5d8aa8",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 200,
    }}
  >
    <Text style={styles.title}>Explorer vos Sets</Text>
    <Text style={styles.text}>L'écran Display vous permet de consulter en détail un ou plusieurs sets.</Text>
    <Text style={styles.text}>
      Ajoutez autant de sets que vous voulez pour les comparer visuellement grâce aux barres de stats !
    </Text>
  </View>,

  <View
    style={{
      flex: 1,
      backgroundColor: "#5d8aa8",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 100,
    }}
  >
    <Text style={styles.title}>Modifier et Personnaliser</Text>
    <View style={{ width: "100%", paddingHorizontal: 15, gap: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="edit" iconType={IconType.MaterialIcons} />
        <Text style={{ flex: 1, marginLeft: 10 }}>
          Cliquez sur un élément (personnage, kart, roues...) pour le modifier instantanément
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="plus" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ flex: 1, marginLeft: 10 }}>Ajoutez de nouveaux sets à comparer en un clic</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="checkbox-multiple-marked" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ flexShrink: 1, marginLeft: 10 }}>
          Choisir les statistiques à afficher dans les sliders affichés en dessous
        </Text>
      </View>
    </View>
  </View>,

  <View
    style={{
      flex: 1,
      backgroundColor: "#5d8aa8",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 100,
    }}
  >
    <Text style={styles.title}>Favoris et Chargements</Text>
    <View style={{ paddingHorizontal: 20, gap: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons name="heart-outline" size={24} color="white" />
        <Text style={{ flex: 1, marginLeft: 10, color: "white" }}>Enregistrez vos sets préférés en un clic</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons name="download" size={24} color="white" />
        <Text style={{ flex: 1, marginLeft: 10, color: "white" }}>
          Chargez un set depuis vos favoris pour l'analyser ou le modifier
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons name="arrow-right-bold-box-outline" size={24} color="white" />
        <Text style={{ flex: 1, marginLeft: 10, color: "white" }}>
          Exportez vos sets pour les partager ou les utiliser ailleurs dans l’app
        </Text>
      </View>
      <Text style={styles.text}>Gérez vos sets comme un pro !</Text>
    </View>
  </View>,
];

export default HelpDisplaySetScreen;

//         <ButtonIcon iconName="chart-bar" iconType={IconType.MaterialCommunityIcons} />
