import i18n from "@/translations";
import ToastManager from "./ToastManager";

type ToastType = "success" | "error";

function showToast(messageKey = "Ceci est une alerte temporaire 👋", type?: ToastType) {
  const translated = i18n.exists(messageKey) ? i18n.t(messageKey) : messageKey;

  let prefix = "";
  if (type === "error") {
    prefix = i18n.t("common:errorPrefix", { defaultValue: "Erreur :" }) + " ";
  } else if (type === "success") {
    prefix = i18n.t("common:successPrefix", { defaultValue: "Succès :" }) + " ";
  }

  const finalMessage = prefix + translated;

  ToastManager.show(finalMessage, type);
}

export default showToast;
