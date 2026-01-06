// import { useRouter } from "expo-router";
// import React, { useRef, useState } from "react";
// import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
// import { useThemeStore } from "../_store/useThemeStore";

// export default function Animal() {
//   const colors = useThemeStore(state => state.colors);
//   const colorBttn = useThemeStore(state => state.colorBttn);

//   const selectedColorIndex = useThemeStore(state => state.selectedColorIndex);
//   const selectedBtnColorIndex = useThemeStore(state => state.selectedBtnColorIndex);

//   const setSelectedColorIndex = useThemeStore(state => state.setSelectedColorIndex);
//   const setSelectedBtnColorIndex = useThemeStore(state => state.setSelectedBtnColorIndex);

//   //animation
//   const router = useRouter();
//   const [loading, SetLoading] = useState();
// const SCREEN_WIDTH: number = Dimensions.get("window").width;
//   const CARD_WIDTH: number = SCREEN_WIDTH / 5 - 10;

//   const { height } = Dimensions.get("window");

//   const slideAnim = useRef(new Animated.Value(-height / 2)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//     const animalItems = [
//     { id: 1, nameAnimal: "Lion" },
//     { id: 2, nameAnimal: "Girafe" },
//     { id: 3, nameAnimal: "Zèbre" },
//     { id: 4, nameAnimal: "Tigre" },
//     { id: 5, nameAnimal: "Ours" },
//     { id: 6, nameAnimal: "Panda" },
//    { id: 6, nameAnimal: "Panda" },
//   ];

//   return (
//     <View style={[styles.container, { backgroundColor: colors[selectedColorIndex] }]}>
//       <Text>animal</Text>

//       <FlatList
//       data={animalItems}
//       numColumns={5}
//       keyExtractor={(item) => item.id.toString()}
//       columnWrapperStyle={{ justifyContent: "space-between" }}
//       renderItem={({ item }) => (
//         <View style={styles.card}>
//           <Text>{item.nameAnimal}</Text>
//         </View>
//       )}
//     />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 60,
//   },
//   card: {
//   width:"20%",
//     height: 100,
//     marginHorizontal: 5,
//     backgroundColor: "#4e8cff",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 12,
//   },
// });

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const animals = [
  { id: "1", name: "Chien", emoji: "🐶" },
  { id: "2", name: "Chat", emoji: "🐱" },
  { id: "3", name: "Vache", emoji: "🐮" },
  { id: "4", name: "Cheval", emoji: "🐴" },
  { id: "5", name: "Cochon", emoji: "🐷" },
  { id: "6", name: "Mouton", emoji: "🐑" },
  { id: "7", name: "Poule", emoji: "🐔" },
  { id: "8", name: "Canard", emoji: "🦆" },
  { id: "9", name: "Lion", emoji: "🦁" },
  { id: "10", name: "Éléphant", emoji: "🐘" },
  { id: "11", name: "Singe", emoji: "🐵" },
  { id: "12", name: "Grenouille", emoji: "🐸" },
];

export default function animal() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🐶 Les Animaux</Text>
        <Text style={styles.subtitle}>Découvre les animaux!</Text>
      </View>

      {/* Grid */}
      <FlatList
        data={animals}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="book-outline" label="ABC" />
        <NavItem icon="calculator-outline" label="123" />
        <NavItem icon="color-palette-outline" label="Couleurs" />
        <NavItem icon="paw" label="Animaux" active />
      </View>
    </View>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <View style={[styles.navItem, active && styles.activeNav]}>
      <Ionicons name={icon} size={22} color={active ? "#7c3aed" : "#555"} />
      <Text style={[styles.navText, active && styles.activeText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f59e0b",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  grid: {
    paddingHorizontal: 12,
  },

  card: {
    flex: 1,
    backgroundColor: "#fbbf24",
    margin: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },

  emoji: {
    fontSize: 34,
  },

  name: {
    marginTop: 6,
    color: "#fff",
    fontWeight: "600",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },

  activeNav: {
    backgroundColor: "#ede9fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  activeText: {
    color: "#7c3aed",
    fontWeight: "600",
  },
});
