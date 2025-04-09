import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "../../utils/ThemeContext"
import Toast from "react-native-toast-message";
import { SetsListProvider } from "../../utils/SetsListContext";
import { SavedSetModalProvider } from "../../utils/SavedSetModalContext";
import {OrderNumberProvider} from "../../utils/OrderNumberContext"
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <LanguageProvider>
      <OrderNumberProvider>
      <SetsListProvider>
        <SavedSetModalProvider>
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
                <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={color}/>
              ),
            }}
          />
            <Tabs.Screen
              name="DisplaySetScreen"
              options={{
                title: "Afficher un set",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons
                name="display-settings"
                size={24}
                color={color}/>
                ),
              }}
            />
          <Tabs.Screen
            name="GaleryScreen"
            options={{
              title: "Galerie",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                name="image-outline"
                size={24}
                color={color}/>
              ),
            }}
          />
          <Tabs.Screen
            name="SavedSetScreen"
            options={{
              title: "Saved Set",
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
        </SavedSetModalProvider>
      </SetsListProvider>
      </OrderNumberProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
