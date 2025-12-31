import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useThemeStore } from "../_store/useThemeStore";
import { useGetAllCours } from "../service/course/queries";

type Cours = {
  id: number;
  title: string;
  photo_url: string;
};

export default function Menu() {
  const { data, isLoading, isError, error } = useGetAllCours();
  const router = useRouter();
  const colors = useThemeStore((state) => state.colors);
  const colorBttn = useThemeStore((state) => state.colorBttn);

  const selectedColorIndex = useThemeStore((state) => state.selectedColorIndex);
  const selectedBtnColorIndex = useThemeStore(
    (state) => state.selectedBtnColorIndex
  );

  const setSelectedColorIndex = useThemeStore(
    (state) => state.setSelectedColorIndex
  );
  const setSelectedBtnColorIndex = useThemeStore(
    (state) => state.setSelectedBtnColorIndex
  );

  const [showColor, setShowColor] = useState(false);

  const renderItem = ({ item }: { item: Cours }) => (
    <TouchableOpacity
      style={[
        styles.cardBttn,
        { backgroundColor: colorBttn[selectedBtnColorIndex] },
      ]}
      onPressIn={() => router.push(`./cours/${item.id}`)}
      // onPress={() => router.push("/myscreen")}
    >
      <Image source={{ uri: item.photo_url }} style={styles.iconbutton} />
      <Text style={styles.textListBttn}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3533c3ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[selectedColorIndex] },
      ]}
    >
      {/* HEADER */}
      <View style={styles.barApp}>
        <Text style={styles.nameApp}>AZ French</Text>

        <TouchableOpacity onPress={() => setShowColor(!showColor)}>
          <Image
            source={require("../assets/images/color.jpg")}
            style={styles.bttnColor}
          />
        </TouchableOpacity>
      </View>

      {/* COLOR MENU */}
      {showColor && (
        <View style={styles.colorMenu}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorBox, { backgroundColor: color }]}
              onPress={() => {
                setSelectedColorIndex(index);
                setSelectedBtnColorIndex(index);
                setShowColor(false);
              }}
            />
          ))}
        </View>
      )}

      {/* LISTE 2 COLONNES */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  barApp: {
    flexDirection: "row",
    marginTop: 80,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameApp: {
    fontSize: 30,
    fontWeight: "bold",
  },

  bttnColor: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },

  colorMenu: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 15,
  },

  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  cardBttn: {
    width: "48%",
    height: 140,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff6b6b",
    marginBottom: 16,
  },

  iconbutton: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },

  textListBttn: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
