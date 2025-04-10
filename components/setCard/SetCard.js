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
import { elementsAllInfosList } from "../../data/data";
import { card } from "../styles/card";
import { useTheme } from "../../utils/ThemeContext";
import MyModal from "../modal/MyModal";
import SetCardImagesDisplayer from "./SetCardImagesDisplayer";
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
import ElementsSelector from "../elementsSelector/ElementsSelector";
import { usePressableImages } from "../../utils/PressableImagesContext";
import { useSetsList } from "../../utils/SetsListContext";
import MyTextInput from "../MyTextInput";
import { useSavedSetModal } from "../../utils/SavedSetModalContext";
import { useScreenSituation } from "../../utils/ScreenSituationContext";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetCard = ({
  setToShowName = null,
  setToShowClassIds,
  setToShowStats = null,
  isFoundStatsVisible = null,
  chosenStats = null,
  setCardIndex = null,
  situation,
}) => {
  const th = useTheme();

  const {
    saveSetFromDisplay,
    loadSetSaveToSearch,
    loadSetSaveToDisplay,
    loadSetSearchToDisplay,
    removeSet,
    setSetCardActiveIndex,
  } = useSetsList();
  const { screenSituation } = useScreenSituation();

  const { updatePressableImagesList } = usePressableImages();

  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);
  const [isElementsSelectorModalVisible, setIsElementsSelectorModalVisible] =
    useState(false);

  const [isTextInputModalVisible, setIsTextInputModalVisible] = useState(false);

  const displaySetImages = () => {
    setIsImagesModalVisible(true);
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

  const saveSetFromFound = () => {
    setIsTextInputModalVisible(true);
  };

  return (
    <View style={[card(th).container, { flex: 1 }]}>
      {situation != "search" && (
        <MyTextInput
          setToShowName={setToShowName}
          setCardIndex={setCardIndex}
          situation={situation}
          isWithConfimation={true}
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

      {situation == "search" && ( // || situation == "save"
        <StatSliderResultContainer
          setsToShowMultipleStatsLists={[setToShowStats]}
          isFoundStatsVisible={isFoundStatsVisible}
          chosenStats={chosenStats}
          situation={situation}
        />
      )}

      <MyModal
        modalTitle={""}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        ModalContentsList={[SetCardImagesDisplayer]}
        contentPropsList={[{ setToShowElementsIds: setToShowClassIds }]}
        closeButtonText="Close"
      />
      <MyModal
        modalTitle={translate("Selectionner")}
        isModalVisible={isElementsSelectorModalVisible}
        setIsModalVisible={setIsElementsSelectorModalVisible}
        ModalContentsList={[ElementsSelector]}
        contentPropsList={[
          {
            situation: situation,
          },
        ]}
      />
      <MyModal
        modalTitle={translate("NameTheSet")}
        isModalVisible={isTextInputModalVisible}
        setIsModalVisible={setIsTextInputModalVisible}
        ModalContentsList={[MyTextInput]}
        contentPropsList={[
          {
            setToShowName: setToShowName,
            setCardIndex: setCardIndex,
            situation: situation,
          },
        ]}
        closeButtonText={translate("Confirm")}
        checkBeforeClose={async () => {
          return await saveSetFromDisplay(setCardIndex, situation);
        }}
      />
      <View key="pressables container">
        {situation != "search" && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => {
              setSetCardActiveIndex(setCardIndex);
              setIsElementsSelectorModalVisible(true);
              updatePressableImagesList(setToShowClassIds);
            }}
          >
            <MaterialIcons name="edit" size={24} color={th.on_primary} />
          </Pressable>
        )}

        {situation != "search" && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => {
              removeSet(setCardIndex, situation);
            }}
          >
            <Ionicons name="close" size={24} color={th.on_primary} />
          </Pressable>
        )}

        {(situation == "search" || situation == "display") && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() =>
              situation == "search"
                ? saveSetFromFound(setCardIndex)
                : saveSetFromDisplay(setCardIndex)
            }
          >
            <MaterialIcons name="save" size={24} color={th.on_primary} />
          </Pressable>
        )}

        {situation == "load" && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() =>
              screenSituation == "search"
                ? loadSetSaveToSearch(setCardIndex)
                : loadSetSaveToDisplay(setCardIndex)
            }
          >
            <Text>Import</Text>
          </Pressable>
        )}

        {(situation == "search" || situation == "save") && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() =>
              situation == "search"
                ? loadSetSearchToDisplay(setCardIndex)
                : loadSetSaveToDisplay(setCardIndex)
            }
          >
            <MaterialIcons
              name="display-settings"
              size={24}
              color={th.on_primary}
            />
          </Pressable>
        )}
      </View>
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
