import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native"; // Utilisez View au lieu de FlatList
import ElementChip from "./ElementChip";
import ElementImage from "./ElementImage";

const RenderElementItem = React.memo(({ element, handlePress, isGalleryMode }) => {
  const { id, name, image, pressed } = element;

  const onItemPress = useCallback(() => {
    handlePress(element);
  }, [handlePress, element]);

  return !isGalleryMode ? (
    <ElementChip key={id} name={name} pressed={pressed} onPress={onItemPress} source={image} />
  ) : (
    <ElementImage key={id} name={name} source={image} />
  );
});

const ElementsView = ({ elements, handlePress, isGalleryMode }) => {
  return (
    <View style={styles.categoryContainer}>
      {/* Utilisez View */}
      {elements.map((element) => (
        <RenderElementItem key={element.id} element={element} handlePress={handlePress} isGalleryMode={isGalleryMode} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "green",
    padding: 20,
    flexDirection: "row", // Activez le flexbox en ligne
    flexWrap: "wrap", // Activez le wrapping
    justifyContent: "flex-start", // ou 'space-around' / 'space-between'
    rowGap: 8, // Espacement vertical entre les lignes
    columnGap: 4, // Espacement horizontal entre les éléments
  },
});

export default React.memo(ElementsView); // Gardez memo sur ElementsView
