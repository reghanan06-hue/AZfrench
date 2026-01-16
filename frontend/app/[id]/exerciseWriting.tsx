import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCoursById } from "@/service/course/queries";
import { useThemeStore } from "../../_store/useThemeStore";

export default function ExerciseLectureScreen() {
  const colors = useThemeStore((s) => s.colors);
  const selectedColorIndex = useThemeStore((s) => s.selectedColorIndex);

  const [textWriting, setTextWriting] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useLocalSearchParams<{ id?: string }>();
  const coursId = Number(id);

  const { data, isLoading } = useGetCoursById(coursId);

  if (isLoading || !data?.Lessons?.length) {
    return (
      <Text style={{ marginTop: 5, textAlign: "center" }}>Loading...</Text>
    );
  }

  const lessons = data.Lessons;
  const currentLesson = lessons[currentIndex];

  const handleRetry = () => {
    setTextWriting("");
    setIsCorrect(null);
    setCorrect(0);
    setWrong(0);
    setCurrentIndex(0);
  };

  const handleCheck = (value: string) => {
    const letter = value.trim().toUpperCase();

    if (!letter) {
      setTextWriting("");
      setIsCorrect(null);
      return;
    }

    setTextWriting(letter);

    if (letter === currentLesson.name_lesson.toUpperCase()) {
      setCorrect((c) => c + 1);
      setIsCorrect(true);

      setTimeout(() => {
        setTextWriting("");
        setIsCorrect(null);
        if (currentIndex + 1 < lessons.length) {
          setCurrentIndex((i) => i + 1);
        }
      }, 700);
    } else {
      setWrong((w) => w + 1);
      setIsCorrect(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[selectedColorIndex] },
      ]}
    >
      <Text style={styles.title}>Exercice écriture</Text>
      <Text style={styles.subtitle}>
        {currentLesson.name_lesson === "A"
          ? `Écris la lettre ${currentLesson.name_lesson}`
          : currentLesson.name_lesson === "1"
            ? `Écris le nombre ${currentLesson.name_lesson}`
            : currentLesson.name_lesson === "BA"
              ? `Écris la syllabe BA`
              : `Écris le mot ${currentLesson.name_lesson}`}
      </Text>

      {/* //Écris la syllabe BA */}

      {/* ALPHABET */}
      <FlatList
        data={lessons}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        renderItem={({ item, index }) => {
          const isActive = index === currentIndex;

          return (
            <View
              style={[
                styles.letterItem,
                isActive && styles.activeLetterItem,
                isActive && isCorrect === true && styles.correctItem,
                isActive && isCorrect === false && styles.wrongItem,
              ]}
            >
              <Text style={styles.letterMini}>{item.name_lesson}</Text>
            </View>
          );
        }}
      />
      {/* INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Écrire..."
        autoCapitalize="characters"
        // maxLength={1}
        value={textWriting}
        onChangeText={handleCheck}
      />
      {/* RESULTATS */}
      <Text style={styles.resultTitle}>Résultat de l’exercice</Text>
      <View style={styles.resultContainer}>
        <View style={styles.resultBox}>
          <Text style={styles.correctNumber}>{correct}</Text>
          <Text style={styles.correctText}>Correct</Text>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.wrongNumber}>{wrong}</Text>
          <Text style={styles.wrongText}>Faux</Text>
        </View>
      </View>
      {/* MESSAGE */}
      {isCorrect === true && (
        <>
          <Text style={styles.success}>Bravo, continue !</Text>
          <Image
            source={require("../../assets/images/success.png")}
            style={styles.emoji}
          />
        </>
      )}
      {isCorrect === false && (
        <>
          <Text style={styles.fail}>Essaie encore !</Text>
          <Image
            source={require("../../assets/images/thinking.png")}
            style={styles.emoji}
          />
        </>
      )}
      {/* BOUTONS */}
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryText}>ESSAYER À NOUVEAU</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.retryButton}>
        <Text style={styles.retryText}>Enregistrer l’Exercice </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 19,
  },
  letterMini: {
    fontSize: 60,
    fontWeight: "bold",
  },
  letterItem: {
    width: 380,
    height: 280,
    marginHorizontal: 6,
    marginBottom: 19,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#d0caca",
  },
  activeLetterItem: {
    backgroundColor: "#FFD700",
    transform: [{ scale: 1.1 }],
  },
  correctItem: {
    backgroundColor: "green",
  },
  wrongItem: {
    backgroundColor: "red",
  },
  input: {
    fontSize: 60,
    borderBottomWidth: 1,
    textAlign: "center",
    width: 200,
    marginTop: 5,
  },
  resultTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  resultContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
  },
  resultBox: {
    alignItems: "center",
  },
  correctNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
  },
  wrongNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
  },
  correctText: {
    color: "green",
  },
  wrongText: {
    color: "red",
  },
  success: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  fail: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  emoji: {
    width: 115,
    height: 115,
    marginTop: 5,
  },
  retryButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
