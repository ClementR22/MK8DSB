import React, { useMemo } from "react";
import useThemeStore from "@/stores/useThemeStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import StatGaugeContainerCompare from "./StatGaugeContainerCompare";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { box_shadow_z1 } from "../styles/shadow";
import { BORDER_RADIUS_CONTAINER_LOWEST } from "@/utils/designTokens";
import useBuildsListStore from "@/stores/useBuildsListStore";
import { useGameData } from "@/hooks/useGameData";
import Placeholder from "../buildCard/placeholder/Placeholder";

interface StatGaugeGroupCompareProps {
  buildsColorsMap: Map<string, string>;
}

const StatGaugeGroupCompare: React.FC<StatGaugeGroupCompareProps> = ({ buildsColorsMap }) => {
  const { buildsDataMap } = useGameData();

  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();
  const buildsListDisplayed = useBuildsListStore((state) => state.buildsListDisplayed);

  const data = useMemo(() => {
    return resultStats
      .filter((stat) => stat.checked)
      .map((stat, index) => ({
        name: stat.name,
        buildsIdAndValueWithColor: buildsListDisplayed.map((build) => {
          const buildData = buildsDataMap.get(build.buildDataId);
          return {
            id: build.buildDataId,
            value: buildData.stats[index],
            color: buildsColorsMap.get(build.buildDataId) || theme.surface_variant,
          };
        }),
      }));
  }, [resultStats, buildsListDisplayed, buildsColorsMap, theme.surface_variant]);

  const noGaugeToShow = data.length === 0;
  const noBuildsToShow = buildsListDisplayed.length === 0;

  return (
    <BoxContainer gap={7} boxShadow={box_shadow_z1} borderRadius={BORDER_RADIUS_CONTAINER_LOWEST}>
      {noBuildsToShow ? (
        <Placeholder text="noBuildToCompare" />
      ) : noGaugeToShow ? (
        <Placeholder text="chooseStatsToCompare" />
      ) : (
        data.map(({ name, buildsIdAndValueWithColor }) => {
          return <StatGaugeContainerCompare key={name} name={name} buildsIdAndValue={buildsIdAndValueWithColor} />;
        })
      )}
    </BoxContainer>
  );
};

export default React.memo(StatGaugeGroupCompare);
