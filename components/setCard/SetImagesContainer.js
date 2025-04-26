import React from "react";
import { View, StyleSheet, Image, FlatList, Pressable } from "react-native";
import { category4Names, elementsAllInfosList } from "../../data/data";
import { translate } from "../../i18n/translations";
import TooltipWrapper from "../TooltipWrapper";
import MyPopover from "../MyPopover";
import { Portal, Provider } from "react-native-paper";

const SetImagesContainer = ({ setToShowClassIds, mode, displaySetImages }) => {
  const data = category4Names.map((category, index) => {
    return {
      category: translate(category),
      elements: elementsAllInfosList
        .filter(({ classId }) => classId === setToShowClassIds[index]) // Filtrer selon classId correspondant
        .map((element) => ({ name: element.name, image: element.image })), // Extraire l'URI de l'image
    };
  });

  const imageSize = mode === "icon" ? 40 : 80;

  const categoryWidth =
    Math.max(...data.map((item) => item.category.length)) * 7;

  console.log("data", data);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <View style={styles.imagesContainer}>
          {item.elements.map(({ name, image }, index) => {
            return mode == "icon" ? (
              <Pressable onPress={() => displaySetImages()}>
                <Image
                  source={image}
                  style={{
                    width: imageSize,
                    height: imageSize,
                  }}
                  resizeMode="contain" // Garde les proportions sans déformation
                />
              </Pressable>
            ) : (
              <MyPopover popoverText="Saluuuuuuuuuuuuuut">
                <View>
                  <Image
                    source={image}
                    style={{
                      width: imageSize,
                      height: imageSize,
                    }}
                    resizeMode="contain" // Garde les proportions sans déformation
                  />
                </View>
              </MyPopover>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.category}
      contentContainerStyle={{ flexGrow: 0 }} // Empêche la FlatList d'occuper plus d'espace que nécessaire
    />
  );
};

export default SetImagesContainer;

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    padding: 10,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: "center", // Centrer le contenu de la colonne 2
    alignItems: "center",
    flexDirection: "row",
  },
});
