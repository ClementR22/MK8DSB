import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  Modal,
  Platform,
} from "react-native";
import { elementsAllClassName } from "../data/data";
import { ScrollView } from "react-native-gesture-handler";
import { elementsImages } from "../data/data";
import StatSliderResult from "./StatSliderResult";

const elementDenominations = ["character", "body", "wheels", "glider"];
const bodyDenominations = ["kart", "bike", "sportBike", "ATV"];
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetCard = ({ setToShow, isFoundedStatsVisible, chosenStats }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setToShowElementsIds, setToShowStats] = Array.isArray(setToShow)
    ? setToShow
    : [[], []];

  const displaySetImages = () => {
    setIsModalVisible(true);
  };

  return (
    <View>
      <Text>{setToShowElementsIds}</Text>
      <Pressable onPress={displaySetImages}>
        <View style={styles.container}>
          {setToShowElementsIds.map((id, index) => (
            <Text key={index}>{elementsAllClassName[index][id]}</Text>
          ))}

          {isFoundedStatsVisible.map(({ name, checked }, index) => {
            if (checked) {
              return (
                <View key={index} style={styles.sliderContainer}>
                  <Text key={index} style={styles.text}>
                    {name} : {JSON.stringify(setToShowStats[index])}
                  </Text>
                  <StatSliderResult
                    chosenValue={chosenStats[index].value}
                    foundValue={setToShowStats[index]}
                    isChosen={chosenStats[index].checked}
                  />
                </View>
              );
            }
            return null;
          })}
        </View>
      </Pressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <ScrollView>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {setToShowElementsIds.map((elementId, index) => {
                const elementKey = elementDenominations[index];
                let imagesToDisplay = null;
                if (index !== 1) {
                  imagesToDisplay =
                    elementsImages[elementKey]?.[elementId] || {};
                } else {
                  imagesToDisplay = {};
                  bodyDenominations.forEach((denomination) => {
                    imagesToDisplay = {
                      ...imagesToDisplay,
                      ...elementsImages[denomination]?.[elementId],
                    };
                  });
                }

                return imagesToDisplay &&
                  Object.keys(imagesToDisplay).length > 0 ? (
                  <View key={index} style={styles.elementView}>
                    {Object.values(imagesToDisplay).map((image, imgIndex) => {
                      return (
                        <Image
                          key={imgIndex}
                          source={image}
                          style={styles.image}
                          resizeMode="contain"
                        />
                      );
                    })}
                  </View>
                ) : null;
              })}
              <Pressable
                style={styles.closePressable}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.pressableText}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default SetCard;

const styles = StyleSheet.create({
  container: {
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
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
    width: 300,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContainer: {
    //width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  elementView: {
    flexDirection: "row",
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    marginBottom: 0,
  },
  closePressable: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 20,
  },
});
