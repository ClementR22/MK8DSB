import React from "react";
import Text from "@/components/Text";
import { Switch } from "react-native-paper";
import { translate } from "@/translations/translations";
import { useSettings } from "@/contexts/SettingsContext";
import FlexContainer from "@/components/FlexContainer";

const IsStatsVisibleDefaultSwitch = () => {
  const { isStatsVisibleDefault, setIsStatsVisibleDefault } = useSettings();

  return (
    <FlexContainer flexDirection="row" justifyContent="space-between">
      <Switch value={isStatsVisibleDefault} onValueChange={() => setIsStatsVisibleDefault(!isStatsVisibleDefault)} />
      <Text>{translate("SetVisibleStatsByDefault")}</Text>
    </FlexContainer>
  );
};

export default IsStatsVisibleDefaultSwitch;

