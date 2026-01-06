import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native";
import { useThemeStore } from "../../../_store/useThemeStore";
export default function animal({ data }: any) {
  const colors = useThemeStore((s) => s.colors);
  const colorBttn = useThemeStore((s) => s.colorBttn);
  const selectedColorIndex = useThemeStore((s) => s.selectedColorIndex);
  const selectedBtnColorIndex = useThemeStore((s) => s.selectedBtnColorIndex);

  const { height } = Dimensions.get("window");

  const slideAnim = useRef(new Animated.Value(-height / 2)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastText, setLastText] = useState<string | null>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const speak = (text: string) => {
    // if (!soundEnabled) return;
    setLastText(text);
    Speech.stop();
    Speech.speak(text, { language: "fr-FR" });
  };

  const repeatSound = () => {
    if (!lastText) return;
    Speech.stop();
    Speech.speak(lastText, { language: "fr-FR" });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colorBttn[selectedBtnColorIndex] },
      ]}
      onPress={() => {
        setCurrentLetter(item.name_lesson);
        speak(item.name_lesson);
      }}
    >
      <Animated.Text
        style={[styles.title, { transform: [{ scale: scaleAnim }] }]}
      >
        {item.name_lesson}
      </Animated.Text>
    </TouchableOpacity>
  );
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[selectedColorIndex] },
      ]}
    >
      <Text style={styles.title}>{data.title}</Text>
      <FlatList
        data={data.Lessons}
        numColumns={3}
        contentContainerStyle={styles.grid}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {/* 
      Bottom Navigation
      <View style={styles.bottomNav}>
        <NavItem icon="book-outline" label="ABC" />
        <NavItem icon="calculator-outline" label="123" />
        <NavItem icon="color-palette-outline" label="Couleurs" />
        <NavItem icon="paw" label="Animaux" active />
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // marginTop: 44,
  },

  // header: {
  //   paddingTop: 50,
  //   paddingBottom: 10,
  //   alignItems: "center",
  // },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#191818ff",
    textAlign: "center",
    marginTop: 40,
  },

  subtitle: {
    fontSize: 10,
    color: "#080808ff",
    marginTop: 44,
  },

  grid: {
    paddingHorizontal: 30,
    // marginVertical: 0,
  },

  card: {
    flex: 1,
    // backgroundColor: "#fbbf24",
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
    borderTopWidth: 2,
    borderColor: "#ee3d3dff",
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
