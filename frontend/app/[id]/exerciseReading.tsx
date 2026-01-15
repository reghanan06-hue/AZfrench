import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCoursById } from "@/service/course/queries";
// On garde les imports même si on utilise des styles hardcodés pour matcher l'image
import { useThemeStore } from "../../_store/useThemeStore";

interface Lesson {
  id: number;
  name_lesson: string;
}

export default function ExerciseLectureScreen() {
  // On garde les hooks du thème, mais on surchargera les couleurs pour l'exercice visuel
  const colors = useThemeStore((s) => s.colors);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useLocalSearchParams<{ id?: string | string[] }>();

  console.log(id);
  const coursId = Array.isArray(id) ? Number(id[0]) : Number(id);

  const { data, isLoading, isError, error } = useGetCoursById(coursId);

  if (isLoading) return <Text style={styles.loading}>Chargement...</Text>;
  if (isError)
    return <Text style={styles.error}>Erreur: {error?.message}</Text>;
  if (!data || !data.Lessons || data.Lessons.length === 0)
    return <Text style={styles.loading}>Aucune donnée trouvée</Text>;

  const currentLesson = data.Lessons[currentIndex];

  const handlePress = (lessonName: string) => {
    const isCorrect = lessonName === currentLesson.name_lesson;

    if (isCorrect) {
      setCorrect((prev) => prev + 1);
      Alert.alert("Bravo !", "Bonne réponse");
    } else {
      setWrong((prev) => prev + 1);
      Alert.alert("Oups", "Mauvaise réponse");
    }

    if (currentIndex + 1 < data.Lessons.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // --- RENDU D'UN BOUTON (LETTRE) ---
  const renderItem = ({ item }: { item: Lesson }) => {
    const isTarget = item.name_lesson === currentLesson.name_lesson;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: isTarget ? "#BAEBF9" : "#1dd88d" }, // Vert vs Bleu Ciel
        ]}
        onPress={() => handlePress(item.name_lesson)}
      >
        <Text style={styles.cardText}>{item.name_lesson}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Exercice de lecture</Text>

      {/* Question combinée */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Cliquez sur la lettre qui le son{" "}
          <Text style={styles.targetLetter}>{currentLesson.name_lesson}</Text>
        </Text>
      </View>

      {/* Grille de réponses */}
      <View style={styles.listContainer}>
        <FlatList
          // Modifiez cette ligne :
          data={data.Lessons.slice(0, 3)}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
        />
      </View>

      {/* Section Résultats */}
      <Text style={styles.resultTitle}>Résultat de l'exercice effectué</Text>

      <View style={styles.resultContainer}>
        <View style={styles.resultBox}>
          <Text style={styles.correctNumber}>{correct}</Text>
          <Text style={styles.correctLabel}>Correct</Text>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.wrongNumber}>{wrong}</Text>
          <Text style={styles.wrongLabel}>Faux</Text>
        </View>
      </View>

      {/* Message de fin */}
      <Text style={styles.message}>Bravo, continue !</Text>
      <Text style={styles.trophy}>🏆</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff", // Fond blanc comme sur l'image
    paddingHorizontal: 20,
  },
  loading: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000",
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  targetLetter: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  listContainer: {
    width: "100%",
    marginBottom: 40,
  },
  columnWrapper: {
    justifyContent: "space-around", // Espacement égal entre les boutons
    gap: 10,
  },
  card: {
    width: 90,
    height: 90,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    // La couleur de fond est gérée dynamiquement dans le renderItem
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 40,
    fontWeight: "900", // Très gras
    color: "#000",
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 30,
  },
  resultBox: {
    alignItems: "center",
  },
  correctNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00B32C", // Vert
  },
  correctLabel: {
    fontSize: 14,
    color: "#00B32C",
    fontWeight: "600",
  },
  wrongNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF3333", // Rouge
  },
  wrongLabel: {
    fontSize: 14,
    color: "#FF3333",
    fontWeight: "600",
  },
  message: {
    fontSize: 18,
    color: "#00B32C",
    fontWeight: "bold",
    marginBottom: 10,
  },
  trophy: {
    fontSize: 50,
  },
});
