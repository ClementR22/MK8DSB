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
import { elementsAllClassName } from "../../data/data";
import { ScrollView } from "react-native";
import StatSliderResult from "../statSliderResult/StatSliderResult";
import { modal } from "../styles/modal";
import { button } from "../styles/button";
import { card } from "../styles/card";
import { useTheme } from "../styles/theme";
import MyModal from "../MyModal";
import SetImagesDisplayer from "./SetCardImagesDisplayer";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const elementDenominations = ["character", "body", "wheels", "glider"];
const bodyDenominations = ["kart", "bike", "sportBike", "ATV"];
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetCard = ({
  setToShowElementsIds,
  setToShowStats,
  isFoundStatsVisible,
  chosenStats,
  isPressed = null,
}) => {
  console.log("dans setCard");
  console.log(
    setToShowElementsIds,
    setToShowStats,
    isFoundStatsVisible,
    chosenStats
  );
  const th = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const displaySetImages = () => {
    setIsModalVisible(true);
  };

  return (
    <View
      style={[
        card(th).container,
        isPressed == false && card(th).unPressed,
        isPressed && card(th).pressed,
      ]}
    >
      {setToShowElementsIds.map((id, index) => {
        console.log(
          "elementsAllClassName[index][id]",
          elementsAllClassName[index][id]
        );
        console.log("elementsAllClassName", elementsAllClassName);
        return (
          <Text key={"element" + index} style={card(th).text}>
            {elementsAllClassName[index][id]}
          </Text>
        );
      })}

      <Pressable
        style={[button_icon(th).container, shadow_3dp]}
        onPress={displaySetImages}
      >
        <MaterialCommunityIcons name="eye" size={24} color={th.on_primary} />
      </Pressable>

      {isPressed == null ? (
        <StatSliderResultContainer
          multipleSetToShowStatsLists={[setToShowStats]}
          isFoundStatsVisible={isFoundStatsVisible}
          chosenStats={chosenStats}
        />
      ) : null}

      <MyModal
        modalTitle={""}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        ModalContent={SetImagesDisplayer}
        contentProps={{ setToShowElementsIds: setToShowElementsIds }}
        closeButtonText="Fermer"
      />
    </View>
  );
};

export default SetCard;

const styles = StyleSheet.create({
  sliderContainer: {
    width: "100%",
    //backgroundColor: th.surface_container,
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
