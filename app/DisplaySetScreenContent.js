import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import StatSlider from "../components/StatSlider";
import { useState, useEffect, useContext, createContext } from "react";
import Checkbox from "expo-checkbox";
import { Modal } from "react-native";
import { Alert } from "react-native";

import { imageSize } from "../components/PressableImage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import SetCard from "../components/SetCard";

import {
  statNames,
  bodyTypeNames,
  bodyTypeNamesDisplay,
  images,
} from "../data/data";

import StatSliderResult from "../components/StatSliderResult";

import { setAllInfos } from "../data/data";

import ResultsNumber from "../components/ResultsNumberSelector";
import ElementsImagesDeselector from "../components/ElementsImagesDeselector";
import ElementsImagesSelector from "../components/ElementsImagesSelector";
import { usePressableImages } from "../utils/usePressableImages";
import { useTheme } from "react-native-paper";
import MultiStateToggleButton from "../components/MultiStateToggleButton";
import { modal } from "../components/styles/modal";
import { translate } from "../i18n/translations";
import StatSliderResultContainer from "../components/StatSliderResultContainer";
import StatSliderResultSelectorPressable from "../components/StatSliderResultSelectorPressable";
import MyModal from "../components/MyModal";
import StatSelector from "../components/StatSelector";
import { toggleCheck } from "../utils/toggleCheck";

const DisplaySetScreenContent = () => {
  const th = useTheme();

  const {
    pressableImagesList,
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageUnique,
  } = usePressableImages();

  const [orderNumber, setOrderNumber] = useState(0);

  const imagesOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  const pressedImagesIds = pressableImagesList
    .filter((element) => element.pressed)
    .map((element) => {
      return element.classId;
    }); // - firstElementIdOfCategory[index]

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false; // Si les longueurs sont différentes, ils ne sont pas égaux
    return a.every((value, index) => value === b[index]); // Comparer chaque élément
  };

  const searchSetFromElementsIds = (pressedImagesIds) => {
    const result = setAllInfos.find(([, elementsIds]) => {
      return arraysEqual(elementsIds, pressedImagesIds);
    });

    if (result) {
      const [, , stats] = result; // Extraire directement `stats`
      return stats;
    }
    return null; // Retourner `null` si aucune correspondance n'est trouvée
  };

  const pressedImagesStats = searchSetFromElementsIds(pressedImagesIds);
  const [isFoundStatsVisible, setIsFoundStatsVisible] = useState(
    statNames.map((statName, index) => ({
      name: translate(statName),
      checked: true,
    }))
  );
  const chosenStats = [null] * 12;

  const [foundedStatsModalVisible, setFoundedStatsModalVisible] =
    useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>DisplaySetScreen</Text>
        <MultiStateToggleButton
          number={orderNumber}
          setNumber={setOrderNumber}
          iconsNames={imagesOrderIconsNames}
        />
        <StatSliderResultSelectorPressable
          setFoundedStatsModalVisible={setFoundedStatsModalVisible}
        />

        <MyModal
          modalTitle={translate("StatsToDisplay")}
          isModalVisible={foundedStatsModalVisible}
          setIsModalVisible={setFoundedStatsModalVisible}
          ModalContent={StatSelector}
          contentProps={{
            isFoundStatsVisible: isFoundStatsVisible, // Utilisation correcte des paires clé-valeur
            setIsFoundStatsVisible: setIsFoundStatsVisible,
            toggleCheck: toggleCheck,
            keepOneCondition: false,
          }}
        />

        <View style={{ padding: 20, backgroundColor: "yellow", width: "100%" }}>
          <ElementsImagesSelector
            displayCase={true}
            orderNumber={orderNumber}
          />
        </View>

        <StatSliderResultContainer
          setToShowStats={pressedImagesStats}
          isFoundStatsVisible={isFoundStatsVisible}
          chosenStats={chosenStats}
        />
      </View>
    </ScrollView>
  );
};

export default DisplaySetScreenContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
});
