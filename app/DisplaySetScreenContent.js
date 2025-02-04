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

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import SetCardFound from "../components/setCard/SetCardFound";

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
import SetCardChosenSelector from "../components/SetCardChosenSelector";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { button_icon } from "../components/styles/button";
import { shadow_3dp } from "../components/styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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

  const [orderNumber, setOrderNumber] = useState(0);

  const imagesOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  const pressedImagesIdsInit = pressableImagesList
    .filter((element) => element.pressed)
    .map((element) => {
      return element.classId;
    }); // - firstElementIdOfCategory[index]

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false; // Si les longueurs sont différentes, ils ne sont pas égaux
    return a.every((value, index) => value === b[index]); // Comparer chaque élément
  };

  const searchSetStatsFromElementsIds = (pressedImagesIds) => {
    const result = setAllInfos.find(([, elementsIds]) => {
      return arraysEqual(elementsIds, pressedImagesIds);
    });

    if (result) {
      const [, , stats] = result; // Extraire directement `stats`
      return stats;
    }
    return null; // Retourner `null` si aucune correspondance n'est trouvée
  };

  const [isFoundStatsVisible, setIsFoundStatsVisible] = useState(
    statNames.map((statName, index) => ({
      name: translate(statName),
      checked: true,
    }))
  );
  const chosenStats = [null] * 12;

  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);

  const setClassIdsInit = [9, 16, 30, 39];

  const [setsList, setSetsList] = useState([
    { id: 0, isPressed: true, setClassIds: setClassIdsInit },
  ]);

  const multipleSetToShowStatsLists = setsList.map((set) => {
    const setToShowIdsList = set.setClassIds;
    const setToShowStatsList = searchSetStatsFromElementsIds(setToShowIdsList);
    return setToShowStatsList;
  });

  const [activeSetCardFound, setActiveSetCardFound] = useState(0); // Stocke l'ID de la `SetCardFound` active

  const addSet = () => {
    const newId = setsList.length;
    setSetsList((prev) =>
      prev.concat({
        id: newId,
        isPressed: false,
        setClassIds: setClassIdsInit,
      })
    );
  };

  const removeSet = (id) => {
    if (setsList.length != 1) {
      setSetsList((prev) => prev.filter((set) => set.id != id));
    }
  };

  const handleSetCardFoundPress = (id) => {
    if (activeSetCardFound != id) {
      setActiveSetCardFound(id); // Définir cette `SetCardFound` comme active
      setSetsList((prev) =>
        prev.map((set) => ({
          ...set,
          isPressed: set.id === id,
        }))
      );
    }
    handlePressSetUpdatePressableImagesList(setsList[id].setClassIds);
  };

  const updateSetsList = () => {
    if (activeSetCardFound !== null) {
      const pressedClassIds = pressableImagesList
        .filter((element) => element.pressed)
        .map((element) => {
          return element.classId;
        });

      const pressedClassIdsWithoutRepetition = [...new Set(pressedClassIds)];

      setSetsList((prev) =>
        prev.map((item) =>
          item.id === activeSetCardFound
            ? { ...item, setClassIds: pressedClassIdsWithoutRepetition }
            : item
        )
      );
    }
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    updateSetsList();
  }, [pressableImagesList]);

  return (
    <ScrollView ref={scrollViewRef}>
      <View style={styles.container}>
        <Text style={styles.text}>DisplaySetScreen</Text>
        <MultiStateToggleButton
          number={orderNumber}
          setNumber={setOrderNumber}
          iconsNames={imagesOrderIconsNames}
        />
        <StatSliderResultSelectorPressable
          setFoundStatsModalVisible={setFoundStatsModalVisible}
        />

        <Pressable
          style={[button_icon(th).container, shadow_3dp]}
          onPress={addSet}
        >
          <MaterialCommunityIcons name="plus" size={24} color={th.on_primary} />
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

        <View style={{ padding: 20, backgroundColor: "yellow", width: "100%" }}>
          <ElementsSelector
            displayCase={true}
            orderNumber={orderNumber}
            activeSetCardFound={activeSetCardFound}
            setSetsList={setSetsList}
            removeSet={removeSet}
            scrollViewRef={scrollViewRef}
          />
        </View>

        <View style={styles.cardsContainer}>
          <SetCardChosenSelector
            setsList={setsList}
            handleSetCardFoundPress={handleSetCardFoundPress}
            removeSet={removeSet}
          />
        </View>

        <StatSliderResultContainer
          multipleSetToShowStatsLists={multipleSetToShowStatsLists}
          isFoundStatsVisible={isFoundStatsVisible}
          chosenStats={chosenStats}
          displayCase={true}
        />
      </View>
    </ScrollView>
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
