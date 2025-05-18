import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Toast from "react-native-toast-message";
import { OrderNumberProvider } from "@/contexts/OrderNumberContext";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";
import { CustomThemeProvider } from "@/contexts/ThemeContext";
import { useColorScheme } from "react-native";
import { dark_theme, light_theme } from "@/components/styles/theme";
import { StatsVisibleListConfigProvider } from "@/contexts/StatsVisibleListConfigContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import EditSetModal from "@/components/modal/EditSetModal";
import { usePathname } from "expo-router";
import useModalsStore from "@/stores/useModalsStore";

const screenNameFromPath = (pathname: string): string | null => {
  if (pathname === "/") return "search";
  if (pathname.includes("isplay")) return "display";
  if (pathname.includes("ave")) return "save";
  if (pathname.includes("allery")) return "gallery";
  return null;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const setScreenNameForEditModal = useModalsStore((state) => state.setScreenNameForEditModal);

  useEffect(() => {
    const screenName = screenNameFromPath(pathname);
    if (screenName != null) setScreenNameForEditModal(screenName);
  }, [pathname]);

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <StatsVisibleListConfigProvider>
          <OrderNumberProvider>
            <SettingsProvider>
              <Tabs
                screenOptions={{
                  tabBarActiveTintColor: "red",
                  headerShown: true,
                  sceneStyle: {
                    backgroundColor: colorScheme === "light" ? light_theme.surface : dark_theme.surface,
                  },
                }}
              >
                <Tabs.Screen
                  name="index"
                  options={{
                    title: "Trouver un set",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" size={24} color={color} />,
                    header: () => <CustomHeader>Search Set screen</CustomHeader>,
                  }}
                />
                <Tabs.Screen
                  name="DisplaySetScreen"
                  options={{
                    title: "Afficher un set",
                    tabBarIcon: ({ color }) => <MaterialIcons name="display-settings" size={24} color={color} />,
                    header: () => <CustomHeader>Display Set screen</CustomHeader>,
                  }}
                />
                <Tabs.Screen
                  name="SavedSetScreen"
                  options={{
                    title: "Saved Set",
                    tabBarIcon: ({ color }) => <MaterialIcons name="save" size={24} color={color} />,
                    header: () => <CustomHeader icon={"save"}>Saved Set screen</CustomHeader>,
                  }}
                />
                <Tabs.Screen
                  name="GalleryScreen"
                  options={{
                    title: "Galerie",
                    tabBarIcon: ({ color }) => <Ionicons name="image-outline" size={24} color={color} />,
                    header: () => <CustomHeader icon={"image-outline"}>Gallery screen</CustomHeader>,
                  }}
                />
                <Tabs.Screen
                  name="SettingsScreen"
                  options={{
                    title: "les reglages",
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                    header: () => <CustomHeader>Settings screen</CustomHeader>,
                  }}
                />
              </Tabs>
              <EditSetModal />
              <Toast />
            </SettingsProvider>
          </OrderNumberProvider>
        </StatsVisibleListConfigProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}
