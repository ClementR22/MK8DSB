import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { translate } from "../../i18n/translations";

const ElementImage_ = ({ name, source }) => {
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
      <Text>{translate(name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  elementContainer: {
    backgroundColor: "blue",
    alignItems: "center",
  },
});

ElementImage_.displayName = "ElementImage"; // Ajout du displayName

const ElementImage = React.memo(ElementImage_);

export default ElementImage;
