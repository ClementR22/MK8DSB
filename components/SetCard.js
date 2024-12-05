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
import StatSliderResult from "./StatSliderResult";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import { card } from "./styles/card";
import { useTheme } from "./styles/theme";
import MyModal from "./MyModal";
import SetImagesDisplayer from "./SetImagesDisplayer";

const elementDenominations = ["character", "body", "wheels", "glider"];
const bodyDenominations = ["kart", "bike", "sportBike", "ATV"];
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetCard = ({ setToShow, isFoundStatsVisible, chosenStats }) => {
  const th = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setToShowElementsIds, setToShowStats] = Array.isArray(setToShow)
    ? setToShow
    : [[], []];

  const displaySetImages = () => {
    setIsModalVisible(true);
  };

  return (
    <View>
      <Pressable style={card(th).container} onPress={displaySetImages}>
        {setToShowElementsIds.map((id, index) => (
          <Text key={"element" + index} style={card(th).text}>
            {elementsAllClassName[index][id]}
          </Text>
        ))}

        {isFoundStatsVisible.map(({ name, checked }, index) => {
          if (checked) {
            return (
              <View
                key={index}
                style={[
                  styles.sliderContainer,
                  { backgroundColor: th.surface_container },
                ]}
              >
                <Text key={index} style={styles.text}>
                  {name} : {JSON.stringify(setToShowStats[index])}
                </Text>
                <StatSliderResult
                  value={setToShowStats[index]}
                  wantedValue={chosenStats[index].value}
                />
              </View>
            );
          }
          return null;
        })}
      </Pressable>

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
