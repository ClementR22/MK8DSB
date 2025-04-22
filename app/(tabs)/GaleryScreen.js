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

import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { usePressableImages } from "../../utils/PressableImagesContext";
import { Image } from "react-native";
import { useOrderNumber } from "../../utils/OrderNumberContext";
import showToast from "../../utils/toast";
import { translate } from "../../i18n/translations";
import ElementImage from "../../components/elementsSelector/ElementImage";
import ElementsSelector from "../../components/elementsSelector/ElementsSelector";

const GaleryScreenContent = () => {
  return (
    <PressableImagesProvider>
      <View style={styles.container}>
        <ElementsSelector situation="galery" galeryCase={true} />
      </View>
    </PressableImagesProvider>
  );
};

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
