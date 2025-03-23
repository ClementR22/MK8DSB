import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useOrderNumber } from "../../utils/OrderNumberContext";
import showToast from "../../utils/toast";

const ElementImage = ({ name, uri }) => {
  const { imageWidth } = useOrderNumber();

  return (
    <View key={name} style={styles.elementContainer}>
      <Pressable
        onPress={() => {
          showToast("yo", name);
        }}
      >
        <Image
          source={uri}
          style={{
            width: imageWidth,
            height: imageWidth,
            marginBottom: 0,
          }}
          resizeMode="contain"
        />
      </Pressable>
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
