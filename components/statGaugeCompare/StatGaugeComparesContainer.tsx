import React, { useMemo } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatGaugeCompare from "./StatGaugeCompare";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { box_shadow_z1 } from "../styles/shadow";
import { BORDER_RADIUS_CONTAINER_LOWEST } from "@/utils/designTokens";

interface StatGaugeComparesContainerProps {
  setsColorsMap: Map<string, string>;
}

const StatGaugeComparesContainer: React.FC<StatGaugeComparesContainerProps> = ({ setsColorsMap }) => {
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);

  const data = useMemo(() => {
    const statIndexMap = new Map(statNames.map((name, index) => [name, index]));

    return resultStats
      .filter((stat) => stat.checked)
      .map((stat) => ({
        name: stat.name,
        setsIdAndValueWithColor: setsListDisplayed.map((set) => ({
          id: set.id,
          value: set.stats[statIndexMap.get(stat.name)!],
          color: setsColorsMap.get(set.id) || theme.surface_variant,
        })),
      }));
  }, [resultStats, setsListDisplayed, setsColorsMap, theme.surface_variant]);

  return (
    <BoxContainer gap={7} boxShadow={box_shadow_z1} borderRadius={BORDER_RADIUS_CONTAINER_LOWEST}>
      {data.map(({ name, setsIdAndValueWithColor }) => {
        return <StatGaugeCompare key={name} name={name} setsIdAndValue={setsIdAndValueWithColor} />;
      })}
    </BoxContainer>
  );
};

export default React.memo(StatGaugeComparesContainer);
