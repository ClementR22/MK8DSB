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

import showToast from "../utils/toast";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import {
  statNames,
  bodyTypeNames,
  bodyTypeNamesDisplay,
  images,
} from "../data/data";

import { setAllInfos } from "../data/data";

import { usePressableImages } from "../utils/PressableImagesContext";
import { useTheme } from "../utils/ThemeContext";
import { translate } from "../i18n/translations";
import StatSliderResultContainer from "../components/statSliderResult/StatSliderResultContainer";
import StatSliderResultSelectorPressable from "../components/statSliderResult/StatSliderResultSelectorPressable";
import MyModal from "../components/modal/MyModal";
import StatSelector from "../components/StatSelector";
import { button_icon } from "../components/styles/button";
import { shadow_3dp } from "../components/styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SetCardContainer from "../components/setCard/SetCardContainer";

// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetsList } from "../utils/SetsListContext";
import { useMemo } from "react";
import { Portal, Provider } from "react-native-paper";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import SavedSetModal from "../components/modal/SavedSetModal";

const DisplaySetScreenContent = () => {
  const th = useTheme();

  const {
    pressableImagesList,
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageUnique,
    setPressableImagesList,
    pressedClassIds,
  } = usePressableImages();

  const {
    setsListDisplayed,
    setsListSaved,
    addSet,
    updateSetsList,
    setCardActiveIndex,
  } = useSetsList();

  const { savedSetModalVisible, toggleSavedSetModal } = useSavedSetModal();

  useEffect(() => {
    updateSetsList(pressedClassIds, savedSetModalVisible ? "save" : "display"); // Met à jour après le rendu
  }, [pressedClassIds]); // Déclenché uniquement quand pressedClassIds change

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

  const setsToShowMultipleStatsLists = setsListDisplayed.map((setToShow) => {
    const setToShowStatsList = searchSetStatsFromElementsIds(
      setToShow.classIds
    );
    return setToShowStatsList;
  });

  const displayedSets = useMemo(() => {
    return setsListDisplayed;
  }, [setsListDisplayed]);

  // A CHECKER

  return (
    <ScrollView scrollEnabled={!savedSetModalVisible}>
      <View style={styles.container}>
        <Text style={styles.text}>DisplaySetScreen</Text>
        <StatSliderResultSelectorPressable
          setFoundStatsModalVisible={setFoundStatsModalVisible}
        />
        <Pressable
          style={[button_icon(th).container, shadow_3dp]}
          onPress={() => addSet()}
        >
          <MaterialCommunityIcons name="plus" size={24} color={th.on_primary} />
        </Pressable>
        <Pressable onPress={() => AsyncStorage.clear()}>
          <Text style={styles.button}>remove</Text>
        </Pressable>
        <Pressable
          style={[button_icon(th).container, shadow_3dp]}
          onPress={() => {
            toggleSavedSetModal(true, "display");
          }}
        >
          <MaterialCommunityIcons
            name="download"
            size={24}
            color={th.on_primary}
          />
        </Pressable>
        <MyModal
          modalTitle={translate("StatsToDisplay")}
          isModalVisible={foundStatsModalVisible}
          setIsModalVisible={setFoundStatsModalVisible}
          ModalContentsList={[StatSelector]}
          contentPropsList={[
            {
              statList: isFoundStatsVisible,
              setStatList: setIsFoundStatsVisible,
              keepOneCondition: false,
            },
          ]}
        />
      </View>

      <SavedSetModal />

      <SetCardContainer
        setsToShow={displayedSets}
        isFoundStatsVisible={isFoundStatsVisible}
        situation="display"
      />

      <StatSliderResultContainer
        setsToShowMultipleStatsLists={setsToShowMultipleStatsLists}
        isFoundStatsVisible={isFoundStatsVisible}
        chosenStats={[null] * 12}
        situation="display"
      />
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
