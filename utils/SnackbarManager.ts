/**
 * Made thanks to https://github.com/callstack/react-native-paper/issues/2825#issuecomment-1507560542
 */

type Listener = (title: string) => void;

class SnackbarManager {
  listener: Listener | null = null;

  constructor() {
    this.show = this.show.bind(this);
    this.setListener = this.setListener.bind(this);
  }

  setListener(listener: Listener | null): void {
    this.listener = listener;
  }

  show(title: string): void {
    this.listener?.(title);
  }
}

export default new SnackbarManager();