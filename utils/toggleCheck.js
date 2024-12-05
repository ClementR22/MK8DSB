export const toggleCheck = (setList, name, keepOneCondition = true) => {
  setList((prev) => {
    const newList = prev.map((item) =>
      item.name === name ? { ...item, checked: !item.checked } : item
    );

    if (keepOneCondition) {
      // Vérifiez s'il reste au moins un checked
      const hasChecked = newList.some((item) => item.checked);

      // Si tous les éléments sont décochés, rétablissez l'état de l'élément
      if (!hasChecked) {
        showToast();
        return newList.map((item) =>
          item.name === name ? { ...item, checked: true } : item
        );
      }
    }

    return newList;
  });
};
