import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCoursById } from "@/service/course/queries";
import { useThemeStore } from "../../_store/useThemeStore";
import { instance } from "../../service/instance.js";

export default function ExerciseLectureScreen() {
  const colors = useThemeStore((s) => s.colors);
  const selectedColorIndex = useThemeStore((s) => s.selectedColorIndex);

  const [textWriting, setTextWriting] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { id } = useLocalSearchParams<{ id?: string }>();
  const coursId = Number(id);

  const { data, isLoading } = useGetCoursById(coursId);

  if (isLoading || !data?.Lessons?.length) {
    return (
      <Text style={{ marginTop: 20, textAlign: "center" }}>Chargement...</Text>
    );
  }

  const lessons = data.Lessons;
  const currentLesson = lessons[currentIndex];

  /* ---------------- NIVEAU ---------------- */
  const getExerciseLevel = () => {
    if (correct > wrong) return "niveau1";
    if (correct === wrong) return "niveau2";
    return "niveau3";
  };

  /* ---------------- RETRY ---------------- */
  const handleRetry = () => {
    setTextWriting("");
    setCorrect(0);
    setWrong(0);
    setIsCorrect(null);
    setCurrentIndex(0);
    setIsFinished(false);
  };

  /* ---------------- CHECK ---------------- */
  const handleCheck = (value: string) => {
    const input = value.trim().toUpperCase();

    if (!input || isFinished) {
      setTextWriting(value);
      return;
    }

    setTextWriting(input);

    if (input === currentLesson.name_lesson.toUpperCase()) {
      setCorrect((c) => c + 1);
      setIsCorrect(true);

      setTimeout(() => {
        setTextWriting("");
        setIsCorrect(null);

        if (currentIndex + 1 < lessons.length) {
          setCurrentIndex((i) => i + 1);
        } else {
          // ✅ FIN DE L’EXERCICE
          setIsFinished(true);
        }
      }, 700);
    } else {
      setWrong((w) => w + 1);
      setIsCorrect(false);
    }
  };

  /* ---------------- SAVE ---------------- */
  const handleSaveExercise = async () => {
    if (!isFinished) return;

    try {
      const niveau = getExerciseLevel();

      await instance.post("/exercise", {
        lecon_id: coursId,
        niveau,
        type: "écriture",
      });

      Alert.alert("Succès", `Exercice enregistré avec succès (${niveau}) ✅`);
      setIsFinished(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Erreur lors de l’enregistrement ❌");
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

      {!isFinished ? (
        <Text style={styles.subtitle}>Écris : {currentLesson.name_lesson}</Text>
      ) : (
        <Text style={styles.finishText}>🎉 Exercice terminé !</Text>
      )}

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

      <TextInput
        style={styles.input}
        placeholder="Écrire..."
        autoCapitalize="characters"
        value={textWriting}
        onChangeText={handleCheck}
        editable={!isFinished}
      />

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

      {isCorrect === true && (
        <>
          <Text style={styles.success}>Bravo</Text>
          <Image
            source={require("../../assets/images/success.png")}
            style={styles.emoji}
          />
        </>
      )}

      {isCorrect === false && (
        <>
          <Text style={styles.fail}>Essaie encore</Text>
          <Image
            source={require("../../assets/images/thinking.png")}
            style={styles.emoji}
          />
        </>
      )}

      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryText}>ESSAYER À NOUVEAU</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.retryButton, !isFinished && styles.disabledButton]}
        onPress={handleSaveExercise}
        disabled={!isFinished}
      >
        <Text style={styles.retryText}>ENREGISTRER EXERCICE</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

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
    marginVertical: 15,
  },
  finishText: {
    fontSize: 18,
    marginVertical: 15,
    color: "green",
    fontWeight: "bold",
  },
  letterMini: {
    fontSize: 60,
    fontWeight: "bold",
  },
  letterItem: {
    width: 360,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#d0caca",
    marginBottom: 15,
  },
  activeLetterItem: {
    backgroundColor: "#FFD700",
    transform: [{ scale: 1.05 }],
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
  },
  resultContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
    marginTop: 10,
  },
  resultBox: {
    alignItems: "center",
  },
  correctNumber: {
    fontSize: 28,
    color: "green",
  },
  wrongNumber: {
    fontSize: 28,
    color: "red",
  },
  correctText: { color: "green" },
  wrongText: { color: "red" },
  success: {
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
  },
  fail: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
  },
  emoji: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
  retryButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#999",
    opacity: 0.6,
  },
  retryText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
