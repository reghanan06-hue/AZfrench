import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeStore } from "../_store/useThemeStore";
import { useGetAllCours } from "../service/course/queries";

type Cours = {
  id: number;
  title: string;
  photo_url: string;
};
export default function Menu() {
  const { data, isLoading, isError, error } = useGetAllCours();

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

  const router = useRouter();
  // display data store on console
  console.log("store state:", useThemeStore.getState());

  // state: show/hide color menu
  const [showColor, setShowColor] = useState(false);

  const ListBttn = [
    { id: 1, name: "Alphabet", icon: require("../assets/images/0.png") },
    { id: 2, name: "Numbers", icon: require("../assets/images/1.png") },
    { id: 3, name: "Words", icon: require("../assets/images/0.png") },
    { id: 4, name: "Color", icon: require("../assets/images/0.png") },
    { id: 5, name: "Animals", icon: require("../assets/images/0.png") },
    { id: 6, name: "Job", icon: require("../assets/images/0.png") },
    { id: 7, name: "Body", icon: require("../assets/images/0.png") },
    { id: 8, name: "Clothes", icon: require("../assets/images/0.png") },
    { id: 9, name: "Transports", icon: require("../assets/images/0.png") },
    { id: 10, name: "Home", icon: require("../assets/images/0.png") },
  ];

  // Grouper 2 boutons par ligne
  const rows = [];
  for (let i = 0; i < ListBttn.length; i += 2) {
    rows.push(ListBttn.slice(i, i + 2));
  }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[selectedColorIndex] },
      ]}
    >
      {/* bar app */}
      <View style={styles.barApp}>
        <Text style={styles.nameApp}>AZ French</Text>

        <TouchableOpacity onPress={() => setShowColor(!showColor)}>
          <Image
            source={require("../assets/images/color.jpg")}
            style={styles.bttnColor}
          />
        </TouchableOpacity>
      </View>

      {/* barcolor list */}
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

      {/* list of buttons */}
      <View style={styles.buttonsContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.cardBttn,
                  { backgroundColor: colorBttn[selectedBtnColorIndex] },
                ]}
                onPress={() => {
                  switch (item.name) {
                    case "Alphabet":
                      router.push("/alphabet");
                      break;
                    case "Numbers":
                      router.push("/numbers");
                      break;
                    case "Words":
                      router.push("/myscreen");
                      break;
                    default:
                      break;
                    //Animals
                    case "Animals":
                      router.push("/animal");
                      break;
                  }
                }}
              >
                <Image source={item.icon} style={styles.imageicon} />

                <Text style={styles.textListBttn}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 30,
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 5,
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  cardBttn: {
    width: "45%",
    height: 120,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  textListBttn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  iconbutton: {
    width: 80,
    height: 80,
  },
  imageicon: {
    width: 50,
    height: 50,
  },
});
