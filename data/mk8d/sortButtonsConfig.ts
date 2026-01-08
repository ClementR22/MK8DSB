import { SortButtonProps, SortName } from "@/types/mk8d/sorts";
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
  speedGround: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "ground",
  },
  speedAntiGravity: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "antiGravity",
  },
  speedWater: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "water",
  },
  speedAir: {
    iconName: "speedometer",
    iconType: IconType.SimpleLineIcons,
    backgroundColor: "air",
  },

  // Handling-related icons with specific background colors
  handlingGround: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "ground",
  },
  handlingAntiGravity: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "antiGravity",
  },
  handlingWater: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "water",
  },
  handlingAir: {
    iconName: "steering",
    iconType: IconType.MaterialCommunityIcons,
    backgroundColor: "air",
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
