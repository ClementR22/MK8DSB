import React from "react";
import { View, StyleSheet } from "react-native"; // Add Text for the filter title
import { useThemeStore } from "@/stores/useThemeStore";

import ImageButtonSelector, { ImageButtonOption } from "../ImageButtonSelector"; // Import the generic selector

// Make sure these match the 'bodyType' property in your BodyElement data
export type BodyType = "kart" | "bike" | "sportBike" | "ATV"; // Example types, update if different

interface BodyTypeSelectorProps {
  selectedBodyTypes: Set<BodyType>;
  setSelectedBodyTypes: React.Dispatch<React.SetStateAction<Set<BodyType>>>;
}

const bodyTypeImageSources: { [key in BodyType]: any } = {
  kart: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  bike: require("@/assets/images/elementsImages/bikes/Standard Bike.png"),
  sportBike: require("@/assets/images/elementsImages/sportBikes/Sport Bike.png"),
  ATV: require("@/assets/images/elementsImages/ATVs/Standard ATV.png"),
};

// Transform your body type data into the format expected by ImageButtonSelector
const bodyTypeOptions: ImageButtonOption[] = Object.entries(bodyTypeImageSources).map(([key, imageUrl]) => ({
  key: key as BodyType,
  imageUrl: imageUrl,
  label: key, // Use translate if your body types are translatable
}));

const BodyTypeSelector: React.FC<BodyTypeSelectorProps> = ({ selectedBodyTypes, setSelectedBodyTypes }) => {
  const theme = useThemeStore((state) => state.theme); // Used for activeColor and container background

  return (
    <View style={styles.container}>
      <ImageButtonSelector
        options={bodyTypeOptions}
        selectionMode="multiple"
        initialSelection={selectedBodyTypes}
        onSelectionChange={setSelectedBodyTypes}
        activeStyleProperty="borderColor" // Based on your original BodyTypeSelector
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

export default BodyTypeSelector;
