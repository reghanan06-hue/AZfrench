// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import { Tabs, useLocalSearchParams } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// export default function MainTabLayout() {
//   // Get the course id from the dynamic route segment
//   const { id } = useLocalSearchParams<{ id: string }>();

//   return (
//     <SafeAreaProvider>
//       <Tabs>
//         <Tabs.Screen
//           name="index"
//           options={{
//             headerShown: true,
//             headerTitle: "Leçon",
//             href: `/${id}`,
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome5 name={"home"} size={size} color={color} />
//             ),
//             tabBarLabel: "Leçon",
//             tabBarActiveTintColor: "#478ef9ff",
//             tabBarInactiveTintColor: "#a6e2edff",
//             tabBarStyle: {
//               backgroundColor: "#a5b7f2",
//               height: 60,
//             },
//           }}
//         />
//         <Tabs.Screen
//           name="exerciseReading"
//           options={{
//             // Use href to ensure id is passed when navigating to this tab
//             href: `/${id}/exerciseReading`,
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome5 name="book" size={size} color={color} />
//             ),
//             tabBarLabel: "Lecture",
//             tabBarActiveTintColor: "#478ef9ff",
//             tabBarInactiveTintColor: "#a6e2edff",
//             headerShown: false,
//             tabBarStyle: {
//               backgroundColor: "#f0f0f0",
//               height: 60,
//             },
//           }}
//         />

//         <Tabs.Screen
//           name="exerciseWriting"
//           options={{
//             // Use href to ensure id is passed when navigating to this tab
//             href: `/${id}/exerciseWriting`,
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome5 name="pen" size={size} color={color} />
//             ),
//             tabBarLabel: "Ecriture",
//             tabBarActiveTintColor: "rgb(3, 31, 72)",
//             tabBarInactiveTintColor: "#a6e2edff",
//             headerShown: false,
//             tabBarStyle: {
//               backgroundColor: "#f0f0f0",
//               height: 60,
//             },
//           }}
//         />
//       </Tabs>

//       <StatusBar style="auto" backgroundColor="red" />
//     </SafeAreaProvider>
//   );
// }
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MainTabLayout() {
  // Get the course id from the dynamic route segment
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "Leçon",
            // Use href to ensure id is passed when navigating to this tab
            href: `/${id}`,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name={"home"} size={size} color={color} />
            ),
            tabBarLabel: "Leçon",
            tabBarActiveTintColor: "#478ef9ff",
            tabBarInactiveTintColor: "#a6e2edff",
            tabBarStyle: {
              backgroundColor: "#6dc8f5ff",
              height: 60,
            },
          }}
        />
        <Tabs.Screen
          name="exerciseReading"
          options={{
            // Use href to ensure id is passed when navigating to this tab
            href: `/${id}/exerciseReading`,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="book" size={size} color={color} />
            ),
            tabBarLabel: "Lecture",
            tabBarActiveTintColor: "#478ef9ff",
            tabBarInactiveTintColor: "#a6e2edff",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#f0f0f0",
              height: 60,
            },
          }}
        />

        <Tabs.Screen
          name="exerciseWriting"
          options={{
            // Use href to ensure id is passed when navigating to this tab
            href: `/${id}/exerciseWriting`,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="pen" size={size} color={color} />
            ),
            tabBarLabel: "Ecriture",
            tabBarActiveTintColor: "rgb(3, 31, 72)",
            tabBarInactiveTintColor: "#a6e2edff",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#f0f0f0",
              height: 60,
            },
          }}
        />
      </Tabs>

      <StatusBar style="auto" backgroundColor="red" />
    </SafeAreaProvider>
  );
}
