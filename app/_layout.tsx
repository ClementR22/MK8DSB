// app/_layout_tabs.tsx
import React, { useEffect, useMemo, useCallback } from "react";
import { Tabs, usePathname } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // MaterialIcons n'est pas utilisé
import { Appearance } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

// Components
import CustomHeader from "@/components/CustomHeader";
import ModalEditSet from "@/components/modal/ModalEditSet";
import ModalLoadSet from "@/components/modal/ModalLoadSet";
import Snackbar from "@/primitiveComponents/Snackbar";
// Help Components - Memoized for performance
import HelpSearchSetScreen from "@/components/help/HelpSearchSetScreen";
import HelpDisplaySetScreen from "@/components/help/HelpDisplaySetScreen";
import HelpSavedSetScreen from "@/components/help/HelpSavedSetScreen";

// Stores
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { useThemeStore } from "@/stores/useThemeStore";

// Utils & Hooks
import { translateToLanguage } from "@/translations/translations";
import { ScreenName } from "@/contexts/ScreenContext"; // Assurez-vous que ScreenName est bien défini ici
import { useLoadSettings } from "@/hooks/useLoadSettings";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

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
  const screenNameForLoadModal = useModalLoadSetStore((state) => state.screenNameForLoadModal);
  const setScreenNameForLoadModal = useModalLoadSetStore((state) => state.setScreenNameForLoadModal);

  const isSetsListUpdated = usePressableElementsStore((state) => state.isSetsListUpdated);
  const selectedClassIds = usePressableElementsStore((state) => state.selectedClassIds);
  const setIsSetsListUpdated = usePressableElementsStore((state) => state.setIsSetsListUpdated);

  const updateSetsList = useSetsStore((state) => state.updateSetsList);
  const fetchSavedSets = useSetsStore((state) => state.fetchSavedSets);

  const theme = useThemeStore((state) => state.theme);
  const updateSystemTheme = useThemeStore((state) => state.updateSystemTheme);

  // --- Effects ---

  // Effect to update screenNameForLoadModal based on current path
  useEffect(() => {
    const currentScreen = getScreenNameFromPath(pathname);
    if (currentScreen) {
      setScreenNameForLoadModal(currentScreen);
    }
  }, [pathname, setScreenNameForLoadModal]); // Only re-run if pathname or setter changes

  // Effect to update sets list when relevant state changes
  useEffect(() => {
    if (!isSetsListUpdated) {
      // Ensure updateSetsList is memoized by Zustand or it will trigger endlessly
      updateSetsList(selectedClassIds, screenNameForLoadModal);
      setIsSetsListUpdated(true);
    }
  }, [isSetsListUpdated, updateSetsList, selectedClassIds, screenNameForLoadModal, setIsSetsListUpdated]);

  // Effect to listen for system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(updateSystemTheme);
    return () => listener.remove();
  }, [updateSystemTheme]); // Only re-run if updateSystemTheme function identity changes

  // Effect to fetch saved sets on mount
  useEffect(() => {
    fetchSavedSets();
  }, [fetchSavedSets]); // Only re-run if fetchSavedSets function identity changes

  // Custom hook for loading settings (assuming it has its own internal effects)
  useLoadSettings();

  // --- Memoized Headers for Tabs ---
  // Memoize help components to prevent re-rendering when CustomHeader is re-rendered
  const memoizedHelpSearchSetScreen = useMemo(() => <HelpSearchSetScreen />, []);
  const memoizedHelpDisplaySetScreen = useMemo(() => <HelpDisplaySetScreen />, []);
  const memoizedHelpSavedSetScreen = useMemo(() => <HelpSavedSetScreen />, []);
  // If HelpSearchSetScreen is used for Gallery and Settings, you might need separate memoized instances if they have unique state.
  // For now, assuming they are truly identical in content for those tabs.

  const language = useLanguageStore((state) => state.language);

  // Use useCallback for header functions to prevent unnecessary re-renders of CustomHeader
  const renderSearchHeader = useCallback(
    () => (
      <CustomHeader icon="magnify" helpComponent={memoizedHelpSearchSetScreen}>
        {translateToLanguage("FindSetTitle", language)}
      </CustomHeader>
    ),
    [memoizedHelpSearchSetScreen]
  ); // Dependencies for useCallback

  const renderDisplayHeader = useCallback(
    () => (
      <CustomHeader helpComponent={memoizedHelpDisplaySetScreen}>
        {translateToLanguage("DisplaySetTitle", language)}
      </CustomHeader>
    ),
    [memoizedHelpDisplaySetScreen]
  );

  const renderSavedHeader = useCallback(
    () => (
      <CustomHeader icon="heart-outline" helpComponent={memoizedHelpSavedSetScreen}>
        {translateToLanguage("SavedSetTitle", language)}
      </CustomHeader>
    ),
    [memoizedHelpSavedSetScreen]
  );

  const renderGalleryHeader = useCallback(
    () => (
      <CustomHeader icon="image-outline" helpComponent={memoizedHelpSearchSetScreen}>
        {translateToLanguage("GalleryTitle", language)}
      </CustomHeader>
    ),
    [memoizedHelpSearchSetScreen]
  );

  const renderSettingsHeader = useCallback(
    () => (
      <CustomHeader icon="settings" helpComponent={memoizedHelpSearchSetScreen}>
        {translateToLanguage("SettingsTitle", language)}
      </CustomHeader>
    ),
    [memoizedHelpSearchSetScreen]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.surface }} edges={["top"]}>
        <PaperProvider>
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
                backgroundColor: theme.surface,
              },
            }}
          >
            <Tabs.Screen
              name="index" // This maps to the default route "/"
              options={{
                title: translateToLanguage("FindSetTabTitle", language),
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" size={24} color={color} />,
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
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="heart-outline" size={24} color={color} />,
                header: renderSavedHeader,
              }}
            />
            <Tabs.Screen
              name="GalleryScreen"
              options={{
                title: translateToLanguage("GalleryTabTitle", language),
                tabBarIcon: ({ color }) => <Ionicons name="image-outline" size={24} color={color} />,
                header: renderGalleryHeader,
              }}
            />
            <Tabs.Screen
              name="SettingsScreen"
              options={{
                title: translateToLanguage("SettingsTabTitle", language),
                tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                header: renderSettingsHeader,
              }}
            />
          </Tabs>
          {/* Modals and Snackbar are placed outside Tabs to ensure they render above everything */}
          <ModalEditSet />
          <ModalLoadSet />
          <Snackbar />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
