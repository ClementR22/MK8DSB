import enButton from "./locales/en/button.json";
import enCategories from "./locales/en/categories.json";
import enElementsMK8D from "./locales/en/elementsMK8D.json";
import enElementsMKW from "./locales/en/elementsMKW.json";
import enError from "./locales/en/error.json";
import enGame from "./locales/en/game.json";
import enHelpSearch from "./locales/en/helpSearch.json";
import enHelpDisplay from "./locales/en/helpDisplay.json";
import enHelpSave from "./locales/en/helpSave.json";
import enLanguage from "./locales/en/language.json";
import enModal from "./locales/en/modal.json";
import enPlaceholder from "./locales/en/placeholder.json";
import enScreens from "./locales/en/screens.json";
import enSortsMK8D from "./locales/en/sortsMK8D.json";
import enSortsMKW from "./locales/en/sortsMKW.json";
import enStatsMK8D from "./locales/en/statsMK8D.json";
import enStatsMKW from "./locales/en/statsMKW.json";
import enText from "./locales/en/text.json";
import enTheme from "./locales/en/theme.json";
import enToast from "./locales/en/toast.json";
import enTooltip from "./locales/en/tooltip.json";

import frButton from "./locales/fr/button.json";
import frCategories from "./locales/fr/categories.json";
import frElementsMK8D from "./locales/fr/elementsMK8D.json";
import frElementsMKW from "./locales/fr/elementsMKW.json";
import frError from "./locales/fr/error.json";
import frGame from "./locales/fr/game.json";
import frHelpSearch from "./locales/fr/helpSearch.json";
import frHelpDisplay from "./locales/fr/helpDisplay.json";
import frHelpSave from "./locales/fr/helpSave.json";
import frLanguage from "./locales/fr/language.json";
import frModal from "./locales/fr/modal.json";
import frPlaceholder from "./locales/fr/placeholder.json";
import frScreens from "./locales/fr/screens.json";
import frSortsMK8D from "./locales/fr/sortsMK8D.json";
import frSortsMKW from "./locales/fr/sortsMKW.json";
import frStatsMK8D from "./locales/fr/statsMK8D.json";
import frStatsMKW from "./locales/fr/statsMKW.json";
import frText from "./locales/fr/text.json";
import frTheme from "./locales/fr/theme.json";
import frToast from "./locales/fr/toast.json";
import frTooltip from "./locales/fr/tooltip.json";

export const resources = {
  en: {
    button: enButton,
    categories: enCategories,
    elementsMK8D: enElementsMK8D,
    elementsMKW: enElementsMKW,
    error: enError,
    game: enGame,
    helpSearch: enHelpSearch,
    helpDisplay: enHelpDisplay,
    helpSave: enHelpSave,
    language: enLanguage,
    modal: enModal,
    placeholder: enPlaceholder,
    screens: enScreens,
    sortsMK8D: enSortsMK8D,
    sortsMKW: enSortsMKW,
    statsMK8D: enStatsMK8D,
    statsMKW: enStatsMKW,
    text: enText,
    theme: enTheme,
    toast: enToast,
    tooltip: enTooltip,
  },

  fr: {
    button: frButton,
    categories: frCategories,
    elementsMK8D: frElementsMK8D,
    elementMKW: frElementsMKW,
    error: frError,
    game: frGame,
    helpSearch: frHelpSearch,
    helpDisplay: frHelpDisplay,
    helpSave: frHelpSave,
    language: frLanguage,
    modal: frModal,
    placeholder: frPlaceholder,
    screens: frScreens,
    sortsMK8D: frSortsMK8D,
    sortsMKW: frSortsMKW,
    statsMK8D: frStatsMK8D,
    statsMKW: frStatsMKW,
    text: frText,
    theme: frTheme,
    toast: frToast,
    tooltip: frTooltip,
  },
};

export type ResourcesType = typeof resources;
