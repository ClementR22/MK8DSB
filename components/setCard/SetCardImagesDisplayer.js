import React from "react";
import { View, StyleSheet, Dimensions, Pressable, Image } from "react-native";
import { ScrollView } from "react-native";
import { usePressableImages } from "../../utils/PressableImagesContext";
import showToast from "../../utils/toast";
import { category4Names } from "../../data/data";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageWidth = Math.min(screenWidth / 5, 120);

const SetCardImagesDisplayer = ({ setToShowElementsIds }) => {
  const { pressableImagesByCategory } = usePressableImages();

  return (
    <ScrollView>
      {setToShowElementsIds.map((classKey, index) => {
        const categoryKey = category4Names[index];
        const classElementsToDisplayAllInfos =
          pressableImagesByCategory[categoryKey][classKey];

        return (
          <View key={index} style={styles.elementView}>
            {Object.values(classElementsToDisplayAllInfos).map(
              (element, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      showToast("yo", element.name);
                    }}
                  >
                    <Image
                      source={element.image.uri}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </Pressable>
                );
              }
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SetCardImagesDisplayer;

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
