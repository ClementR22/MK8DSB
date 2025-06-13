// app/_layout_tabs.tsx
import React, { useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { translate } from "@/translations/translations";
import { ScreenName } from "@/contexts/ScreenContext";
import { useLoadSettings } from "@/hooks/useLoadSettings";
import { Appearance } from "react-native";
import ModalEditSet from "@/components/modal/ModalEditSet";
import ModalLoadSet from "@/components/modal/ModalLoadSet";
import Snackbar from "@/primitiveComponents/Snackbar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import HelpSearchSetScreen from "@/components/help/HelpSearchSetScreen";
import HelpDisplaySetScreen from "@/components/help/HelpDisplaySetScreen";
import HelpSavedSetScreen from "@/components/help/HelpSavedSetScreen";

function screenNameFromPath(pathname: string): ScreenName | null {
  if (pathname === "/") return "search";
  if (pathname.includes("isplay")) return "display";
  if (pathname.includes("ave")) return "save";
  if (pathname.includes("allery")) return "gallery";
  return null;
}

export default function TabLayout() {
  const pathname = usePathname();
  const screenNameForEditModal = useModalsStore((state) => state.screenNameForEditModal);
  const setScreenNameForEditModal = useModalsStore((state) => state.setScreenNameForEditModal);
  const isSetsListUpdated = usePressableElementsStore((state) => state.isSetsListUpdated);
  const setIsSetsListUpdated = usePressableElementsStore((state) => state.setIsSetsListUpdated);
  const pressedClassIdsObjByScreen = usePressableElementsStore((state) => state.pressedClassIdsObjByScreen);
  const pressedClassIdsObj = pressedClassIdsObjByScreen[screenNameForEditModal];
  const updateSetsList = useSetsStore((state) => state.updateSetsList);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const screenName = screenNameFromPath(pathname);
    if (screenName != null) setScreenNameForEditModal(screenName);
  }, [pathname]);

  useEffect(() => {
    if (!isSetsListUpdated) {
      updateSetsList(pressedClassIdsObj, screenNameForEditModal); // Appel de la fonction
      setIsSetsListUpdated(true);
    }
  }, [isSetsListUpdated, updateSetsList, pressedClassIdsObj, screenNameForEditModal, setIsSetsListUpdated]); // Ajouter toutes les dépendances

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
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: "red", // changer la couleur
              tabBarInactiveTintColor: undefined, // changer la couleur
              headerShown: true,
              sceneStyle: {
                backgroundColor: theme.surface,
              },
              tabBarStyle: {
                backgroundColor: theme.surface, // changer la couleur
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: translate("FindSetTabTitle"),
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" size={24} color={color} />,
                header: () => (
                  <CustomHeader icon={"magnify"} helpComponent={<HelpSearchSetScreen />}>
                    {"FindSetTitle"}
                  </CustomHeader>
                ),
              }}
            />
            <Tabs.Screen
              name="DisplaySetScreen"
              options={{
                title: translate("DisplaySetTabTitle"),
                tabBarIcon: ({ color }) => <MaterialIcons name="display-settings" size={24} color={color} />,
                header: () => <CustomHeader helpComponent={<HelpDisplaySetScreen />}>{"DisplaySetTitle"}</CustomHeader>,
              }}
            />
            <Tabs.Screen
              name="SavedSetScreen"
              options={{
                title: translate("SavedSetTabTitle"),
                tabBarIcon: ({ color }) => <MaterialIcons name="save" size={24} color={color} />,
                header: () => (
                  <CustomHeader icon={"save"} helpComponent={<HelpSavedSetScreen />}>
                    {"SavedSetTitle"}
                  </CustomHeader>
                ),
              }}
            />
            <Tabs.Screen
              name="GalleryScreen"
              options={{
                title: translate("GalleryTabTitle"),
                tabBarIcon: ({ color }) => <Ionicons name="image-outline" size={24} color={color} />,
                header: () => (
                  <CustomHeader icon={"image-outline"} helpComponent={<HelpSearchSetScreen />}>
                    {"GalleryTitle"}
                  </CustomHeader>
                ),
              }}
            />
            <Tabs.Screen
              name="SettingsScreen"
              options={{
                title: translate("SettingsTabTitle"),
                tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                header: () => (
                  <CustomHeader icon={"settings"} helpComponent={<HelpSearchSetScreen />}>
                    {"SettingsTitle"}
                  </CustomHeader>
                ),
              }}
            />
          </Tabs>
          <ModalEditSet />
          <ModalLoadSet />
          <Snackbar />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
