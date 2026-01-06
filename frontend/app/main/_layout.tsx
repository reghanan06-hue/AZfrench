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
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name={"home"} size={size} color={color} />
            ),
            // tabBarActiveTintColor: COLORS.primary,

            title: "HOME",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="ExercciseRead"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name={"plus"} size={size} color={color} />
            ),
            // tabBarActiveTintColor: COLORS.primary,

            title: "Lecture",
            headerShown: false,
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
