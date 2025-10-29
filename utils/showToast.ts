import i18n from "@/translations";
import ToastManager, { ToastType } from "./ToastManager";

function showToast(messageKey: string, type?: ToastType) {
  const keys = messageKey.split(" ");

  const translatedParts = keys.map((key) => i18n.t(key, { ns: "toast" })); // "toast" en fallback

  let prefix = "";
  if (type === "error") {
    prefix = i18n.t("toast:error") + i18n.t("text:colon");
  } else if (type === "success") {
    prefix = i18n.t("toast:success") + i18n.t("text:colon");
  }

  const finalMessage = prefix + translatedParts.join(" ");

  ToastManager.show(finalMessage);
}

export default showToast;
