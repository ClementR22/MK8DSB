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
import SetImagesContainer from "./SetImagesContainer";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { category4Names } from "../../data/data";
import { translate } from "../../i18n/translations";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import { usePressableImages } from "../../utils/PressableImagesContext";
import { useSetsList } from "../../utils/SetsListContext";
import MyTextInput from "../MyTextInput";

const SetCard = ({
  setToShowName = null,
  setToShowClassIds,
  setToShowStats = null,
  chosenStats,
  setCardIndex = null,
  situation,
}) => {
  const th = useTheme();

  const {
    saveSetFromDisplay,
    saveSetFromFound,
    loadSetSaveToSearch,
    loadSetSaveToDisplay,
    loadSetSearchToDisplay,
    removeSet,
    setSetCardActiveIndex,
  } = useSetsList();

  const { updatePressableImagesList } = usePressableImages();

  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);
  const [isElementsSelectorModalVisible, setIsElementsSelectorModalVisible] =
    useState(false);

  const [isTextInputModalVisible, setIsTextInputModalVisible] = useState(false);

  const displaySetImages = () => {
    setIsImagesModalVisible(true);
  };

  const situationConfig = {
    search: {
      showTextInput: false,
      showStatSliderResult: true,
      showEdit: false,
      showRemove: false,
      showSave: true,
      showImport: false,
      showLoadToDisplay: true,
    },
    display: {
      showTextInput: true,
      showStatSliderResult: false,
      showEdit: true,
      showRemove: true,
      showSave: true,
      showImport: false,
      showLoadToDisplay: false,
    },
    save: {
      showTextInput: true,
      showStatSliderResult: true,
      showEdit: true,
      showRemove: true,
      showSave: false,
      showImport: false,
      showLoadToDisplay: true,
    },
    load: {
      showTextInput: true,
      showStatSliderResult: false,
      showEdit: false,
      showRemove: true,
      showSave: false,
      showImport: true,
      showLoadToDisplay: false,
    },
  };

  const config = situationConfig[situation] ?? {};

  return (
    <View style={[card(th).container, { flex: 1 }]}>
      {config.showTextInput && (
        <MyTextInput
          setToShowName={setToShowName}
          setCardIndex={setCardIndex}
          situation={situation}
          isWithConfimation={true}
        />
      )}
      <Pressable onPress={displaySetImages}>
        <SetImagesContainer
          setToShowClassIds={setToShowClassIds}
          imageSize={40}
        />
      </Pressable>

      {config.showStatSliderResult && (
        <StatSliderResultContainer
          setsToShowMultipleStatsLists={[setToShowStats]}
          chosenStats={chosenStats}
          situation={situation}
        />
      )}

      <MyModal
        modalTitle={""}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        ModalContentsList={[SetImagesContainer]}
        contentPropsList={[
          { setToShowClassIds: setToShowClassIds, imageSize: 80 },
        ]}
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
          return await saveSetFromFound(setCardIndex);
        }}
      />
      <View key="pressables container">
        {config.showEdit && (
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

        {config.showRemove && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => {
              removeSet(setCardIndex, situation);
            }}
          >
            <Ionicons name="close" size={24} color={th.on_primary} />
          </Pressable>
        )}

        {config.showSave && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() =>
              situation == "search"
                ? setIsTextInputModalVisible(true)
                : saveSetFromDisplay(setCardIndex)
            }
          >
            <MaterialIcons name="save" size={24} color={th.on_primary} />
          </Pressable>
        )}

        {config.showImport && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() =>
              situation == "search"
                ? loadSetSaveToSearch(setCardIndex)
                : loadSetSaveToDisplay(setCardIndex)
            }
          >
            <Text>Import</Text>
          </Pressable>
        )}

        {config.showLoadToDisplay && (
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
  category: {
    textAlign: "left", // Aligner à gauche
    marginRight: 16, // Un petit espacement entre la colonne 1 et la colonne 2
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
