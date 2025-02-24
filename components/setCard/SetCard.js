import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  Modal,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { elementsAllClassName, elementsAllInfosList } from "../../data/data";
import { ScrollView } from "react-native";
import StatSliderResult from "../statSliderResult/StatSliderResult";
import { modal } from "../styles/modal";
import { button } from "../styles/button";
import { card } from "../styles/card";
import { useTheme } from "../styles/theme";
import MyModal from "../MyModal";
import SetImagesDisplayer from "./SetCardImagesDisplayer";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import SetCardElementChip from "./SetCardElementChip";
import { category4Names } from "../../data/data";
import { translate } from "../../i18n/translations";
import { FlatList } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetCard = ({
  setToShowName = null,
  setToShowClassIds,
  setToShowStats = null,
  isFoundStatsVisible = null,
  chosenStats = null,
  displayCase = false,
  setCardIndex = null,
  handlePresentModalPress = null,
  removeSet = null,
  saveSet = null,
  renameSet = null,
}) => {
  const th = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const defaultName = `Set ${setCardIndex + 1}`;
  const [localName, setLocalName] = useState(setToShowName ?? defaultName);

  useEffect(() => {
    setLocalName(setToShowName ?? defaultName);
  }, [setToShowName]);

  const displaySetImages = () => {
    setIsModalVisible(true);
  };

  const data = category4Names.map((category, index) => {
    return {
      category: translate(category),
      images: elementsAllInfosList
        .filter(({ classId }) => classId === setToShowClassIds[index]) // Filtrer selon classId correspondant
        .map((element) => element.image), // Extraire l'URI de l'image
    };
  });

  const categoryWidth =
    Math.max(...data.map((item) => item.category.length)) * 7;

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {/* <Text style={[styles.category, { width: categoryWidth }]}>
        {item.category}
      </Text> */}

      <View style={styles.imagesContainer}>
        {item.images.map((image, index) => (
          <Image key={index} source={image} style={styles.icon} />
        ))}
      </View>
    </View>
  );

  const handleEndEditing = () => {
    if (localName === "") {
      renameSet(setCardIndex, null); // Met le nom sur null si vide
      setLocalName(defaultName); // Réinitialise l'affichage
    } else {
      renameSet(setCardIndex, localName); // Sinon, enregistre le texte saisi
    }
  };

  return (
    <View style={[card(th).container, { flex: 1 }]}>
      {displayCase && (
        <TextInput
          style={styles.textInput}
          value={localName}
          onChangeText={(text) => {
            setLocalName();
            renameSet(setCardIndex, text);
          }}
          onEndEditing={handleEndEditing}
        />
      )}

      <Pressable onPress={displaySetImages}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.category}
          contentContainerStyle={{ flexGrow: 0 }} // Empêche la FlatList d'occuper plus d'espace que nécessaire
        />
      </Pressable>

      {!displayCase ? (
        <StatSliderResultContainer
          setsToShowMultipleStatsLists={[setToShowStats]}
          isFoundStatsVisible={isFoundStatsVisible}
          chosenStats={chosenStats}
        />
      ) : null}

      <MyModal
        modalTitle={""}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        ModalContent={SetImagesDisplayer}
        contentProps={{ setToShowElementsIds: setToShowClassIds }}
        closeButtonText="Close"
      />

      {displayCase && (
        <View>
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => handlePresentModalPress(setCardIndex)}
          >
            <MaterialIcons name="edit" size={24} color={th.on_primary} />
          </Pressable>

          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => removeSet(setCardIndex)}
          >
            <Ionicons name="close" size={24} color={th.on_primary} />
          </Pressable>

          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => saveSet(setCardIndex)}
          >
            <MaterialIcons name="save" size={24} color={th.on_primary} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default SetCard;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
    width: 300,
  },
  closePressable: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 20,
  },
  textLeft: {
    //color: th.on_surface,
    fontSize: 20,
    marginLeft: 6,
    flexShrink: 1, // Permet de réduire la largeur du texte si nécessaire
    maxWidth: "70%", // Largeur maximale pour le texte de gauche
    overflow: "hidden", // Cache l'excédent du texte
    marginRight: 30,
  },
  icon: {
    width: 40, // Taille fixe pour toutes les icônes
    height: 40, // Même taille en hauteur
    resizeMode: "contain", // Garde les proportions sans déformation
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  category: {
    textAlign: "left", // Aligner à gauche
    marginRight: 16, // Un petit espacement entre la colonne 1 et la colonne 2
  },
  imagesContainer: {
    flex: 1,
    justifyContent: "center", // Centrer le contenu de la colonne 2
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
  },
  textInput: {
    backgroundColor: "grey",
  },
});
