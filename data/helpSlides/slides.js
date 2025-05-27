import BoxContainer from "@/components/BoxContainer";
import ButtonIcon from "@/components/ButtonIcon";
import StatSlider from "@/components/StatSlider";
import { Image, StyleSheet, Text, View } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";

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
});

export const slides = [
  <View
    style={{
      flex: 1,
      backgroundColor: "#59b2ab",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 100,
    }}
  >
    <Text style={styles.title}>Trouver </Text>
    <Text style={styles.text}>
      Cet écran vous permet de rechercher des sets correspondant à des statistiques spécifiques.
    </Text>
    <Text style={styles.text}>Vous pouvez définir les stats de votre choix à l'aide des sliders. </Text>
    <View style={{ width: "100%", backgroundColor: "blue" }}>
      <View style={{ backgroundColor: "red", width: 300 }}>
        <StatSlider name="speedGround" value={4} statFilterNumber={0} disabled={true} />
      </View>
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
    <View style={{ backgroundColor: "red", height: 300, width: "100%", padding: 30, justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ButtonIcon iconName="plus" iconType={IconType.MaterialCommunityIcons} />
        <Text style={{ marginLeft: 15 }}>ok</Text>
      </View>
      <ButtonIcon iconName="pin" iconType={IconType.MaterialCommunityIcons} />
      <ButtonIcon iconName="numbers" iconType={IconType.MaterialIcons} />
      <ButtonIcon iconName="checkbox-multiple-marked" iconType={IconType.MaterialCommunityIcons} />
    </View>
  </View>,
];
