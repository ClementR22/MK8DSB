import React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { category4Names, elementsAllInfosList } from "../../data/data";
import { translate } from "../../i18n/translations";

const SetImagesContainer = ({ setToShowClassIds, imageSize }) => {
  const data = category4Names.map((category, index) => {
    return {
      category: translate(category),
      images: elementsAllInfosList
        .filter(({ classId }) => classId === setToShowClassIds[index]) // Filtrer selon classId correspondant
        .map((element) => element.image), // Extraire l'URI de l'image
    };
  });

  const categoryWidth =
    Math.max(...data.map((item) => item.category.length)) * 7;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <View style={styles.imagesContainer}>
          {item.images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={{
                width: imageSize, // Taille fixe pour toutes les icônes
                height: imageSize, // Même taille en hauteur]
              }}
              resizeMode="contain" // Garde les proportions sans déformation
            />
          ))}
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
  closePressable: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
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
