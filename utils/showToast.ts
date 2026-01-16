import i18n, { translateParts } from "@/translations";
import ToastManager, { ToastType } from "./ToastManager";

function showToast(messageKey: string, type?: ToastType, delay?: number) {
  let prefix = "";
  if (type === "error") {
    prefix = i18n.t("toast:error") + i18n.t("text:colon");
  } else if (type === "importError") {
    prefix = i18n.t("toast:importError") + i18n.t("text:colon");
  } else if (type === "success") {
    prefix = i18n.t("toast:success") + i18n.t("text:colon");
  }

  const finalMessage = prefix + translateParts(messageKey);
  ToastManager.show(finalMessage, delay);
}

export default showToast;
