import React from "react";
import Text from "@/components/Text";
import { Switch } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useSettings } from "@/contexts/SettingsContext";
import FlexContainer from "@/components/FlexContainer";

const AllwaysSyncSwitch = () => {
  const { isAllwaysSync, setIsAllwaysSync } = useSettings();

  return (
    <FlexContainer flexDirection="row" justifyContent="space-between">
      <Text>{translate("AllwaysSyncVisibilityOfFoundSetsStatsWithChosenStats")}</Text>
      <Switch value={isAllwaysSync} onValueChange={() => setIsAllwaysSync(!isAllwaysSync)} />
    </FlexContainer>
  );
};

export default AllwaysSyncSwitch;

