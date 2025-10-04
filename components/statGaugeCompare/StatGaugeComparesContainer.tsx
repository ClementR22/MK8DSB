import React, { useMemo } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import useSetsStore from "@/stores/useSetsStore";
import StatGaugeCompare from "./StatGaugeCompare";
import { StatName } from "@/data/stats/statsTypes";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import { box_shadow_z1 } from "../styles/theme";

interface StatGaugeComparesContainerProps {
  setsColorsMap: Map<string, string>;
  scrollToSetCard: (id: string) => void;
}

const StatGaugeComparesContainer: React.FC<StatGaugeComparesContainerProps> = ({ setsColorsMap, scrollToSetCard }) => {
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);

  const data = useMemo(() => {
    const statsChecked = resultStats.filter((stat) => stat.checked).map((stat) => stat.name);

    const data = statsChecked.map((stat: StatName) => {
      const statIndex = statNames.indexOf(stat);
      const setsData = setsListDisplayed.map((set) => ({
        id: set.id,
        value: set.stats[statIndex],
        color: setsColorsMap.get(set.id) || theme.surface_variant,
      }));

      return {
        name: stat,
        setsIdAndValueWithColor: setsData,
      };
    });

    return data;
  }, [resultStats, setsListDisplayed, setsColorsMap, theme.surface_variant]);

  return (
    <BoxContainer gap={7} boxShadow={box_shadow_z1}>
      {data.map(({ name, setsIdAndValueWithColor }) => {
        return (
          <StatGaugeCompare
            key={name}
            name={name}
            setsIdAndValue={setsIdAndValueWithColor}
            scrollToSetCard={scrollToSetCard}
          />
        );
      })}
    </BoxContainer>
  );
};

export default React.memo(StatGaugeComparesContainer);
