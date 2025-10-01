/**
 * Gestionnaire de toasts simplifié pour react-native-toast-message
 */

import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

class ToastManager {
  constructor() {
    this.show = this.show.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.info = this.info.bind(this);
  }

  show(title: string, type: ToastType = "info"): void {
    // Masquer le toast actuel avant d'en afficher un nouveau
    Toast.hide();

    // Petit délai pour permettre l'animation de fermeture
    setTimeout(() => {
      Toast.show({
        type,
        text1: title,
        position: "bottom",
        visibilityTime: 2000,
      });
    }, 100);
  }

  success(title: string): void {
    this.show(title, "success");
  }

  error(title: string): void {
    this.show(title, "error");
  }

  info(title: string): void {
    this.show(title, "info");
  }
}

export default new ToastManager();
