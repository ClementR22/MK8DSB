import enButton from "./locales/en/button.json";
import enCategories from "./locales/en/categories.json";
import enCommon from "./locales/en/common.json";
import enElements from "./locales/en/elements.json";
import enHelpSearch from "./locales/en/helpSearch.json";
import enHelpDisplay from "./locales/en/helpDisplay.json";
import enHelpSave from "./locales/en/helpSave.json";
import enLanguage from "./locales/en/language.json";
import enModal from "./locales/en/modal.json";
import enPlaceholder from "./locales/en/placeholder.json";
import enScreens from "./locales/en/screens.json";
import enSort from "./locales/en/sort.json";
import enStats from "./locales/en/stats.json";
import enText from "./locales/en/text.json";
import enTheme from "./locales/en/theme.json";
import enToast from "./locales/en/toast.json";
import enTooltip from "./locales/en/tooltip.json";

import frButton from "./locales/fr/button.json";
import frCategories from "./locales/fr/categories.json";
import frCommon from "./locales/fr/common.json";
import frElements from "./locales/fr/elements.json";
import frHelpSearch from "./locales/fr/helpSearch.json";
import frHelpDisplay from "./locales/fr/helpDisplay.json";
import frHelpSave from "./locales/fr/helpSave.json";
import frLanguage from "./locales/fr/language.json";
import frModal from "./locales/fr/modal.json";
import frPlaceholder from "./locales/fr/placeholder.json";
import frScreens from "./locales/fr/screens.json";
import frSort from "./locales/fr/sort.json";
import frStats from "./locales/fr/stats.json";
import frText from "./locales/fr/text.json";
import frTheme from "./locales/fr/theme.json";
import frToast from "./locales/fr/toast.json";
import frTooltip from "./locales/fr/tooltip.json";

export const resources = {
  en: {
    button: enButton,
    categories: enCategories,
    common: enCommon,
    elements: enElements,
    helpSearch: enHelpSearch,
    helpDisplay: enHelpDisplay,
    helpSave: enHelpSave,
    language: enLanguage,
    modal: enModal,
    placeholder: enPlaceholder,
    screens: enScreens,
    sort: enSort,
    stats: enStats,
    text: enText,
    theme: enTheme,
    toast: enToast,
    tooltip: enTooltip,
  },

  fr: {
    button: frButton,
    categories: frCategories,
    common: frCommon,
    elements: frElements,
    helpSearch: frHelpSearch,
    helpDisplay: frHelpDisplay,
    helpSave: frHelpSave,
    language: frLanguage,
    modal: frModal,
    placeholder: frPlaceholder,
    screens: frScreens,
    sort: frSort,
    stats: frStats,
    text: frText,
    theme: frTheme,
    toast: frToast,
    tooltip: frTooltip,
  },
};

export type ResourcesType = typeof resources;
