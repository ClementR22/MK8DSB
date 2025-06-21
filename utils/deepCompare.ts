export const deepCompareStatArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    const item1 = arr1[i];
    const item2 = arr2[i];

    // Comparaison superficielle des propriétés de chaque objet
    if (item1.name !== item2.name || item1.checked !== item2.checked) {
      return false;
    }
  }
  return true;
};

export const arraysEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((n1, n2) => n1 - n2);
  const sortedB = [...b].sort((n1, n2) => n1 - n2);
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
};
