import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MainTabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "Leçon",

            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name={"home"} size={size} color={color} />
            ),
            tabBarLabel: "Leçon", // label correct
            tabBarActiveTintColor: "#478ef9ff", //  onglet actif
            tabBarInactiveTintColor: "#a6e2edff", //  onglets inactifs
            // headerShown: false,
            tabBarStyle: {
              backgroundColor: "#a5b7f2", // couleur de fond de la Tab Bar
              height: 60, // optionnel, hauteur de la Tab Bar
            },
          }}
        />
        <Tabs.Screen
          name="exerciseReading"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="book" size={size} color={color} />
            ),
            tabBarLabel: "Lecture", // label correct
            tabBarActiveTintColor: "#478ef9ff", // rouge onglet actif
            tabBarInactiveTintColor: "#a6e2edff", // gris onglets inactifs
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#f0f0f0", // couleur de fond de la Tab Bar
              height: 60, // optionnel, hauteur de la Tab Bar
            },
          }}
        />

        <Tabs.Screen
          name="exerciseWriting"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="pen" size={size} color={color} />
            ),
            tabBarLabel: "Ecriture", // label correct
            tabBarActiveTintColor: "rgb(3, 31, 72)", // rouge onglet actif
            tabBarInactiveTintColor: "#a6e2edff", // gris onglets inactifs
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#f0f0f0", // couleur de fond de la Tab Bar
              height: 60, // optionnel, hauteur de la Tab Bar
            },
          }}
        />
      </Tabs>

      <StatusBar style="auto" backgroundColor="red" />
    </SafeAreaProvider>
  );
}
