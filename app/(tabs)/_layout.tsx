import { useState } from "react";

import { Tabs } from "expo-router";
import { Text, View, StyleSheet, Pressable, Modal } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import th, { useTheme, ThemeProvider, vw } from "../../components/styles/theme";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function TabLayout() {
  let th = useTheme();
  const colorScheme = useColorScheme();

  const [menuModalVisible, setMenuModalVisible] = useState(false);


  return (
    <ThemeProvider>
      <LanguageProvider>
        <View
          key="coucou"
          id="Title_bar"
          style={[
            styles.text,
            {
              width: vw,
              height: 64,
              // backgroundColor: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: th,
              // backgroundColor: th.surface_container_highest,
              // marginTop: 24,
            },
          ]}
        >
          <Text style={{ margin: 16 }}>
            <MaterialIcons
              name="home"
              size={24}
            // color={th.on_surface}
            ></MaterialIcons>
          </Text>

          <Text style={{
            fontSize: 22,
            // color: th.on_surface
          }}>Coucou</Text>

          <Pressable
            style={styles.button_icon}
            onPress={() => setMenuModalVisible(true)}
          >
            <MaterialIcons
              name="more-vert"
              size={24}
              // color={th.on_surface}
            ></MaterialIcons>
          </Pressable>
          <Modal
            animationType="none" // Utilise slide, fade, none pour les animations
            transparent={true} // Définit si le fond est transparent
            visible={menuModalVisible}
            onRequestClose={() => setMenuModalVisible(false)} // Fonction pour fermer le modal
          >
            <Text
              style={{
                position: "absolute",
                right: 50,
                top: 50,
                backgroundColor: "red",
              }}
            >
              Coucou
            </Text>
          </Modal>
        </View>

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
                  name={focused ? "search" : "search-outline"}
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
                  name={focused ? "eye" : "eye-outline"}
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
                  name={focused ? "settings" : "settings-outline"}
                  color={color}
                />
              ), //isDefaultSelectedImages
            }}
          />
        </Tabs>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    height: 30,
    width: 30,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
  },

  checkbox: {
    width: 30,
    height: 30,
  },

  checkBoxItemLabel: {
    fontSize: 18,
    marginVertical: 10,
  },

  checkBoxesContainer: {
    marginBottom: 20,
    maxHeight: 300,
    overflow: "scroll",
    alignItems: "flex-start",
    // backgroundColor: "none",
    borderTopColor: "#000",
    borderTopWidth: 1,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },

  statSlidersContainer: {
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    // backgroundColor: th.surface_container_high,
    marginBottom: 8,
    maxWidth: 0.95 * vw,
    minWidth: 0.8 * vw,
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
  },

  modalBackground: {
    cursor: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },

  pressable: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  pressableText: {
    color: "white",
    fontSize: 16,
  },

  pressablesContainer: {
    // width: screenWidth * 0.87 + 20,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  SearchPressable: {
    fontSize: 20,
  },
  ElementsDeselector: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "red",
  },

  button_icon: {
    margin: 16,
  },
});
