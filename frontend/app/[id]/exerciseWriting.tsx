import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCoursById } from "@/service/course/queries";
import { useThemeStore } from "../../_store/useThemeStore";

interface Lesson {
  id: number;
  name_lesson: string;
}

interface CourseData {
  id: number;
  title: string;
  Lessons: Lesson[];
}

export default function ExerciseLectureScreen() {
  const colors = useThemeStore((s) => s.colors);
  const colorBttn = useThemeStore((s) => s.colorBttn);
  const selectedColorIndex = useThemeStore((s) => s.selectedColorIndex);
  const selectedBtnColorIndex = useThemeStore((s) => s.selectedBtnColorIndex);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const coursId = Array.isArray(id) ? Number(id[0]) : Number(id);

  const { data, isLoading, isError, error } = useGetCoursById(coursId);

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;

  if (isError)
    return (
      <Text style={styles.error}>
        Erreur: {error?.message || "Erreur inconnue"}
      </Text>
    );

  if (!data || !data.Lessons || data.Lessons.length === 0)
    return <Text style={styles.loading}>Aucune donnée trouvée</Text>;

  const currentLesson = data.Lessons[currentIndex];

  const handlePress = (lessonName: string) => {
    if (lessonName === currentLesson.name_lesson) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
    }

    // Passer à la lettre suivante si existante
    if (currentIndex + 1 < data.Lessons.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(`Exercice terminé !\nCorrect: ${correct + 1}\nFaux: ${wrong}`);
    }
  };

  // const renderItem = ({ item }: { item: Lesson }) => (
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colorBttn[selectedBtnColorIndex] },
      ]}
      onPress={() => handlePress(item.name_lesson)}
    >
      <Text style={styles.text}>{item.name_lesson}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[selectedColorIndex] },
      ]}
    >
      <Text style={styles.title}>Exercice de lecture</Text>

      <Text style={styles.question}>
        Cliquez sur la lettre qui a le son "{currentLesson.name_lesson}"
      </Text>

      <FlatList
        data={data.Lessons}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        contentContainerStyle={styles.flatListContainer}
      />

      <Text style={styles.resultTitle}>Résultat de l’exercice effectué</Text>

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

      <Text style={styles.message}>Bravo, continue !</Text>
      <Text style={styles.trophy}>🏆</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
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
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  flatListContainer: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  // card: {
  //   width: "30%",
  //   flex: 1,
  //   margin: 4,
  //   borderRadius: 16,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: 100,
  //   backgroundColor: "#c92626",
  // },
  card: {
    flex: 1,
    margin: 4,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  resultTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 80,
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
  message: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
  },
  trophy: {
    fontSize: 50,
    marginBottom: 80,
  },
  text: {
    fontSize: 90,
    fontWeight: "bold",
    color: "#a52525",
  },
});
