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

  return (
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
            <CustomHeader icon={"magnify"} helpRoute="/help/HelpSearchSetScreen">
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
          header: () => <CustomHeader helpRoute="/help/HelpDisplaySetScreen">{"DisplaySetTitle"}</CustomHeader>,
        }}
      />
      <Tabs.Screen
        name="SavedSetScreen"
        options={{
          title: translate("SavedSetTabTitle"),
          tabBarIcon: ({ color }) => <MaterialIcons name="save" size={24} color={color} />,
          header: () => (
            <CustomHeader icon={"save"} helpRoute="/help/HelpSearchSetScreen">
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
            <CustomHeader icon={"image-outline"} helpRoute="/help/HelpSearchSetScreen">
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
            <CustomHeader icon={"settings"} helpRoute="/help/HelpSearchSetScreen">
              {"SettingsTitle"}
            </CustomHeader>
          ),
        }}
      />
    </Tabs>
  );
}
