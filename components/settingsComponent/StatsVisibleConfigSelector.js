import React from "react";
import MyPicker from "../MyPicker";
import { useStatsVisibleListConfig, statsVisibleConfigList } from "@/contexts/StatsVisibleListConfigContext";
import Text from "../Text";
import { View } from "react-native";
import { translate } from "@/translations/translations";

const StatsVisibleConfigSelector = () => {
  const { statsVisibleConfig, setStatsVisibleConfig } = useStatsVisibleListConfig();

  return (
    <View>
      <Text>{translate("ConfigureDefaultVisibleStats?")}</Text>
      <MyPicker
        value={statsVisibleConfig}
        setValue={setStatsVisibleConfig}
        itemList={statsVisibleConfigList}
        isTranslateLabel={true}
      />
    </View>
  );
};

export default StatsVisibleConfigSelector;
