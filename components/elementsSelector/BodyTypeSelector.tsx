import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native"; // Add Text for the filter title
import { useThemeStore } from "@/stores/useThemeStore";
import { translate } from "@/translations/translations"; // If you translate body type names

import ImageButtonSelector, { ImageButtonOption } from "./ImageButtonSelector"; // Import the generic selector

// Make sure these match the 'bodyType' property in your BodyElement data
export type BodyType = "kart" | "bike" | "sportBike" | "ATV"; // Example types, update if different

interface BodyTypeSelectorProps {
  onFilterChange: (activeBodyTypes: Set<BodyType>) => void;
  initialActiveTypes: Set<BodyType>;
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

const BodyTypeSelector: React.FC<BodyTypeSelectorProps> = ({ onFilterChange, initialActiveTypes }) => {
  const theme = useThemeStore((state) => state.theme); // Used for activeColor and container background

  const handleSelectionChange = useCallback(
    (keys: string | Set<string>) => {
      onFilterChange(keys as Set<BodyType>); // Cast back to Set<BodyType>
    },
    [onFilterChange]
  );

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <ImageButtonSelector
        options={bodyTypeOptions}
        selectionMode="multiple"
        initialSelection={initialActiveTypes}
        onSelectionChange={handleSelectionChange}
        buttonSize={{ width: 50, height: 50 }} // Consistent size
        activeStyleProperty="borderColor" // Based on your original BodyTypeSelector
        activeColor={theme.primary} // Use theme.primary for active state border
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
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
