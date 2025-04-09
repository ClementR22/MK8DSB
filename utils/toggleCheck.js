import { useSetsList } from "./SetsListContext";
import showToast from "./toast";

const updateChecks = (prev, name) => {
  const updatedChecks = prev.map((item) =>
    item.name === name
      ? { ...item, value: item.checked ? null : 0, checked: !item.checked }
      : item
  );
  return updatedChecks;
};

export const toggleCheckList = (setStatsList, name) => {
  setStatsList((prev) => {
    return updateChecks(prev, name);
  });
};

export const toggleCheckChosenStats = (
  setChosenStats,
  name,
  setIsFoundStatsVisible
) => {
  setChosenStats((prev) => {
    const newList = updateChecks(prev, name);

    // Vérifiez s'il reste au moins un checked
    const hasChecked = newList.some((item) => item.checked);

    // Si tous les éléments sont décochés, rétablissez l'état de l'élément
    if (!hasChecked) {
      showToast();
      return newList.map((item) =>
        item.name === name ? { ...item, checked: true } : item
      );
    }

    toggleCheckList(setIsFoundStatsVisible, name);

    return newList;
  });
};
