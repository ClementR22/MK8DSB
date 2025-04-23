import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useOrderNumber } from "../../utils/OrderNumberContext";

const ElementImage = ({ name, source }) => {
  const { imageWidth } = useOrderNumber();

  return (
    <View key={name} style={styles.elementContainer}>
      <Image
        source={source}
        style={{
          width: imageWidth,
          height: imageWidth,
        }}
        resizeMode="contain"
      />
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  elementContainer: {
    backgroundColor: "blue",
    alignItems: "center",
  },
});

export default ElementImage;
