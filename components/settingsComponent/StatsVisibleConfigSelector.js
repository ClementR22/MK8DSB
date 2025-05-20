import React from "react";
import MyPicker from "../MyPicker";
import Text from "../Text";
import { View } from "react-native";
import { translate } from "@/translations/translations";
import { useStatsVisibleListConfigStore, statsVisibleConfigList } from "@/stores/useStatsVisibleListConfigStore";

const StatsVisibleConfigSelector = () => {
  const statsVisibleConfig = useStatsVisibleListConfigStore((state) => state.statsVisibleConfig);
  const setStatsVisibleConfig = useStatsVisibleListConfigStore((state) => state.setStatsVisibleConfig);

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
