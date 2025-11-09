import i18n from "@/translations";
import ToastManager, { ToastType } from "./ToastManager";

function showToast(messageKey: string, type?: ToastType) {
  const keysWithNs = messageKey.split("|");

  const translatedParts = keysWithNs.map((keyWithNs) => (keyWithNs.includes(":") ? i18n.t(keyWithNs) : keyWithNs));

  let prefix = "";
  if (type === "error") {
    prefix = i18n.t("toast:error") + i18n.t("text:colon");
  } else if (type === "importError") {
    prefix = i18n.t("toast:importError") + i18n.t("text:colon");
  } else if (type === "success") {
    prefix = i18n.t("toast:success") + i18n.t("text:colon");
  }

  const finalMessage = prefix + translatedParts.join(" ");
  ToastManager.show(finalMessage);
}

export default showToast;
