import { ScreenName } from "@/contexts/ScreenContext";
import Button from "@/primitiveComponents/Button";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

export const customTriggerConfig: Record<
  ScreenName,
  {
    customTrigger?: React.ReactElement;
    triggerButtonText?: string;
    iconProps?: { name: string; type: IconType };
  }
> = {
  search: {
    customTrigger: <ButtonIcon iconName="checkbox-multiple-marked" iconType={IconType.MaterialCommunityIcons} />,
  },
  save: {
    customTrigger: <ButtonIcon iconName="checkbox-multiple-marked" iconType={IconType.MaterialCommunityIcons} />,
  },
  display: {
    triggerButtonText: "statsToCompare",
    iconProps: { name: "checkbox-multiple-marked", type: IconType.MaterialCommunityIcons },
  },
  settings: {
    triggerButtonText: "defaultStats",
    iconProps: { name: "checkbox-multiple-marked", type: IconType.MaterialCommunityIcons },
  },
  gallery: null,
};

export const modalTitleConfig: Record<ScreenName, string> = {
  search: "desiredStatsAndStatsInBuilds",
  display: "statsToCompare",
  save: "displayedStatsInBuilds",
  gallery: null,
  settings: "defaultDisplayedStats",
};

export const tooltipTextConfig: Record<ScreenName, string> = {
  search: "desiredStatsAndStatsInBuilds",
  display: "statsToCompare",
  save: "displayedStatsInBuilds",
  gallery: null,
  settings: "configureDefaultStats",
};
