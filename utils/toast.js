import Snackbar from "./SnackbarManager";

function showToast (text = "Ceci est une alerte temporaire 👋") {
  Snackbar.show(text);
}

export default showToast;
