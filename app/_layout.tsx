import React from "react";
import { Tabs } from "expo-router";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Toast from "react-native-toast-message";
import { SetsListProvider } from "@/contexts/SetsListContext";
import { OrderNumberProvider } from "@/contexts/OrderNumberContext";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";
import { CustomThemeProvider } from "@/contexts/ThemeContext";
import { useColorScheme } from "react-native";
import { dark_theme, light_theme } from "@/components/styles/theme";
import { StatsVisibleListConfigProvider } from "@/contexts/StatsVisibleListConfigContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <StatsVisibleListConfigProvider>
          <OrderNumberProvider>
            <SettingsProvider>
              <SetsListProvider>
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
                      header: () => <CustomHeader icon={"image-outline"}>Galery screen</CustomHeader>,
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
                <Toast />
              </SetsListProvider>
            </SettingsProvider>
          </OrderNumberProvider>
        </StatsVisibleListConfigProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}
