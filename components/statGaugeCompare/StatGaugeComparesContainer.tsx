import React, { useMemo } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import StatGaugeCompare from "./StatGaugeCompare";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { box_shadow_z1 } from "../styles/shadow";
import { BORDER_RADIUS_CONTAINER_LOWEST } from "@/utils/designTokens";
import useBuildsListStore from "@/stores/useBuildsListStore";

interface StatGaugeComparesContainerProps {
  buildsColorsMap: Map<string, string>;
}

const StatGaugeComparesContainer: React.FC<StatGaugeComparesContainerProps> = ({ buildsColorsMap }) => {
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();
  const buildsListDisplayed = useBuildsListStore((state) => state.buildsListDisplayed);

  const data = useMemo(() => {
    const statIndexMap = new Map(statNames.map((name, index) => [name, index]));

    return resultStats
      .filter((stat) => stat.checked)
      .map((stat) => ({
        name: stat.name,
        buildsIdAndValueWithColor: buildsListDisplayed.map((build) => ({
          id: build.id,
          value: build.stats[statIndexMap.get(stat.name)!],
          color: buildsColorsMap.get(build.id) || theme.surface_variant,
        })),
      }));
  }, [resultStats, buildsListDisplayed, buildsColorsMap, theme.surface_variant]);

  return (
    <BoxContainer gap={7} boxShadow={box_shadow_z1} borderRadius={BORDER_RADIUS_CONTAINER_LOWEST}>
      {data.map(({ name, buildsIdAndValueWithColor }) => {
        return <StatGaugeCompare key={name} name={name} buildsIdAndValue={buildsIdAndValueWithColor} />;
      })}
    </BoxContainer>
  );
};

export default React.memo(StatGaugeComparesContainer);
