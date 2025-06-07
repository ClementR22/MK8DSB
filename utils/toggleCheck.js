export const toggleAndGetChecks = (prev, name) => {
  return prev.map((item) => (item.name === name ? { ...item, checked: !item.checked } : item));
};

export const toggleAndGetChecksForChosenStats = (prev, name) => {
  return prev.map((item) => {
    if (item.name === name) {
      const newChecked = !item.checked;
      return {
        ...item,
        checked: newChecked,
        value: item.value | 0, // met la valeur à 0 seulement quand elle est null
      };
    }
    return item;
  });
};

export const toggleCheckList = (setStatsList, name) => {
  setStatsList((prev) => {
    return toggleAndGetChecks(prev, name);
  });
};
