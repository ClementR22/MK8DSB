import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";

let { width: screenWidth } = Dimensions.get("window");
export const imageSize = screenWidth * 0.155;

const PressableImage = ({
  imageKey,
  source,
  pressed,
  setPressableImage,
  disabled,
}) => {
  return (
    <Pressable
      style={[styles.pressableImage, pressed && styles.pressedImage]}
      onPress={() => setPressableImage()}
      key={imageKey}
      disabled={disabled}
    >
      <Image source={source} style={styles.image} resizeMode="contain" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableImage: {
    padding: 2,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 2,
    marginVertical: 1,
  },
  pressedImage: {
    backgroundColor: "blue",
    borderWidth: 2,
    marginHorizontal: 1,
    marginVertical: 0,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
});

export default PressableImage;
