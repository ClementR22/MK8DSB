/**
 * Made thanks to https://github.com/callstack/react-native-paper/issues/2825#issuecomment-1507560542
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Snackbar as PaperSnackbar } from "react-native-paper";

import SnackbarManager from "@/utils/SnackbarManager";
import { useThemeStore } from "@/stores/useThemeStore";

type State = {
  visible: boolean;
  title?: string;
};

const Snackbar = () => {
  const theme = useThemeStore((state) => state.theme);
  const [state, setState] = useState<State>({ visible: false });

  const snackbarContentStyle = useMemo(
    () => ({
      backgroundColor: theme.inverse_surface,
      color: theme.inverse_on_surface,
    }),
    [theme.inverse_surface, theme.inverse_on_surface]
  );

  const handleDismiss = useCallback(() => {
    setState((prevState) => ({ ...prevState, visible: false }));
  }, []);

  useEffect(() => {
    const listener = (title: string) => setState({ visible: true, title });

    SnackbarManager.setListener(listener);
    return () => SnackbarManager.setListener(null);
  }, []);

  return (
    <PaperSnackbar
      contentStyle={snackbarContentStyle}
      visible={state.visible}
      onDismiss={handleDismiss}
      duration={2000}
    >
      {state.title}
    </PaperSnackbar>
  );
};

export default Snackbar;
