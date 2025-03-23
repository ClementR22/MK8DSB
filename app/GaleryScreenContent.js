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

const GaleryScreenContent = () => {
  const { pressableImagesByCategory } = usePressableImages();
  const { imageWidth } = useOrderNumber();
  const scrollViewRef = useRef(null);

  const scrollToSection = (sectionRef, animated = true) => {
    sectionRef.current?.measureLayout(
      scrollViewRef.current, // Mesurer par rapport à la ScrollView
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: animated });
      },
      (error) => {
        console.error("Erreur de mesure :", error);
      }
    );
  };

  const sectionRefs = Array.from({ length: 5 }, () => useRef(null));

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Galerie</Text>
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
                          return (
                            <View key={name} style={styles.elementContainer}>
                              <Pressable
                                onPress={() => {
                                  showToast("yo", name);
                                }}
                              >
                                <Image
                                  source={image.uri}
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
                        }
                      )}
                    </View>
                  )
                )}
              </View>
            )
          )}
        </View>
      </View>
    </ScrollView>
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
