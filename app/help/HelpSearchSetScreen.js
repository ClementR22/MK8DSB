import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonIcon from "@/components/ButtonIcon";
import StatSlider from "@/components/StatSlider";
import { IconType } from "react-native-dynamic-vector-icons";
import { translate } from "@/translations/translations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import ButtonLoadSet from "@/components/managingSetsPressable/ButtonLoadSet";

const HelpSearchSetScreen = () => {
  const router = useRouter();

  const renderItem = ({ item }) => {
    return <>{item}</>;
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
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});

const slides = [
  <View
    style={{
      flex: 1,
      backgroundColor: "#59b2ab",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 200,
    }}
  >
    <Text style={styles.title}>Trouver le set parfait</Text>
    <Text style={styles.text}>
      Vous rêvez de trouver LE set parfaitement adapté à votre style de jeu ? Cet écran vous permet de rechercher des
      sets correspondant précisément aux statistiques que vous privilégiez.
    </Text>
    <Text style={styles.text}>
      Utilisez les curseurs pour indiquer l'importance de chaque statistique dans votre recherche.
    </Text>
  </View>,

  <View
    style={{
      flex: 1,
      backgroundColor: "#59b2ab",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 100,
      width: "100%",
    }}
  >
    <Text style={styles.title}>Fonctionnalités</Text>

    <View
      style={{
        backgroundColor: "red",
        width: "100%",
        paddingHorizontal: 15,
        gap: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="plus" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ flexShrink: 1, marginLeft: 10 }}>
          Ajouter une statistique supplémentaire à prendre en compte dans la recherche
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="pin" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ flexShrink: 1, marginLeft: 10 }}>
          Imposer un ou plusieurs éléments (personnage, véhicule, roues, etc.)
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="numbers" iconType={IconType.MaterialIcons} />
        <Text style={{ flexShrink: 1, marginLeft: 10 }}>Définir le nombre maximum de résultats à afficher</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="checkbox-multiple-marked" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ flexShrink: 1, marginLeft: 10 }}>Choisir les statistiques à afficher dans les sets trouvés</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="cards-outline" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ flexShrink: 1, marginLeft: 10 }}>
          Charger les statistiques d'un set que vous avez déjà enregistré
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="approximately-equal" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ flexShrink: 1, marginLeft: 10 }}>
          Choisir le niveau d'exigence pour chaque statistique : valeur exacte, supérieure ou proche
        </Text>
      </View>
      <Text style={{ flexShrink: 1, marginLeft: 10 }}>
        Une fois vos critères définis, cliquez sur “Search” pour lancer la recherche !
      </Text>
      <Button icon={{ type: IconType.MaterialCommunityIcons, name: "magnify" }}>
        <Text>Search</Text>
      </Button>
    </View>
  </View>,

  <View
    style={{
      flex: 1,
      backgroundColor: "#59b2ab",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 100,
      width: "100%",
    }}
  >
    <Text style={styles.title}>Et ensuite ?</Text>

    <View style={{ paddingHorizontal: 20, gap: 20 }}>
      <Text style={styles.text}>
        Une fois la recherche lancée, vous découvrirez une sélection de sets correspondant à vos critères.
      </Text>
      <Text style={styles.text}>Pour chaque set proposé, vous pourrez :</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons name="heart-outline" size={24} color="white" />
        <Text style={{ flex: 1, marginLeft: 10, color: "white" }}>
          L'ajouter à vos favoris pour le retrouver facilement plus tard
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons name="compare" size={24} color="white" />
        <Text style={{ flex: 1, marginLeft: 10, color: "white" }}>
          Le comparer avec d'autres sets pour faire le meilleur choix
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons name="pencil-outline" size={24} color="white" />
        <Text style={{ flex: 1, marginLeft: 10, color: "white" }}>Le modifier à votre goût et l'enregistrer</Text>
      </View>

      <Text style={styles.text}>C'est vous qui décidez du meilleur set pour passer la ligne d'arrivée en tête !</Text>
    </View>
  </View>,
];

export default HelpSearchSetScreen;
