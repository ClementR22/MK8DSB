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
