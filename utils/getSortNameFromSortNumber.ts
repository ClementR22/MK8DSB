import { StatNameSort } from "@/data/stats/statsTypes";

export const sortNameMap: { [key: string]: { asc: number; desc: number } } = {
  id: { asc: 0, desc: 1 },
  name: { asc: 2, desc: 3 },
  speedGround: { asc: 4, desc: 5 },
  speedAntiGravity: { asc: 6, desc: 7 },
  speedWater: { asc: 8, desc: 9 },
  speedAir: { asc: 10, desc: 11 },
  handlingGround: { asc: 12, desc: 13 },
  handlingAntiGravity: { asc: 14, desc: 15 },
  handlingWater: { asc: 16, desc: 17 },
  handlingAir: { asc: 18, desc: 19 },
  acceleration: { asc: 20, desc: 21 },
  weight: { asc: 22, desc: 23 },
  traction: { asc: 24, desc: 25 },
  miniTurbo: { asc: 26, desc: 27 },
};

export function getSortNameFromSortNumber(sortNumber: number): StatNameSort | undefined {
  for (const sortName in sortNameMap) {
    if (sortNameMap.hasOwnProperty(sortName)) {
      const { asc, desc } = sortNameMap[sortName];
      if (sortNumber === asc || sortNumber === desc) {
        return sortName as StatNameSort;
      }
    }
  }
  return undefined;
}

export const getCurrentDirection = (sortNum: number) => {
  return sortNum % 2 === 0 ? "asc" : "desc";
};
