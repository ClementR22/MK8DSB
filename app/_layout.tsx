import React, { useEffect } from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";
import { Appearance } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";

import EditSetModal from "@/components/modal/EditSetModal";
import LoadSetModal from "@/components/modal/LoadSetModal";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLoadSettings } from "@/hooks/useLoadSettings";
import useSetsStore from "@/stores/useSetsStore";
import Snackbar from "@/components/Snackbar";

export default function RootLayout() {
  const updateSystemTheme = useThemeStore((s) => s.updateSystemTheme);
  const fetchSavedSets = useSetsStore((state) => state.fetchSavedSets);

  useEffect(() => {
    const listener = Appearance.addChangeListener(() => {
      updateSystemTheme();
    });
    return () => listener.remove();
  }, []);

  useLoadSettings();
  useEffect(() => {
    fetchSavedSets();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <PaperProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen
              name="help/HelpSearchSetScreen"
              options={{
                animation: "none",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="help/HelpDisplaySetScreen"
              options={{
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
