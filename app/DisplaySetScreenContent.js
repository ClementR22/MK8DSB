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
import MyModal from "../components/MyModal";
import StatSelector from "../components/StatSelector";
import { button_icon } from "../components/styles/button";
import { shadow_3dp } from "../components/styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SetCardContainer from "../components/setCard/SetCardContainer";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetsList } from "../utils/SetsListContext";

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

  const {
    setsList,
    setsSavedList,
    addSet,
    updateSetsList,
    setCardActiveIndex,
  } = useSetsList();

  const situation = "cestmasituation";

  const [orderNumber, setOrderNumber] = useState(0);

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

  const [savedSetModalVisible, setSavedSetModalVisible] = useState(false);

  const setsToShowMultipleStatsLists = setsList.map((setToShow) => {
    const setToShowStatsList = searchSetStatsFromElementsIds(
      setToShow.classIds
    );
    return setToShowStatsList;
  });

  const scrollViewRef = useRef(null);

  useEffect(() => {
    updateSetsList(pressableImagesList);
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

            <Pressable
              onPress={() => {
                console.log("setsSavedList", setsSavedList);
                console.log("setsList", setsList);
              }}
            >
              <Text>afficher setsList</Text>
            </Pressable>

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

            <Pressable onPress={() => AsyncStorage.clear()}>
              <Text style={styles.button}>remove</Text>
            </Pressable>

            <Pressable
              style={[button_icon(th).container, shadow_3dp]}
              onPress={() => setSavedSetModalVisible(true)}
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

            <MyModal
              modalTitle={translate("LoadASet")}
              isModalVisible={savedSetModalVisible}
              setIsModalVisible={setSavedSetModalVisible}
              ModalContentsList={[SetCardContainer]}
              contentPropsList={[
                {
                  setsToShow: setsSavedList,
                },
              ]}
            />
          </View>

          <SetCardContainer
            setsToShow={setsList}
            isFoundStatsVisible={isFoundStatsVisible}
          />

          <StatSliderResultContainer
            setsToShowMultipleStatsLists={setsToShowMultipleStatsLists}
            isFoundStatsVisible={isFoundStatsVisible}
            chosenStats={[null] * 12}
            situation={situation}
          />
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
