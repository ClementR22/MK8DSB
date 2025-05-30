/**
 * Made thanks to https://github.com/callstack/react-native-paper/issues/2825#issuecomment-1507560542
 */

import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar as PaperSnackbar } from 'react-native-paper';

import SnackbarManager from '@/utils/SnackbarManager';
import { useThemeStore } from "@/stores/useThemeStore";

type State = {
  visible: boolean;
  title?: string;
};

const Snackbar = () => {
  const theme = useThemeStore((state) => state.theme);
  const [state, setState] = useState<State>({ visible: false });

  const styles = StyleSheet.create({
    snackbar: {
      backgroundColor: theme.inverse_surface,
      color: theme.inverse_on_surface
    }
  })

  useEffect(() => {
    SnackbarManager.setListener((title) => setState({ visible: true, title }));
    return () => SnackbarManager.setListener(null);
  }, []);

  return (
    <PaperSnackbar contentStyle={styles.snackbar} visible={state.visible} onDismiss={() => setState({ ...state, visible: false })} duration={6000}>
      {state.title}
    </PaperSnackbar>
  );
};

export default Snackbar;