export const toggleAndGetChecks = (prev, name) => {
  return prev.map((item) => (item.name === name ? { ...item, checked: !item.checked } : item));
};

export const toggleCheckList = (setStatsList, name) => {
  setStatsList((prev) => {
    return toggleAndGetChecks(prev, name);
  });
};
