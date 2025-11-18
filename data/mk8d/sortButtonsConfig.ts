import { SortName } from "@/types/mk8d/stats";
import { IconType } from "react-native-dynamic-vector-icons";

// Define the type for the properties of a statistic icon
interface SortButtonProps {
  iconName: string;
  iconType: IconType;
  backgroundColor?: string; // Make it optional as some might derive from theme
}

// Merged configuration for all icons
export const sortButtonsConfig: { [key in SortName]: SortButtonProps } = {
  // Sorting specific icons
  id: { iconName: "sort-numeric-ascending", iconType: IconType.MaterialCommunityIcons },
  name: { iconName: "sort-alphabetical-ascending", iconType: IconType.MaterialCommunityIcons },

  // General category icons (for sub-menus)
  speed: { iconName: "speedometer", iconType: IconType.SimpleLineIcons },
  handling: { iconName: "steering", iconType: IconType.MaterialCommunityIcons },

  // Speed-related icons with specific background colors
  speedGround: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "tan",
  },
  speedAntiGravity: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "blueviolet",
  },
  speedWater: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "dodgerblue",
  },
  speedAir: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "powderblue",
  },

  // Handling-related icons with specific background colors
  handlingGround: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "tan",
  },
  handlingAntiGravity: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "blueviolet",
  },
  handlingWater: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "dodgerblue",
  },
  handlingAir: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "powderblue",
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
  traction: {
    iconName: "car-traction-control",
    iconType: IconType.MaterialCommunityIcons,
  },
  miniTurbo: {
    iconName: "rocket-launch-outline",
    iconType: IconType.MaterialCommunityIcons,
  },
};
