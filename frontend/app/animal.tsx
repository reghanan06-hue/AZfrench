import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "../_store/useThemeStore";


export default function Animal() {
  const colors = useThemeStore(state => state.colors);
  const colorBttn = useThemeStore(state => state.colorBttn);

  const selectedColorIndex = useThemeStore(state => state.selectedColorIndex);
  const selectedBtnColorIndex = useThemeStore(state => state.selectedBtnColorIndex);

  const setSelectedColorIndex = useThemeStore(state => state.setSelectedColorIndex);
  const setSelectedBtnColorIndex = useThemeStore(state => state.setSelectedBtnColorIndex);

  //animation
  const router = useRouter();
  const [loading, SetLoading] = useState();
const SCREEN_WIDTH: number = Dimensions.get("window").width;
  const CARD_WIDTH: number = SCREEN_WIDTH / 5 - 10;

  const { height } = Dimensions.get("window");

  const slideAnim = useRef(new Animated.Value(-height / 2)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

    const animalItems = [
    { id: 1, nameAnimal: "Lion" },
    { id: 2, nameAnimal: "Girafe" },
    { id: 3, nameAnimal: "Zèbre" },
    { id: 4, nameAnimal: "Tigre" },
    { id: 5, nameAnimal: "Ours" },
    { id: 6, nameAnimal: "Panda" },
   { id: 6, nameAnimal: "Panda" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors[selectedColorIndex] }]}>
      <Text>animal</Text>

      <FlatList
      data={animalItems}
      numColumns={5}
      keyExtractor={(item) => item.id.toString()}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>{item.nameAnimal}</Text>
        </View>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  card: {
  width:"20%",
    height: 100,
    marginHorizontal: 5,
    backgroundColor: "#4e8cff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
