import React from "react";
import { View, StyleSheet } from "react-native"; // Add Text for the filter title
import { useThemeStore } from "@/stores/useThemeStore";

import ImageButtonSelector, { ImageButtonOption } from "./ImageButtonSelector"; // Import the generic selector
import { Bodytype } from "@/data/bodytypes/bodytypeTypes";

interface BodytypesSelectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const bodytypeImageSources: { [key in Bodytype]: any } = {
  kart: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  bike: require("@/assets/images/elementsImages/bikes/Standard Bike.png"),
  sportBike: require("@/assets/images/elementsImages/sportBikes/Sport Bike.png"),
  ATV: require("@/assets/images/elementsImages/ATVs/Standard ATV.png"),
};

// Transform your body type data into the format expected by ImageButtonSelector
const bodytypeOptions: ImageButtonOption[] = Object.entries(bodytypeImageSources).map(([key, imageUrl]) => ({
  key: key as Bodytype,
  imageUrl: imageUrl,
  label: key, // Use translate if your body types are translatable
}));

const BodytypesSelector: React.FC<BodytypesSelectorProps> = ({ selectedBodytypes, setSelectedBodytypes }) => {
  const theme = useThemeStore((state) => state.theme); // Used for activeColor and container background

  return (
    <View style={styles.container}>
      <ImageButtonSelector
        options={bodytypeOptions}
        selectionMode="multiple"
        initialSelection={selectedBodytypes}
        onSelectionChange={setSelectedBodytypes}
        activeStyleProperty="borderColor" // Based on your original BodytypesSelector
        activeColor={theme.primary} // Use theme.primary for active state border
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    padding: 4,
    alignItems: "center", // Center content horizontally
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "red ",
  },
});

export default BodytypesSelector;
