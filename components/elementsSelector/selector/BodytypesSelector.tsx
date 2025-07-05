import React, { useCallback, useMemo, memo } from "react"; // Import memo
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native"; // Add ImageSourcePropType
import { useThemeStore } from "@/stores/useThemeStore";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import TooltipWrapper from "@/components/TooltipWrapper";
import { HALF_GAP } from "../SortModeSelector";

interface BodytypesSelectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

export interface BodytypeOption {
  // Renamed from BodytypeOptions to BodytypeOption for clarity as it's a single item
  name: Bodytype;
  imageUrl: ImageSourcePropType; // Use ImageSourcePropType
}

// Static image sources outside the component to avoid re-creation on renders
const bodytypeImageSources: { [key in Bodytype]: ImageSourcePropType } = {
  kart: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
  bike: require("@/assets/images/elementsImages/bikes/Standard Bike.png"),
  sportBike: require("@/assets/images/elementsImages/sportBikes/Sport Bike.png"),
  ATV: require("@/assets/images/elementsImages/ATVs/Standard ATV.png"),
};

// Static data transformation outside the component
const bodytypeOptions: BodytypeOption[] = Object.entries(bodytypeImageSources).map(([key, imageUrl]) => ({
  name: key as Bodytype,
  imageUrl: imageUrl,
}));

const BUTTON_SIZE = 50; // Define as a constant for reusability and clarity
const BORDER_WIDTH_RATIO = 20; // Define ratio for border width

// Wrap the component in React.memo for performance
const BodytypesSelector: React.FC<BodytypesSelectorProps> = memo(({ selectedBodytypes, setSelectedBodytypes }) => {
  const theme = useThemeStore((state) => state.theme);

  const handlePress = useCallback(
    (name: Bodytype) => {
      setSelectedBodytypes((prevSelectedBodyNames) => {
        // Always create a new Set for immutability to trigger re-renders
        const newSelectedBodyNames = new Set(prevSelectedBodyNames);

        if (newSelectedBodyNames.has(name)) {
          newSelectedBodyNames.delete(name);
        } else {
          newSelectedBodyNames.add(name);
        }

        return newSelectedBodyNames;
      });
    },
    [setSelectedBodytypes] // setSelectedBodytypes is stable, but good practice to include
  );

  // Dynamic style based on theme for the button base
  const buttonBaseDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface_container_high,
      borderColor: "transparent", // Default transparent border for non-active state
    }),
    [theme.surface_container_high]
  );

  // Optimized rendering of buttons using map
  const renderedButtons = useMemo(() => {
    return bodytypeOptions.map((option) => {
      const isActive = selectedBodytypes.has(option.name);

      return (
        <TooltipWrapper
          key={option.name}
          tooltipText={option.name} // Assumes option.name is suitable for tooltip
          onPress={() => handlePress(option.name)}
          innerContainerStyle={[
            styles.button, // Static styles from StyleSheet.create
            buttonBaseDynamicStyle, // Dynamic background/border color based on theme
            isActive && { borderColor: theme.primary }, // Active state border color
          ]}
        >
          <Image source={option.imageUrl} style={styles.image} resizeMode="contain" />
        </TooltipWrapper>
      );
    });
  }, [bodytypeOptions, selectedBodytypes, handlePress, buttonBaseDynamicStyle, theme.primary]); // Explicit dependencies

  return <View style={styles.container}>{renderedButtons}</View>;
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: HALF_GAP,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 3,
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: BUTTON_SIZE, // Use constant
    height: BUTTON_SIZE, // Use constant
    borderWidth: BUTTON_SIZE / BORDER_WIDTH_RATIO, // Use constant
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default BodytypesSelector;
