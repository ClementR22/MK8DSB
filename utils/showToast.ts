import ToastManager from "./ToastManager";

function showToast(text = "Ceci est une alerte temporaire 👋") {
  ToastManager.show(text);
}

export default showToast;
