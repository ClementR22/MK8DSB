import React, { useCallback, useEffect } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StatusBar as RNStatusBar } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Appearance } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

// Components
import CustomHeader from "@/components/CustomHeader";
import ModalEditBuild from "@/components/modal/ModalEditBuild";
import ModalLoadBuild from "@/components/modal/ModalLoadBuild";
import Toast from "react-native-toast-message";
// Help Components - Memoized for performance
import HelpSearchBuildScreen from "@/components/helpScreens/HelpSearchBuildScreen";
import HelpDisplayBuildScreen from "@/components/helpScreens/HelpDisplayBuildScreen";
import HelpSavedBuildScreen from "@/components/helpScreens/HelpSavedBuildScreen";

// Stores
import { useThemeStore } from "@/stores/useThemeStore";

// Utils & Hooks
import { useLoadSettings } from "@/hooks/useLoadSettings";
import { toastConfig } from "@/config/toastConfig";
import { box_shadow_z2 } from "@/components/styles/shadow";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation("screens");

  // --- Zustand Store Selections ---
  const loadBuildsSaved = useBuildsActionsStore((state) => state.loadBuildsSaved);
  const theme = useThemeStore((state) => state.theme);
  const updateSystemTheme = useThemeStore((state) => state.updateSystemTheme);

  // --- Effects ---

  // Effect to listen for system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(updateSystemTheme);
    return () => listener.remove();
  }, [updateSystemTheme]);

  // Effect to fetch saved builds on mount
  useEffect(() => {
    loadBuildsSaved();
  }, [loadBuildsSaved]);

  // Custom hook for loading settings (assuming it has its own internal effects)
  useLoadSettings();

  // Use useCallback for header functions to prevent unnecessary re-renders of CustomHeader
  const renderSearchHeader = useCallback(
    () => <CustomHeader icon="magnify" title="findSetTitle" helpComponent={<HelpSearchBuildScreen />} />,
    []
  ); // Dependencies for useCallback

  const renderDisplayHeader = useCallback(
    () => <CustomHeader icon="compare" title="displaySetTitle" helpComponent={<HelpDisplayBuildScreen />} />,
    []
  );

  const renderSavedHeader = useCallback(
    () => <CustomHeader icon="cards-outline" title="savedSetTitle" helpComponent={<HelpSavedBuildScreen />} />,
    []
  );

  const renderGalleryHeader = useCallback(() => <CustomHeader icon="image-outline" title="galleryTitle" />, []);

  const renderSettingsHeader = useCallback(() => <CustomHeader icon="settings" title="settingsTitle" />, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        <PaperProvider>
          <StatusBar style={theme.theme_surface} />
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: theme.primary,
              tabBarInactiveTintColor: theme.on_surface_variant,
              sceneStyle: {
                // For the content area behind the header/tab bar
                backgroundColor: theme.surface,
              },
              tabBarStyle: {
                backgroundColor: theme.surface_container,
                borderTopWidth: 0,
                boxShadow: box_shadow_z2,
              },
            }}
          >
            <Tabs.Screen
              name="index" // This maps to the default route "/"
              options={{
                title: t("findSetTabTitle"),
                tabBarIcon: ({ color }) => <Entypo name={"magnifying-glass"} size={24} color={color} />,
                header: renderSearchHeader,
              }}
            />
            <Tabs.Screen
              name="DisplayBuildScreen"
              options={{
                title: t("displaySetTabTitle"),
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="compare" size={24} color={color} />,
                header: renderDisplayHeader,
              }}
            />
            <Tabs.Screen
              name="SavedBuildScreen"
              options={{
                title: t("savedSetTabTitle"),
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons name={focused ? "cards" : "cards-outline"} size={24} color={color} />
                ),
                header: renderSavedHeader,
              }}
            />
            <Tabs.Screen
              name="GalleryScreen"
              options={{
                title: t("galleryTabTitle"),
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? "image" : "image-outline"} size={24} color={color} />
                ),
                header: renderGalleryHeader,
              }}
            />
            <Tabs.Screen
              name="SettingsScreen"
              options={{
                title: t("settingsTabTitle"),
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons name={focused ? "settings" : "settings-outline"} size={24} color={color} />
                ),
                header: renderSettingsHeader,
              }}
            />
          </Tabs>
          <ModalEditBuild />
          <ModalLoadBuild />
          <Toast config={toastConfig} bottomOffset={59} swipeable={false} />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
