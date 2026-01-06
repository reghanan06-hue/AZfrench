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

export default function AlphabetDesign({ data }: any) {
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
    if (!soundEnabled) return;
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
        style={[styles.textAlph, { transform: [{ scale: scaleAnim }] }]}
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
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={styles.nameScree}>{data.title}</Text>

        <FlatList
          data={data.Lessons}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        <View style={styles.barBtnTools}>
          <TouchableOpacity
            style={[
              styles.btnSon,
              { backgroundColor: colorBttn[selectedBtnColorIndex] },
            ]}
            onPress={() => setSoundEnabled(!soundEnabled)}
          >
            <Image
              source={
                soundEnabled
                  ? require("../../../assets/images/sound.png")
                  : require("../../../assets/images/no-sound.png")
              }
              style={styles.iconbutton}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnSon,
              { backgroundColor: colorBttn[selectedBtnColorIndex] },
            ]}
            onPress={repeatSound}
          >
            <Image
              source={require("../../../assets/images/repeat.png")}
              style={styles.iconbutton}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 50 },
  nameScree: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },
  textAlph: {
    fontSize: 190,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  card: {
    width: 350,
    height: 320,
    marginHorizontal: 10,
    marginVertical: 40,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  barBtnTools: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 350,
  },
  btnSon: {
    padding: 12,
    borderRadius: 15,
  },
  iconbutton: {
    width: 40,
    height: 40,
  },
});
