import { ScreenName } from "@/contexts/ScreenContext";
import Button from "@/primitiveComponents/Button";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";
import { IconType } from "react-native-dynamic-vector-icons";

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

export const triggerConfig: Record<ScreenName, React.ReactElement> = {
  search: (
    <ButtonIcon
      iconName="checkbox-multiple-marked"
      iconType={IconType.MaterialCommunityIcons}
      tooltipText={tooltipTextConfig.search}
    />
  ),

  save: (
    <ButtonIcon
      iconName="checkbox-multiple-marked"
      iconType={IconType.MaterialCommunityIcons}
      tooltipText={tooltipTextConfig.save}
    />
  ),

  display: (
    <Button
      iconProps={{ name: "checkbox-multiple-marked", type: IconType.MaterialCommunityIcons }}
      tooltipText={tooltipTextConfig.display}
    >
      statsToCompare
    </Button>
  ),
  settings: (
    <ButtonSettings
      title="defaultStats"
      iconProps={{ name: "checkbox-multiple-marked", type: IconType.MaterialCommunityIcons }}
      tooltipText={tooltipTextConfig.settings}
    />
  ),
  gallery: null,
};
