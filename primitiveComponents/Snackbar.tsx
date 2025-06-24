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
  // on ajouter une key pour forcer le re-mount
  key: number;
};

const Snackbar = () => {
  const theme = useThemeStore((state) => state.theme);
  const [state, setState] = useState<State>({ visible: false, key: 0 });

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
    const listener = (title: string) => {
      setState((prevState) => ({
        visible: true,
        title,
        // on increment la key pour forcer le re-mount
        key: prevState.key + 1,
      }));
    };

    SnackbarManager.setListener(listener);
    return () => SnackbarManager.setListener(null);
  }, []);

  return (
    <PaperSnackbar
      key={state.key} // Use the key here
      wrapperStyle={styles.wrapper} // Add wrapperStyle for positioning
      contentStyle={snackbarContentStyle}
      visible={state.visible}
      onDismiss={handleDismiss}
      duration={2000}
    >
      {state.title}
    </PaperSnackbar>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute", // To make it appear above other content
    bottom: 0, // Position at the bottom
    left: 0,
    right: 0,
    zIndex: 9999, // Ensure it's on top
  },
});

export default Snackbar;
