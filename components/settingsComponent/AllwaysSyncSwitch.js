import React from "react";
import { Text } from "react-native";
import { Switch } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useSettings } from "@/contexts/SettingsContext";
import FlexContainer from "@/components/FlexContainer";

const AllwaysSyncSwitch = () => {
  const { isAllwaysSync, setIsAllwaysSync } = useSettings();

  return (
    <FlexContainer flexDirection="row" justifyContent="space-between">
      <Switch value={isAllwaysSync} onValueChange={() => setIsAllwaysSync(!isAllwaysSync)} />
      <Text style={{ textAlign: "right" }}>{translate("AllwaysSyncVisibilityOfFoundSetsStatsWithChosenStats")}</Text>
    </FlexContainer>
  );
};

export default AllwaysSyncSwitch;

