// app/_layout.tsx
import React, { useEffect } from "react";
import { Stack } from "expo-router"; // Importe Stack de expo-router
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";
import { Appearance } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

import EditSetModal from "@/components/modal/EditSetModal";
import LoadSetModal from "@/components/modal/LoadSetModal";
import { translate } from "@/translations/translations";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Snackbar from "@/components/Snackbar";

export default function RootLayout() {
  const updateSystemTheme = useThemeStore((s) => s.updateSystemTheme);

  useEffect(() => {
    const listener = Appearance.addChangeListener(() => {
      updateSystemTheme();
    });
    return () => listener.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <PaperProvider>
          <Stack>
            {/* Tes onglets principaux - `_layout_tabs` est le nom de ton fichier layout d'onglets */}
            {/* Les options de `headerShown: false` sont correctes ici */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* L'écran d'aide qui s'ouvrira en modal */}
            <Stack.Screen
              name="help/HelpSearchSetScreen" // Correspond au dossier `app/help`
              options={{
                title: translate("FindSetTabTitle"),
                animation: "none",
                headerShown: false,
              }}
            />
          </Stack>
          <EditSetModal />
          <LoadSetModal />
          <Toast />
          <Snackbar />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
