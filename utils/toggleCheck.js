import showToast from './toast';

const updateChecks = (prev, name) => {
  return prev.map((item) =>
    item.name === name ? {...item, checked: !item.checked} : item,
  );
};

export const toggleCheckList = (setStatsList, name) => {
  setStatsList((prev) => {
    return updateChecks(prev, name);
  });
};

export const toggleCheckChosenStats = (
  setChosenStats,
  name,
  setIsStatsVisible,
) => {
  setChosenStats((prev) => {
    const newList = updateChecks(prev, name);
    // Vérifiez s'il reste au moins un checked
    const hasChecked = newList.some((item) => item.checked);

    // Si tous les éléments sont décochés, rétablissez l'état de l'élément
    if (!hasChecked) {
      showToast();
      return newList.map((item) =>
        item.name === name ? {...item, checked: true} : item,
      );
    }

    toggleCheckList(setIsStatsVisible, name);

    return newList;
  });
};
