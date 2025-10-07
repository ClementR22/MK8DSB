import React, { useCallback, useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StatusBar as RNStatusBar } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Appearance } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import * as NavigationBar from "expo-navigation-bar";

// Components
import CustomHeader from "@/components/CustomHeader";
import ModalEditSet from "@/components/modal/ModalEditSet";
import ModalLoadSet from "@/components/modal/ModalLoadSet";
import Toast from "react-native-toast-message";
// Help Components - Memoized for performance
import HelpSearchSetScreen from "@/components/helpScreens/HelpSearchSetScreen";
import HelpDisplaySetScreen from "@/components/helpScreens/HelpDisplaySetScreen";
import HelpSavedSetScreen from "@/components/helpScreens/HelpSavedSetScreen";

// Stores
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";

// Utils & Hooks
import { translateToLanguage } from "@/translations/translations";
import { ScreenName } from "@/contexts/ScreenContext"; // Assurez-vous que ScreenName est bien défini ici
import { useLoadSettings } from "@/hooks/useLoadSettings";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { toastConfig } from "@/config/toastConfig";
import { box_shadow_z2 } from "@/components/styles/shadow";

// Helper function to derive screen name from pathname
// This can be extracted to a separate utility file if used elsewhere
const getScreenNameFromPath = (pathname: string): ScreenName | null => {
  if (pathname === "/") return "search";
  // Using .includes() is less precise, consider exact matches or regex if paths become complex
  // For simplicity, keeping it as is, but be aware of potential false positives (e.g., "save" matches "saved")
  if (pathname.includes("isplay")) return "display";
  if (pathname.includes("ave")) return "save"; // This might match 'save' and 'saved', depending on your exact routes.
  return null;
};

export default function TabLayout() {
  const pathname = usePathname();

  // --- Zustand Store Selections ---
  // Select only the parts of the state that are needed
  const setScreenNameForLoadModal = useModalLoadSetStore((state) => state.setScreenNameForLoadModal);
  const fetchSetsSaved = useSetsStore((state) => state.fetchSetsSaved);
  const theme = useThemeStore((state) => state.theme);
  const updateSystemTheme = useThemeStore((state) => state.updateSystemTheme);
  const setStatusBarHeight = useGeneralStore((state) => state.setStatusBarHeight);

  // --- Effects ---

  useEffect(() => {
    setStatusBarHeight(RNStatusBar.currentHeight);

    if (Platform.OS === "android") {
      // Mode immersif total : cache la barre système
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  // Effect to update screenNameForLoadModal based on current path
  useEffect(() => {
    const currentScreen = getScreenNameFromPath(pathname);
    if (currentScreen) {
      setScreenNameForLoadModal(currentScreen);
    }
  }, [pathname, setScreenNameForLoadModal]); // Only re-run if pathname or setter changes

  // Effect to listen for system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(updateSystemTheme);
    return () => listener.remove();
  }, [updateSystemTheme]); // Only re-run if updateSystemTheme function identity changes

  // Effect to fetch saved sets on mount
  useEffect(() => {
    fetchSetsSaved();
  }, [fetchSetsSaved]); // Only re-run if fetchSetsSaved function identity changes

  // Custom hook for loading settings (assuming it has its own internal effects)
  useLoadSettings();

  const language = useLanguageStore((state) => state.language);

  // Use useCallback for header functions to prevent unnecessary re-renders of CustomHeader
  const renderSearchHeader = useCallback(
    () => (
      <CustomHeader icon="magnify" helpComponent={<HelpSearchSetScreen />}>
        {translateToLanguage("FindSetTitle", language)}
      </CustomHeader>
    ),
    [language]
  ); // Dependencies for useCallback

  const renderDisplayHeader = useCallback(
    () => (
      <CustomHeader icon="compare" helpComponent={<HelpDisplaySetScreen />}>
        {translateToLanguage("DisplaySetTitle", language)}
      </CustomHeader>
    ),
    [language]
  );

  const renderSavedHeader = useCallback(
    () => (
      <CustomHeader icon="cards-outline" helpComponent={<HelpSavedSetScreen />}>
        {translateToLanguage("SavedSetTitle", language)}
      </CustomHeader>
    ),
    [language]
  );

  const renderGalleryHeader = useCallback(
    () => <CustomHeader icon="image-outline">{translateToLanguage("GalleryTitle", language)}</CustomHeader>,
    [language]
  );

  const renderSettingsHeader = useCallback(
    () => <CustomHeader icon="settings">{translateToLanguage("SettingsTitle", language)}</CustomHeader>,
    [language]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.surface }} edges={["top"]}>
        <PaperProvider>
          <StatusBar style={theme.theme_surface} />
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: theme.primary,
              tabBarInactiveTintColor: theme.on_surface_variant, // Explicitly set inactive color from theme
              headerShown: true,
              sceneStyle: {
                // For the content area behind the header/tab bar
                backgroundColor: theme.surface,
              },
              tabBarStyle: {
                height: 56, // ou moins (50–60 selon ton design)
                paddingBottom: 0, // supprime le padding ajouté par React Navigation
                backgroundColor: theme.surface_container,
                borderTopWidth: 0,
                boxShadow: box_shadow_z2,
              },
            }}
          >
            <Tabs.Screen
              name="index" // This maps to the default route "/"
              options={{
                title: translateToLanguage("FindSetTabTitle", language),
                tabBarIcon: ({ color }) => <Entypo name={"magnifying-glass"} size={24} color={color} />,
                header: renderSearchHeader, // Use the memoized header function
              }}
            />
            <Tabs.Screen
              name="DisplaySetScreen"
              options={{
                title: translateToLanguage("DisplaySetTabTitle", language),
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="compare" size={24} color={color} />,
                header: renderDisplayHeader,
              }}
            />
            <Tabs.Screen
              name="SavedSetScreen"
              options={{
                title: translateToLanguage("SavedSetTabTitle", language),
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons name={focused ? "cards" : "cards-outline"} size={24} color={color} />
                ),
                header: renderSavedHeader,
              }}
            />
            <Tabs.Screen
              name="GalleryScreen"
              options={{
                title: translateToLanguage("GalleryTabTitle", language),
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? "image" : "image-outline"} size={24} color={color} />
                ),
                header: renderGalleryHeader,
              }}
            />
            <Tabs.Screen
              name="SettingsScreen"
              options={{
                title: translateToLanguage("SettingsTabTitle", language),
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} />
                ),
                header: renderSettingsHeader,
              }}
            />
          </Tabs>
          <ModalEditSet />
          <ModalLoadSet />
          <Toast config={toastConfig} />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
