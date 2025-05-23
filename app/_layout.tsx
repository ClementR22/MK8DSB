import React, { useEffect } from "react";
import { Tabs, usePathname } from "expo-router";
import Toast from "react-native-toast-message";
import { OrderNumberProvider } from "@/contexts/OrderNumberContext";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";
import { CustomThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import EditSetModal from "@/components/modal/EditSetModal";
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { PaperProvider } from "react-native-paper";
import { translate } from "@/translations/translations"

type ScreenName = "search" | "display" | "save" | "gallery";

function screenNameFromPath(pathname: string): ScreenName | null {
  if (pathname === "/") return "search";
  if (pathname.includes("isplay")) return "display";
  if (pathname.includes("ave")) return "save";
  if (pathname.includes("allery")) return "gallery";
  return null;
}

function InnerTabLayout() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const screenNameForEditModal = useModalsStore((state) => state.screenNameForEditModal);
  const setScreenNameForEditModal = useModalsStore((state) => state.setScreenNameForEditModal);
  const isSetsListUpdated = usePressableElementsStore((state) => state.isSetsListUpdated);
  const setIsSetsListUpdated = usePressableElementsStore((state) => state.setIsSetsListUpdated);
  const pressedClassIdsObjByScreen = usePressableElementsStore((state) => state.pressedClassIdsObjByScreen);
  const pressedClassIdsObj = pressedClassIdsObjByScreen[screenNameForEditModal];
  const updateSetsList = useSetsStore((state) => state.updateSetsList);

  useEffect(() => {
    const screenName = screenNameFromPath(pathname);
    if (screenName != null) setScreenNameForEditModal(screenName);
  }, [pathname]);

  useEffect(() => {
    if (!isSetsListUpdated) {
      updateSetsList(pressedClassIdsObj, screenNameForEditModal);
      setIsSetsListUpdated(true);
    }
  }, [isSetsListUpdated]);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "red",
          headerShown: true,
          sceneStyle: {
            backgroundColor: theme.surface,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: translate("FindSetTabTitle"),
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" size={24} color={color} />,
            header: () => <CustomHeader icon={"magnify"}>{"FindSetTitle"}</CustomHeader>,
          }}
        />
        <Tabs.Screen
          name="DisplaySetScreen"
          options={{
            title: translate("DisplaySetTabTitle"),
            tabBarIcon: ({ color }) => <MaterialIcons name="display-settings" size={24} color={color} />,
            header: () => <CustomHeader>{"DisplaySetTitle"}</CustomHeader>,
          }}
        />
        <Tabs.Screen
          name="SavedSetScreen"
          options={{
            title: translate("SavedSetTabTitle"),
            tabBarIcon: ({ color }) => <MaterialIcons name="save" size={24} color={color} />,
            header: () => <CustomHeader icon={"save"}>{"SavedSetTitle"}</CustomHeader>,
          }}
        />
        <Tabs.Screen
          name="GalleryScreen"
          options={{
            title: translate("GalleryTabTitle"),
            tabBarIcon: ({ color }) => <Ionicons name="image-outline" size={24} color={color} />,
            header: () => <CustomHeader icon={"image-outline"}>{"GalleryTitle"}</CustomHeader>,
          }}
        />
        <Tabs.Screen
          name="SettingsScreen"
          options={{
            title: translate("SettingsTabTitle"),
            tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
            header: () => <CustomHeader icon={"settings"}>{"SettingsTitle"}</CustomHeader>,
          }}
        />
      </Tabs>
      <EditSetModal />
      <Toast />
    </>
  );
}

export default function TabLayout() {
  return (
    <PaperProvider>
      <CustomThemeProvider>
        <OrderNumberProvider>
          <SettingsProvider>
            <InnerTabLayout />
          </SettingsProvider>
        </OrderNumberProvider>
      </CustomThemeProvider>
    </PaperProvider>
  );
}
