import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import StatSlider from "../../components/StatSlider";
import ElementsImagesSelector from "../../components/ElementsImagesSelector";
import { useState, useEffect, useContext, createContext } from "react";
import Checkbox from "expo-checkbox";
import { Modal } from "react-native";
import { Alert } from "react-native";

import { imageSize } from "../../components/PressableImage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import SetCard from "../../components/SetCard";

import {
  statNames,
  bodyTypeNames,
  bodyTypeNamesDisplay,
  images,
} from "../../data/data";

import StatSliderResult from "../../components/StatSliderResult";

import { setAllInfos } from "../../data/data";

import ResultsNumber from "../../components/ResultsNumberSelector";
import ElementsImagesDeselector from "../../components/ElementsImagesDeselector";

const DisplaySetScreen = () => {
  const [pressableImages, setPressableImages] = useState(
    initializePressableImages(true)
  );
  const handlePressImageUniqueCompleted = (categoryKey, classKey, imageKey) => {
    handlePressImageUnique(setPressableImages, categoryKey, classKey, imageKey);
  };

  const pressedImagesIds = [];
  Object.entries(pressableImages).forEach(([categoryKey, categoryValue]) => {
    Object.entries(categoryValue).forEach(([classKey, classValue]) => {
      Object.entries(classValue).forEach(([, { pressed }]) => {
        if (pressed) {
          pressedImagesIds.push(+classKey);
        }
      });
    });
  });

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false; // Si les longueurs sont différentes, ils ne sont pas égaux
    return a.every((value, index) => value === b[index]); // Comparer chaque élément
  };

  const searchSetFromElementsIds = (pressedImagesIds) => {
    const result = setAllInfos.find(([, elementsIds]) =>
      arraysEqual(elementsIds, pressedImagesIds)
    );
    if (result) {
      const [, , stats] = result; // Extraire directement `stats`
      return stats;
    }
    return null; // Retourner `null` si aucune correspondance n'est trouvée
  };

  const pressedImagesStats = searchSetFromElementsIds(pressedImagesIds);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>ResearchSetScreen</Text>
        <ElementsImagesSelector
          pressableImages={pressableImages}
          handlePressImage={handlePressImageUniqueCompleted}
          displayCase={true}
        />
        <ElementsImagesDeselector
          pressableImages={pressableImages}
          handlePressImage={null}
          display={true}
        />
        <View style={styles.statContainer}>
          {Object.entries(statNames).map(([, name], index) => {
            const stat_i = pressedImagesStats[index];
            return (
              <View key={index} style={styles.sliderContainer}>
                <Text key={index} style={styles.text}>
                  {name} : {JSON.stringify(stat_i)}
                </Text>
                <StatSliderResult
                  chosenValue={null}
                  foundValue={stat_i}
                  isChosen={false}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default DisplaySetScreen;

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
