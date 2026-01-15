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
import { useThemeStore } from "../../_store/useThemeStore";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width * 0.85;
const SPACING = 40;

export default function AlphabetDesign({ data, coursId }: any) {
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
  const router = useRouter();
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

  let isReapt = false;

  const repeatSound = () => {
    if (!lastText) return;

    isReapt = true;
    Speech.stop();

    const loop = () => {
      if (!isReapt) return;

      Speech.speak(lastText, {
        language: "fr-FR",
        onDone: loop,
      });
    };

    loop();
  };
  const stopRepeatSound = () => {
    isReapt = false;
    Speech.stop();
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
          style={{ flexGrow: 0, paddingHorizontal: SPACING / 2 }}
          snapToInterval={ITEM_SIZE + SPACING}
          scrollEventThrottle={16}
          contentContainerStyle={{ gap: SPACING }}
          decelerationRate={"fast"}
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
                  ? require("../../assets/images/sound.png")
                  : require("../../assets/images/no-sound.png")
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
              source={require("../../assets/images/repeat.png")}
              style={styles.iconbutton}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnSon,
              { backgroundColor: colorBttn[selectedBtnColorIndex] },
            ]}
            onPress={stopRepeatSound}
          >
            <Image
              source={require("../../assets/images/pauseBtn.png")}
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
    marginTop: 10,
    textAlign: "center",
  },
  textAlph: {
    fontSize: 190,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  card: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    marginVertical: 40,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  barBtnTools: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    margin: 35,
    marginBottom: 200,
  },
  btnSon: {
    padding: 12,
    borderRadius: 15,
  },
  btnStart: {
    width: "60%",
    alignSelf: "center",
    padding: 12,
    borderRadius: 15,
  },
  iconbutton: {
    width: 40,
    height: 40,
  },
});
