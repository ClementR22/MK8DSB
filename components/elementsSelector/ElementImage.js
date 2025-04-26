import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";

const ElementImage = React.memo(({ name, source }) => {
  const imageWidth = 80;

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
});

const styles = StyleSheet.create({
  elementContainer: {
    backgroundColor: "blue",
    alignItems: "center",
  },
});

export default ElementImage;
