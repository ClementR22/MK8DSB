import { setAllInfos } from '@/data/data';

const arraysEqual = (a, b) => {
  if (a.length !== b.length) return false; // Si les longueurs sont différentes, ils ne sont pas égaux
  return a.every((value, index) => value === b[index]); // Comparer chaque élément
};

export const searchSetStatsFromElementsIds = (pressedImagesClassIds) => {
  const result = setAllInfos.find(({classIds}) => {
    return arraysEqual(classIds, pressedImagesClassIds);
  });

  return result ? result.stats : [];
};
