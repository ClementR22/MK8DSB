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
        value: newChecked ? 0 : null,
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
