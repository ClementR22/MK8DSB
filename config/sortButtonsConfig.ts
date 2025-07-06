import { Stat } from "@/data/stats/statsTypes";
import { IconType } from "react-native-dynamic-vector-icons";

// Define the type for the properties of a statistic icon
export interface SortButtonConfig {
  iconName: string;
  iconType: IconType;
  iconBackgroundColor?: string; // Make it optional as some might derive from theme
}

// Define the union of all possible button names/keys
export type SortButtonName = "close" | "id" | "name" | "speed" | "handling" | Stat;

// Merged configuration for all icons
export const sortButtonsConfig: { [key in SortButtonName]: SortButtonConfig } = {
  // Sorting specific icons
  id: { iconName: "sort-numeric-ascending", iconType: IconType.MaterialCommunityIcons },
  name: { iconName: "sort-alphabetical-ascending", iconType: IconType.MaterialCommunityIcons },

  // General category icons (for sub-menus)
  speed: { iconName: "speedometer", iconType: IconType.SimpleLineIcons },
  handling: { iconName: "steering", iconType: IconType.MaterialCommunityIcons },
  close: { iconName: "close", iconType: IconType.AntDesign },

  // Speed-related icons with specific background colors
  speedGround: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    iconBackgroundColor: "tan",
  },
  speedAntiGravity: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    iconBackgroundColor: "blueviolet",
  },
  speedWater: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    iconBackgroundColor: "dodgerblue",
  },
  speedAir: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    iconBackgroundColor: "powderblue",
  },

  // Handling-related icons with specific background colors
  handlingGround: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    iconBackgroundColor: "tan",
  },
  handlingAntiGravity: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    iconBackgroundColor: "blueviolet",
  },
  handlingWater: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    iconBackgroundColor: "dodgerblue",
  },
  handlingAir: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    iconBackgroundColor: "powderblue",
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
