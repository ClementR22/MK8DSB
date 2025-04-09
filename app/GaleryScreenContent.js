import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";

import { usePressableImages } from "../utils/PressableImagesContext";
import { Image } from "react-native";
import { useOrderNumber } from "../utils/OrderNumberContext";
import showToast from "../utils/toast";
import { translate } from "../i18n/translations";
import ElementImage from "../components/elementsSelector/ElementImage";
import ElementsSelector from "../components/elementsSelector/ElementsSelector";

const GaleryScreenContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galerie</Text>
      <ElementsSelector situation={"display"} galeryCase={true} />
    </View>
  );
};

/* 
ANCIENNE VERSION
<View>
{Object.entries(pressableImagesByCategory).map(
  ([categoryKey, categoryClasses]) => (
    <View key={categoryKey} style={styles.categoryContainer}>
      <Text>{translate(categoryKey)}</Text>
      {Object.entries(categoryClasses).map(
        ([classKey, classElements]) => (
          <View key={classKey} style={styles.classContainer}>
            {Object.entries(classElements).map(
              ([
                elementKey,
                { id, name, category, classId, image, pressed },
              ]) => {
                return <ElementImage name={name} image={image} />;
              }
            )}
          </View>
        )
      )}
    </View>
  )
)}
</View> */

export default GaleryScreenContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    backgroundColor: "red",
    padding: 8,
    color: "white",
  },
  categoryContainer: {
    backgroundColor: "green",
  },
  classContainer: {
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "center",
  },
  elementContainer: {
    backgroundColor: "blue",
    alignItems: "center",
  },
});
