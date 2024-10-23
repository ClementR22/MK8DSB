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
  Alert,
} from "react-native";
import { elementsAllClassName } from "../data/data";
import { ScrollView } from "react-native";
import { elementsImages } from "../data/data";
import StatSliderResult from "./StatSliderResult";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import { card } from "./styles/card";
import th from "./styles/theme";

const elementDenominations = ["character", "body", "wheels", "glider"];
const bodyDenominations = ["kart", "bike", "sportBike", "ATV"];
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetCard = ({ setToShow, isFoundStatsVisible, chosenStats }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setToShowElementsIds, setToShowStats] = Array.isArray(setToShow)
    ? setToShow
    : [[], []];

  const displaySetImages = () => {
    setIsModalVisible(true);
    console.log("hey");
  };

  return (
    <View>
      <Pressable style={card.container} onPress={displaySetImages}>
        {setToShowElementsIds.map((id, index) => (
          <Text key={"element" + index} style={card.text}>{elementsAllClassName[index][id]}</Text>
        ))}

        {isFoundStatsVisible.map(({ name, checked }, index) => {
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
      </Pressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <ScrollView>
          <Pressable onPress={() => setIsModalVisible(false)} style={modal.background}>
            <Pressable style={modal.container}>
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
                style={[button.container, modal.close_button_center]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={button.text}>Fermer</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default SetCard;

const styles = StyleSheet.create({
  sliderContainer: {
    width: "100%",
    backgroundColor: th.surface_container,
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
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingHorizontal: 16, // TODO: Fix 5 character width
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
