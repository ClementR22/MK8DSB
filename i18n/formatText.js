export const formatText = (text, language) => {
  if (language === 'fr') {
    // Ajouter une espace insécable avant et une espace normale après le :
    return text.replace(/:/g, ' : '); // L'espace insécable est `\u00A0`
  }
  // Pour l'anglais ou autres langues : juste un espace après
  return text.replace(/:/g, ': ');
};
