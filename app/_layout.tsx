import React, { useCallback, useEffect } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import Toast from "react-native-toast-message";

import CustomHeader from "@/components/CustomHeader";
import EditBuildModal from "@/components/modal/EditBuildModal";
import LoadBuildModal from "@/components/modal/LoadBuildModal";
import HelpSearchBuildScreen from "@/components/helpScreens/HelpSearchBuildScreen";
import HelpDisplayBuildScreen from "@/components/helpScreens/HelpDisplayBuildScreen";
import HelpSavedBuildScreen from "@/components/helpScreens/HelpSavedBuildScreen";

import useThemeStore from "@/stores/useThemeStore";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";
import useBuildsListStore from "@/stores/useBuildsListStore";
import useGeneralStore from "@/stores/useGeneralStore";

import { useLoadSettings } from "@/hooks/useLoadSettings";
import { toastConfig } from "@/config/toastConfig";
import { useTranslation } from "react-i18next";

import ButtonIconWithBadge from "@/components/sortModeSelector/ButtonIconWithBadge";
import { IconType } from "react-native-dynamic-vector-icons";
import { useInitStatsStore } from "@/hooks/useInitStatsStore";
import useGameStore from "@/stores/useGameStore";
import { useInitResultStatsDefaultStore } from "@/hooks/useInitResultStatsDefaultStore";
import { useInitBuildsListStore } from "@/hooks/useInitBuildsListStore";

export default function TabLayout() {
  const { t } = useTranslation("screens");
  const game = useGameStore((state) => state.game);

  const loadBuildsSaved = useBuildsActionsStore((state) => state.loadBuildsSaved);
  const theme = useThemeStore((state) => state.theme);
  const updateSystemTheme = useThemeStore((state) => state.updateSystemTheme);
  const buildsListSaved = useBuildsListStore((state) => state.buildsListSaved);
  const numberSavedBuilds = useGeneralStore((state) => state.numberSavedBuilds);
  const setNumberSavedBuilds = useGeneralStore((state) => state.setNumberSavedBuilds);

  useEffect(() => {
    const listener = Appearance.addChangeListener(updateSystemTheme);
    return () => listener.remove();
  }, [updateSystemTheme]);

  useEffect(() => {
    loadBuildsSaved();
  }, [loadBuildsSaved]);

  useLoadSettings();

  useInitStatsStore();

  useInitResultStatsDefaultStore();

  useInitBuildsListStore();

  useEffect(() => {
    setNumberSavedBuilds(buildsListSaved.length);
  }, [buildsListSaved]);

  const renderSearchHeader = useCallback(
    () => (
      <CustomHeader
        iconName="magnify"
        iconType={IconType.MaterialCommunityIcons}
        title="findSetTitle"
        helpComponent={<HelpSearchBuildScreen />}
      />
    ),
    []
  );
  const renderDisplayHeader = useCallback(
    () => (
      <CustomHeader
        iconName="compare"
        iconType={IconType.MaterialCommunityIcons}
        title="displaySetTitle"
        helpComponent={<HelpDisplayBuildScreen />}
      />
    ),
    []
  );
  const renderSavedHeader = useCallback(
    () => (
      <CustomHeader
        iconName="cards"
        iconType={IconType.MaterialCommunityIcons}
        title="savedSetTitle"
        helpComponent={<HelpSavedBuildScreen />}
      />
    ),
    []
  );
  const renderGalleryHeader = useCallback(
    () => <CustomHeader iconName="image" iconType={IconType.Ionicons} title="galleryTitle" />,
    []
  );
  const renderSettingsHeader = useCallback(
    () => <CustomHeader iconName="settings" iconType={IconType.Ionicons} title="settingsTitle" />,
    []
  );

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <StatusBar style={theme.theme_surface} />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.on_surface_variant,
            sceneStyle: { backgroundColor: theme.surface },
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "500",
              marginTop: 2,
            },
            tabBarStyle: {
              backgroundColor: theme.surface_container,
              borderTopWidth: 0,
              elevation: 1,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: t("findSetTabTitle"),
              tabBarIcon: ({ color }) => (
                <ButtonIconWithBadge
                  tooltipText=""
                  iconName="magnify"
                  iconType={IconType.MaterialCommunityIcons}
                  backgroundColor="transparent"
                  iconColor={color}
                  isBadge={false}
                />
              ),
              header: renderSearchHeader,
            }}
          />
          <Tabs.Screen
            name="DisplayBuildScreen"
            options={{
              title: t("displaySetTabTitle"),
              tabBarIcon: ({ color }) => (
                <ButtonIconWithBadge
                  tooltipText=""
                  iconName="compare"
                  iconType={IconType.MaterialCommunityIcons}
                  backgroundColor="transparent"
                  iconColor={color}
                  isBadge={false}
                />
              ),
              header: renderDisplayHeader,
            }}
          />
          <Tabs.Screen
            name="SavedBuildScreen"
            options={{
              title: t("savedSetTabTitle"),
              tabBarIcon: ({ color, focused }) => (
                <ButtonIconWithBadge
                  tooltipText=""
                  iconName={focused ? "cards" : "cards-outline"}
                  iconType={IconType.MaterialCommunityIcons}
                  badgeText={numberSavedBuilds}
                  backgroundColor="transparent"
                  iconColor={color}
                />
              ),
              header: renderSavedHeader,
            }}
          />
          <Tabs.Screen
            name="GalleryScreen"
            options={{
              title: t("galleryTabTitle"),
              tabBarIcon: ({ color, focused }) => (
                <ButtonIconWithBadge
                  tooltipText=""
                  iconName={focused ? "image" : "image-outline"}
                  iconType={IconType.Ionicons}
                  backgroundColor="transparent"
                  iconColor={color}
                  isBadge={false}
                />
              ),
              header: renderGalleryHeader,
            }}
          />
          <Tabs.Screen
            name="SettingsScreen"
            options={{
              title: t("settingsTabTitle"),
              tabBarIcon: ({ color, focused }) => (
                <ButtonIconWithBadge
                  tooltipText=""
                  iconName={focused ? "settings" : "settings-outline"}
                  iconType={IconType.Ionicons}
                  backgroundColor="transparent"
                  iconColor={color}
                  isBadge={false}
                />
              ),
              header: renderSettingsHeader,
            }}
          />
        </Tabs>
        <EditBuildModal />
        <LoadBuildModal />
        <Toast config={toastConfig} bottomOffset={59} swipeable={false} />
      </MenuProvider>
    </SafeAreaProvider>
  );
}
