import showToast from "./toast";

const toggleAndGetChecks = (prev, name) => {
  return prev.map((item) =>
    item.name === name ? { ...item, checked: !item.checked } : item
  );
};

export const toggleCheckList = (setStatsList, name) => {
  setStatsList((prev) => {
    return toggleAndGetChecks(prev, name);
  });
};

export const toggleCheckChosenStats = (setChosenStats, name) => {
  setChosenStats((chosenStats) => {
    const newList = toggleAndGetChecks(chosenStats, name);
    // Vérifiez s'il reste au moins un checked
    const hasChecked = newList.some((item) => item.checked);

    // Si tous les éléments sont décochés, rétablissez l'état de l'élément
    if (!hasChecked) {
      showToast("Erreur", "Il faut garder au moins une stat");
      return newList.map((item) =>
        item.name === name ? { ...item, checked: true } : item
      );
    }

    return newList;
  });
};
