import ToastManager from "./ToastManager";

function showToast(text = "Ceci est une alerte temporaire 👋", text2?: "success" | "error") {
  ToastManager.show(text);
}

export default showToast;
