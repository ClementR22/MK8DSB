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
  DrawerLayoutAndroidComponent,
} from "react-native";
import { elementsAllClassName } from "../data/data";
import { ScrollView } from "react-native";
import { usePressableImages } from "../utils/usePressableImages";
import StatSliderResult from "./StatSliderResult";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import { card } from "./styles/card";
import th from "./styles/theme";
import MyModal from "./MyModal";

const categoryDenominations = ["character", "body", "wheels", "glider"];
const bodyDenominations = ["kart", "bike", "sportBike", "ATV"];
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetImagesDisplayer = ({ setToShowElementsIds }) => {
  const { pressableImagesByCategory } = usePressableImages();
  return (
    <ScrollView>
      {setToShowElementsIds.map((classKey, index) => {
        // renommer, c'est pas elementId
        const categoryKey = categoryDenominations[index];
        let classElementsToDisplayAllInfos = null;

        if (index !== 1) {
          classElementsToDisplayAllInfos =
            pressableImagesByCategory[categoryKey][classKey];
        } else {
          classElementsToDisplayAllInfos = [];
          bodyDenominations.forEach((bodyDenomination) => {
            const classToPush =
              pressableImagesByCategory[bodyDenomination][classKey];
            if (classToPush != undefined) {
              classElementsToDisplayAllInfos.push(
                ...pressableImagesByCategory[bodyDenomination][classKey]
              );
            }
          });
        }

        return (
          <View key={index} style={styles.elementView}>
            {Object.values(classElementsToDisplayAllInfos).map(
              (element, index) => {
                return (
                  <Image
                    key={index}
                    source={element.image.uri}
                    style={styles.image}
                    resizeMode="contain"
                  />
                );
              }
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SetImagesDisplayer;

const styles = StyleSheet.create({
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
