
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
  const [selectedLesson, setSelectedLesson] = useState<any>(null); // lesson clické

  const { height } = Dimensions.get("window");

  const slideAnim = useRef(new Animated.Value(-height / 2)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Slide + fade animation
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

    //  animation!!!!!loopp
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
    Speech.stop();
    Speech.speak(text, { language: "fr-FR" });
  };

  const renderItem = ({ item }: any) => {
    const colorFromName = colorMap[item.name_lesson] || "#cccccc";

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: colorBttn[selectedBtnColorIndex] },
        ]}
        onPress={() => {
          setSelectedLesson(item);
          speak(item.name_lesson);

          if (data.title === "Les couleurs") {
            setSelectedName(item.name_lesson);
            setSelectedColor(colorFromName);
          }
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
      <Text style={styles.titlename}>{data.title}</Text>

      <FlatList
        data={data?.Lessons}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Display ColorBall si data.title === "Les couleurs" */}
      {data.title === "Les couleurs" ? (
        <ColorBall name={selectedName} mycolor={selectedColor} />
      ) : (
        // Sinon afficher image du lesson sélectionné
        selectedLesson &&
        selectedLesson.photo_url && (
          <View style={styles.previewCard}>
            <Image
              source={{ uri: selectedLesson.photo_url }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <Text style={styles.previewText}>{selectedLesson.name_lesson}</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titlename: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#141313",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#191818",
    textAlign: "center",
  },
  card: {
    flex: 1,
    margin: 4,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  previewCard: {
    height: 200,
    borderRadius: 20,
    marginBottom: 100,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 3,
    // borderColor: "#000",
  },
  previewImage: {
    width: 250,
    height: 250,
  },
  previewText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#191818",
  },
});
