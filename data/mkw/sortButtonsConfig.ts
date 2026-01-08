import { SortButtonProps, SortName } from "@/types/mkw/sorts";
import { IconType } from "react-native-dynamic-vector-icons";

// Merged configuration for all icons
export const sortButtonsConfig: { [key in SortName]: SortButtonProps } = {
  // Sorting specific icons
  id: { iconName: "sort-numeric-ascending", iconType: IconType.MaterialCommunityIcons },
  name: { iconName: "sort-alphabetical-ascending", iconType: IconType.MaterialCommunityIcons },

  // General category icons (for sub-menus)
  speed: { iconName: "speedometer", iconType: IconType.SimpleLineIcons },
  handling: { iconName: "steering", iconType: IconType.MaterialCommunityIcons },

  // Speed-related icons with specific background colors
  speedSmooth: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "smooth",
  },
  speedRough: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "rough",
  },
  speedWater: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "water",
  },

  // Handling-related icons with specific background colors
  handlingSmooth: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "smooth",
  },
  handlingRough: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "rough",
  },
  handlingWater: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "water",
  },

  // Other direct stat sorts
  acceleration: {
    iconName: "keyboard-double-arrow-up",
    iconType: IconType.MaterialIcons,
  },
  weight: {
    iconName: "weight-gram",
    iconType: IconType.MaterialCommunityIcons,
  },
  miniTurbo: {
    iconName: "rocket-launch-outline",
    iconType: IconType.MaterialCommunityIcons,
  },
};
