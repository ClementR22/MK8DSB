import { useCallback, useState, useMemo } from "react";
import { StatName } from "@/types";

export function useSlidersCompact(allStatNames: StatName[], visibleStatNames: StatName[]) {
  const [compactByStat, setCompactByStat] = useState<Record<StatName, boolean>>(() =>
    allStatNames.reduce((acc, name) => ({ ...acc, [name]: false }), {} as Record<StatName, boolean>)
  );

  const isAllCompact = useMemo(() => {
    return visibleStatNames.every((name) => compactByStat[name] === true);
  }, [visibleStatNames, compactByStat]);

  const toggleAll = useCallback(() => {
    const newVal = !isAllCompact;

    setCompactByStat((prev) => {
      const updated = { ...prev };
      for (const name of visibleStatNames) {
        updated[name] = newVal;
      }
      return updated;
    });
  }, [visibleStatNames, isAllCompact]);

  const toggleOne = useCallback((name: StatName) => {
    setCompactByStat((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  return { compactByStat, isAllCompact, toggleAll, toggleOne };
}
