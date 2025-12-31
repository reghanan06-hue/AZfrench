import { useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import { Easing } from "react-native";

import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useThemeStore } from "../../_store/useThemeStore";
import { useGetCoursById } from "@/service/course/queries";
export default function Alphabet() {
  const { id } = useLocalSearchParams();
  const coursId = Number(id);

  const { data, isLoading, isError, error } = useGetCoursById(coursId);
  console.log(data);
  const colors = useThemeStore((state) => state.colors);
  const colorBttn = useThemeStore((state) => state.colorBttn);
  const selectedColorIndex = useThemeStore((state) => state.selectedColorIndex);
  const selectedBtnColorIndex = useThemeStore(
    (state) => state.selectedBtnColorIndex
  );

  /* ===== ANIMATION ===== */
  // const { height } = Dimensions.get("window");
  // const slideAnim = useRef(new Animated.Value(-height / 2)).current;
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animations
  const { height } = Dimensions.get("window");

  const slideAnim = useRef(new Animated.Value(-height / 2)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnimText = useRef(new Animated.Value(height / 2)).current;
  const fadeAnimText = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current; // pour jump/morph effect
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Slide + fade logo
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

    // Slide + fade text
    Animated.parallel([
      Animated.timing(slideAnimText, {
        toValue: 0,
        duration: 2000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimText, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Jump/morph loop animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, {
      language: "fr-FR",
      rate: 0.8,
      pitch: 1,
    });
  };

  if (isLoading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  if (isError)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>
          Erreur : {error?.message || "Erreur inconnue"}
        </Text>
      </View>
    );

  if (!data || !data.Lessons || data.Lessons.length === 0)
    return (
      <View style={styles.center}>
        <Text>Aucune leçon trouvée</Text>
      </View>
    );

  /* ===== render item////////////==== */

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colorBttn[selectedBtnColorIndex] },
      ]}
      onPress={() => setCurrentLetter(item.name_lesson)}
    >
      <Text style={styles.textAlph}>{item.name_lesson}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[selectedColorIndex] },
      ]}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={styles.nameScree}>Alphabet</Text>

        <FlatList
          data={data.Lessons}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x /
                event.nativeEvent.layoutMeasurement.width
            );

            setCurrentIndex(index);
            setCurrentLetter(data.Lessons[index].name_lesson);
          }}
        />

        <View style={styles.barBtnTools}>
          <TouchableOpacity
            style={[
              styles.btnSon,
              { backgroundColor: colorBttn[selectedBtnColorIndex] },
            ]}
            onPress={() => speak("A")}
          >
            <Image
              source={require("../../assets/images/sound.png")}
              style={styles.iconbutton}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnSon,
              { backgroundColor: colorBttn[selectedBtnColorIndex] },
            ]}
            onPress={() => {
              if (currentLetter) {
                speak(currentLetter);
              }
            }}
          >
            <Image
              source={require("../../assets/images/play (1).png")}
              style={styles.iconbutton}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnSon,
              { backgroundColor: colorBttn[selectedBtnColorIndex] },
            ]}
            onPress={() => speak("A")}
          >
            <Image
              source={require("../../assets/images/repeat.png")}
              style={styles.iconbutton}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-start", // start from top
    paddingTop: 50,
  },
  nameScree: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textAlph: {
    fontSize: 190, // reduce font size
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  card: {
    width: 360, // reduce width
    height: 320,
    marginHorizontal: 10,
    marginVertical: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  barBtnTools: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 290,
    marginLeft: 20,

    // marginVertical: 20,
  },
  btnSon: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#4da6ff",
  },
  iconbutton: {
    width: 40,
    height: 40,
  },
});
