import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native";

import ColorBall from "./ColorBall";

import { useThemeStore } from "../../_store/useThemeStore";

export default function Animal({ data }: any) {
  const colorMap = useThemeStore((s) => s.colorMap);
  const colors = useThemeStore((s) => s.colors);
  const colorBttn = useThemeStore((s) => s.colorBttn);
  const selectedColorIndex = useThemeStore((s) => s.selectedColorIndex);
  const selectedBtnColorIndex = useThemeStore((s) => s.selectedBtnColorIndex);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");

  const { height } = Dimensions.get("window");

  const slideAnim = useRef(new Animated.Value(-height / 2)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
    setLastText(text);
    Speech.stop();
    Speech.speak(text, { language: "fr-FR" });
  };

  const renderItem = ({ item }: any) => {
    const colorFromName = colorMap[item.name_lesson] || "#cccccc";

    return (
      <TouchableOpacity
        // style={[styles.card, { backgroundColor: colorFromName }]}
        style={[
          styles.card,
          { backgroundColor: colorBttn[selectedBtnColorIndex] },
        ]}
        onPress={() => {
          setSelectedName(item.name_lesson);
          setSelectedColor(colorFromName);
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
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[selectedColorIndex] },
      ]}
    >
      <Text style={styles.title}>{data.title}</Text>
      <FlatList
        data={data?.Lessons}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <ColorBall name={selectedName} mycolor={selectedColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#191818",
    textAlign: "center",
    marginTop: 60,
  },

  card: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
});
