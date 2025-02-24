import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import Checkbox from "expo-checkbox";
import { Modal } from "react-native";
import { Alert } from "react-native";

import showToast from "../utils/toast";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import {
  statNames,
  bodyTypeNames,
  bodyTypeNamesDisplay,
  images,
} from "../data/data";

import StatSliderResult from "../components/statSliderResult/StatSliderResult";

import { setAllInfos } from "../data/data";

import ResultsNumber from "../components/ResultsNumberSelector";
import ElementsSelector from "../components/elementsSelector/ElementsSelector";
import { usePressableImages } from "../utils/usePressableImages";
import { useTheme } from "../components/styles/theme";
import MultiStateToggleButton from "../components/MultiStateToggleButton";
import { modal } from "../components/styles/modal";
import { translate } from "../i18n/translations";
import StatSliderResultContainer from "../components/statSliderResult/StatSliderResultContainer";
import StatSliderResultSelectorPressable from "../components/statSliderResult/StatSliderResultSelectorPressable";
import MyModal from "../components/MyModal";
import StatSelector from "../components/StatSelector";
import SetCard from "../components/setCard/SetCard";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { button_icon } from "../components/styles/button";
import { shadow_3dp } from "../components/styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SetCardContainer from "../components/setCard/SetCardContainer";
import MyBottomSheetModal from "../components/MyBottomSheetModal";
import { useCallback } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

const DisplaySetScreenContent = () => {
  const th = useTheme();

  const {
    pressableImagesList,
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageUnique,
    setPressableImagesList,
    handlePressSetUpdatePressableImagesList,
  } = usePressableImages();

  const bottomSheetModalRef = useRef(null);

  const [orderNumber, setOrderNumber] = useState(0);

  const imagesOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  const pressedImagesClassIdsInit = pressableImagesList
    .filter((element) => element.pressed)
    .map((element) => {
      return element.classId;
    }); // - firstElementIdOfCategory[index]

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false; // Si les longueurs sont différentes, ils ne sont pas égaux
    return a.every((value, index) => value === b[index]); // Comparer chaque élément
  };

  const searchSetStatsFromElementsIds = (pressedImagesClassIds) => {
    const result = setAllInfos.find(({ classIds }) => {
      return arraysEqual(classIds, pressedImagesClassIds);
    });

    return result ? result.stats : [];
  };

  const [isFoundStatsVisible, setIsFoundStatsVisible] = useState(
    statNames.map((statName, index) => ({
      name: translate(statName),
      checked: true,
    }))
  );

  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);

  const setDefault = { name: null, classIds: [9, 16, 30, 39] };

  const [setsList, setSetsList] = useState([
    { ...setDefault, classIds: [...setDefault.classIds] },
  ]);

  const handlePresentModalPress = useCallback(
    (setCardSelectedIndex) => {
      bottomSheetModalRef.current?.present(); // on fait apparaitre le bottomSheetModal
      setSetCardActiveIndex(setCardSelectedIndex); // on met à jour le state setCardActive
    },
    [setsList]
  );

  const setsToShowMultipleStatsLists = setsList.map((setToShow) => {
    const setToShowStatsList = searchSetStatsFromElementsIds(
      setToShow.classIds
    );
    return setToShowStatsList;
  });

  const [setCardActiveIndex, setSetCardActiveIndex] = useState(0); // Stocke l'ID de la `SetCardChosen` active

  const scrollViewRef = useRef(null);

  const addSet = () => {
    setSetsList((prev) => [
      ...prev,
      { ...setDefault, classIds: [...setDefault.classIds] },
    ]);
  };

  const removeSet = (setCardSelectedIndex) => {
    if (setsList.length != 1) {
      setSetsList((prev) =>
        prev.filter((set, index) => index != setCardSelectedIndex)
      );
    }
    showToast("Erreur", "Vous devez garder au moins 1 set");
  };

  const updateSetsList = () => {
    const pressedClassIds = pressableImagesList
      .filter((element) => element.pressed)
      .map((element) => {
        return element.classId;
      });

    const pressedClassIdsWithoutRepetition = [...new Set(pressedClassIds)];

    setSetsList((prev) =>
      prev.map((set, index) => {
        return index === setCardActiveIndex
          ? { ...set, classIds: pressedClassIdsWithoutRepetition }
          : set;
      })
    );
  };

  useEffect(() => {
    updateSetsList();
  }, [pressableImagesList]);

  useEffect(() => {
    handlePressSetUpdatePressableImagesList(
      setsList[setCardActiveIndex].classIds
    ); // on met à jour le pressableImagesList
  }, [setCardActiveIndex]);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScrollView ref={scrollViewRef}>
          <View style={styles.container}>
            <Text style={styles.text}>DisplaySetScreen</Text>

            <StatSliderResultSelectorPressable
              setFoundStatsModalVisible={setFoundStatsModalVisible}
            />

            <Pressable
              style={[button_icon(th).container, shadow_3dp]}
              onPress={addSet}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={th.on_primary}
              />
            </Pressable>

            <MyModal
              modalTitle={translate("StatsToDisplay")}
              isModalVisible={foundStatsModalVisible}
              setIsModalVisible={setFoundStatsModalVisible}
              ModalContent={StatSelector}
              contentProps={{
                statList: isFoundStatsVisible, // Utilisation correcte des paires clé-valeur
                setStatList: setIsFoundStatsVisible,
                keepOneCondition: false,
              }}
            />
          </View>

          <SetCardContainer
            setsToShow={setsList}
            displayCase={true}
            handlePresentModalPress={handlePresentModalPress}
            removeSet={removeSet}
          />

          <View
            style={{ padding: 20, backgroundColor: "yellow", width: "100%" }}
          >
            <MultiStateToggleButton
              number={orderNumber}
              setNumber={setOrderNumber}
              iconsNames={imagesOrderIconsNames}
            />

            {/* <ElementsSelector
              displayCase={true}
              orderNumber={orderNumber}
              setCardActiveIndex={setCardActiveIndex}
              setSetsList={setSetsList}
              //removeSet={removeSet}
              scrollViewRef={scrollViewRef}
            /> */}
          </View>

          <StatSliderResultContainer
            setsToShowMultipleStatsLists={setsToShowMultipleStatsLists}
            isFoundStatsVisible={isFoundStatsVisible}
            chosenStats={[null] * 12}
            displayCase={true}
          />

          <MyBottomSheetModal
            modalTitle={translate("Selectionner")}
            ModalContentsList={[ElementsSelector]}
            contentPropsList={[
              {
                displayCase: true,
                orderNumber: orderNumber,
              },
            ]}
            bottomSheetModalRef={bottomSheetModalRef}
          />

          <Pressable onPress={handlePresentModalPress}>
            <Text>tooooooo</Text>
          </Pressable>
        </ScrollView>
        <Toast />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default DisplaySetScreenContent;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    width: "100%",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "pink",
  },
  statContainer: {
    width: screenWidth * 0.9,
    marginVertical: 4,
    alignItems: "flex-start",
    backgroundColor: "gray",
    paddingHorizontal: 0,
    borderColor: "green",
    borderWidth: 3,
  },
  sliderContainer: {
    width: "100%",
    backgroundColor: "green",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    padding: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pressable: {
    backgroundColor: "#2196F3",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
  },
});
