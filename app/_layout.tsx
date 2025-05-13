import React from "react";
import { Tabs } from "expo-router";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Toast from "react-native-toast-message";
import { SetsListProvider } from "@/contexts/SetsListContext";
import { OrderNumberProvider } from "@/contexts/OrderNumberContext";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "@/components/CustomHeader";
import { CustomThemeProvider } from "@/contexts/ThemeContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

export default function TabLayout() {
  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <SettingsProvider>
          <OrderNumberProvider>
            <SetsListProvider>
              <Tabs
                screenOptions={{
                  tabBarActiveTintColor: "red",
                  headerShown: true,
                }}
              >
                <Tabs.Screen
                  name="index"
                  options={{
                    title: "Trouver un set",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" size={24} color={color} />,
                    header: () => <CustomHeader title="🏁 header de search set screen" />,
                  }}
                />
                <Tabs.Screen
                  name="DisplaySetScreen"
                  options={{
                    title: "Afficher un set",
                    tabBarIcon: ({ color }) => <MaterialIcons name="display-settings" size={24} color={color} />,
                    header: () => <CustomHeader title="🏁 ici c'est display set screen" />,
                  }}
                />
                <Tabs.Screen
                  name="SavedSetScreen"
                  options={{
                    title: "Saved Set",
                    tabBarIcon: ({ color }) => <MaterialIcons name="save" size={24} color={color} />,
                    header: () => <CustomHeader title="🏁 saved set screen" />,
                  }}
                />
                <Tabs.Screen
                  name="GalleryScreen"
                  options={{
                    title: "Galerie",
                    tabBarIcon: ({ color }) => <Ionicons name="image-outline" size={24} color={color} />,
                    header: () => <CustomHeader title="la galerie" />,
                  }}
                />
                <Tabs.Screen
                  name="SettingsScreen"
                  options={{
                    title: "les reglages",
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                    header: () => <CustomHeader title="c'est pour les reglages" />,
                  }}
                />
              </Tabs>
              <Toast />
            </SetsListProvider>
          </OrderNumberProvider>
        </SettingsProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}
