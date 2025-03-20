import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "../../utils/ThemeContext"
import Toast from "react-native-toast-message";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="SearchSetScreen"
            options={{
              title: "Trouver un set",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="DisplaySetScreen"
            options={{
              title: "Afficher un set",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="SettingsScreen"
            options={{
              title: "SettingsScreen",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                />
              ), //isDefaultSelectedImages
            }}
          />
        </Tabs>
        <Toast/>
      </LanguageProvider>
    </ThemeProvider>
  );
}
