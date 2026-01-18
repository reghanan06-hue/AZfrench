// import * as Speech from "expo-speech";
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Alert,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { useGetCoursById } from "@/service/course/queries";
// import { useThemeStore } from "../../_store/useThemeStore";
// import { instance } from "../../service/instance.js";

// export default function ExerciseLectureScreen() {
//   const colors = useThemeStore((s) => s.colors);
//   const selectedColorIndex = useThemeStore((s) => s.selectedColorIndex);

//   const [textWriting, setTextWriting] = useState("");
//   const [correct, setCorrect] = useState(0);
//   const [wrong, setWrong] = useState(0);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isFinished, setIsFinished] = useState(false);

//   const { id } = useLocalSearchParams<{ id?: string }>();
//   const coursId = Number(id);

//   const { data, isLoading } = useGetCoursById(coursId);

//   /* ---------------- SPEECH ---------------- */
//   const speak = (text: string) => {
//     Speech.stop();
//     Speech.speak(`Cliquez sur la lettre ${text}`, {
//       language: "fr-FR",
//       rate: 0.9,
//     });
//   };

//   /* 🔊 useEffect TOUJOURS AVANT return */
//   useEffect(() => {
//     if (!data?.Lessons?.length) return;
//     if (isFinished) return;

//     const lesson = data.Lessons[currentIndex];
//     if (lesson?.name_lesson) {
//       speak(lesson.name_lesson);
//     }
//   }, [currentIndex, isFinished, data]);

//   /* ---------------- LOADING ---------------- */
//   if (isLoading || !data?.Lessons?.length) {
//     return (
//       <Text style={{ marginTop: 20, textAlign: "center" }}>Chargement...</Text>
//     );
//   }

//   const lessons = data.Lessons;
//   const currentLesson = lessons[currentIndex];

//   /* ---------------- NIVEAU ---------------- */
//   const getExerciseLevel = () => {
//     if (correct > wrong) return "niveau1";
//     if (correct === wrong) return "niveau2";
//     return "niveau3";
//   };

//   /* ---------------- RETRY ---------------- */
//   const handleRetry = () => {
//     Speech.stop();
//     setTextWriting("");
//     setCorrect(0);
//     setWrong(0);
//     setIsCorrect(null);
//     setCurrentIndex(0);
//     setIsFinished(false);
//   };

//   /* ---------------- CHECK ---------------- */
//   const handleCheck = (value: string) => {
//     if (isFinished) return;

//     const input = value.trim().toUpperCase();
//     setTextWriting(value);

//     if (!input) return;

//     if (input === currentLesson.name_lesson.toUpperCase()) {
//       setCorrect((c) => c + 1);
//       setIsCorrect(true);

//       setTimeout(() => {
//         setTextWriting("");
//         setIsCorrect(null);

//         if (currentIndex + 1 < lessons.length) {
//           setCurrentIndex((i) => i + 1);
//         } else {
//           Speech.stop();
//           setIsFinished(true);
//         }
//       }, 700);
//     } else {
//       setWrong((w) => w + 1);
//       setIsCorrect(false);
//     }
//   };

//   /* ---------------- SAVE ---------------- */
//   const handleSaveExercise = async () => {
//     if (!isFinished) return;

//     try {
//       const niveau = getExerciseLevel();

//       await instance.post("/exercise", {
//         lecon_id: coursId,
//         niveau,
//         type: "écoute",
//       });

//       Alert.alert("Succès", `Exercice enregistré (${niveau}) ✅`);
//     } catch (error) {
//       Alert.alert("Erreur", "Erreur lors de l’enregistrement ❌");
//     }
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: colors[selectedColorIndex] },
//       ]}
//     >
//       <Text style={styles.title}>Exercice ecoute</Text>

//       {!isFinished ? (
//         <Text style={styles.subtitle}>
//           Cliquez sur : {currentLesson.name_lesson}
//         </Text>
//       ) : (
//         <Text style={styles.finishText}>🎉 Exercice terminé !</Text>
//       )}

//       <FlatList
//         data={lessons}
//         horizontal
//         keyExtractor={(item) => item.id.toString()}
//         showsHorizontalScrollIndicator={false}
//         style={{ flexGrow: 0 }}
//         renderItem={({ item, index }) => {
//           const isActive = index === currentIndex;

//           return (
//             <TouchableOpacity
//               onPress={() => speak(item.name_lesson)}
//               style={[
//                 styles.letterItem,
//                 isActive && styles.activeLetterItem,
//                 isActive && isCorrect === true && styles.correctItem,
//                 isActive && isCorrect === false && styles.wrongItem,
//               ]}
//             >
//               <Text style={styles.letterMini}>{item.name_lesson}</Text>
//             </TouchableOpacity>
//           );
//         }}
//       />

//       <View style={styles.resultContainer}>
//         <Text style={{ color: "green" }}>✔ {correct}</Text>
//         <Text style={{ color: "red" }}>✖ {wrong}</Text>
//       </View>

//       <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
//         <Text style={styles.retryText}>ESSAYER À NOUVEAU</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.retryButton, !isFinished && styles.disabledButton]}
//         onPress={handleSaveExercise}
//         disabled={!isFinished}
//       >
//         <Text style={styles.retryText}>ENREGISTRER EXERCICE</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 50, alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold" },
//   subtitle: { fontSize: 16, marginVertical: 15 },
//   finishText: { fontSize: 18, color: "green", fontWeight: "bold" },
//   letterItem: {
//     width: 360,
//     height: 260,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#d0caca",
//     marginBottom: 15,
//   },
//   activeLetterItem: { backgroundColor: "#FFD700" },
//   correctItem: { backgroundColor: "green" },
//   wrongItem: { backgroundColor: "red" },
//   letterMini: { fontSize: 60, fontWeight: "bold" },
//   input: {
//     fontSize: 60,
//     borderBottomWidth: 1,
//     width: 200,
//     textAlign: "center",
//   },
//   resultContainer: { flexDirection: "row", gap: 20, marginTop: 10 },
//   retryButton: {
//     backgroundColor: "#1e90ff",
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   disabledButton: { backgroundColor: "#999" },
//   retryText: { color: "#fff", fontWeight: "bold" },
// });

import * as Speech from "expo-speech";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { id } = useLocalSearchParams<{ id?: string }>();
  const coursId = Number(id);

  const { data, isLoading } = useGetCoursById(coursId);

  /* ---------------- SPEECH ---------------- */
  const lit = (text: string) => {
    Speech.stop();
    Speech.speak(`Cliquez sur : ${text}`, {
      language: "fr-FR",
      rate: 0.9,
    });
  };

  /* ---------------- AUTO READ ---------------- */
  useEffect(() => {
    if (!data?.Lessons?.length) return;
    if (isFinished) return;

    const lesson = data.Lessons[currentIndex];
    if (lesson?.name_lesson) {
      lit(lesson.name_lesson);
    }
  }, [currentIndex, isFinished, data]);

  /* ---------------- LOADING ---------------- */
  if (isLoading || !data?.Lessons?.length) {
    return (
      <Text style={{ marginTop: 20, textAlign: "center" }}>Chargement...</Text>
    );
  }

  const lessons = data.Lessons;
  const currentLesson = lessons[currentIndex];

  /* ---------------- LEVEL ---------------- */
  const getExerciseLevel = () => {
    if (correct > wrong) return "niveau1";
    if (correct === wrong) return "niveau2";
    return "niveau3";
  };

  /* ---------------- RETRY ---------------- */
  const handleRetry = () => {
    Speech.stop();
    setCorrect(0);
    setWrong(0);
    setIsCorrect(null);
    setCurrentIndex(0);
    setIsFinished(false);
  };

  /* ---------------- CHECK ---------------- */
  const handleCheck = (value: string) => {
    if (isFinished) return;

    if (value.toUpperCase() === currentLesson.name_lesson.toUpperCase()) {
      setCorrect((c) => c + 1);
      setIsCorrect(true);

      setTimeout(() => {
        setIsCorrect(null);

        if (currentIndex + 1 < lessons.length) {
          setCurrentIndex((i) => i + 1);
        } else {
          Speech.stop();
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
        type: "écoute",
      });

      Alert.alert("Succès", `Exercice enregistré (${niveau}) ✅`);
    } catch (error) {
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
      <Text style={styles.title}>Exercice écoute</Text>

      {!isFinished ? (
        <Text style={styles.subtitle}>
          Cliquez sur : {currentLesson.name_lesson}
        </Text>
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
            <TouchableOpacity
              onPress={() => {
                lit(item.name_lesson);
                handleCheck(item.name_lesson);
              }}
              style={[
                styles.letterItem,
                isActive && styles.activeLetterItem,
                isActive && isCorrect === true && styles.correctItem,
                isActive && isCorrect === false && styles.wrongItem,
              ]}
            >
              <Text style={styles.letterMini}>{item.name_lesson}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.resultContainer}>
        <Text style={{ color: "green" }}>✔ {correct}</Text>
        <Text style={{ color: "red" }}>✖ {wrong}</Text>
      </View>

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
  container: { flex: 1, paddingTop: 50, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginVertical: 15 },
  finishText: { fontSize: 18, color: "green", fontWeight: "bold" },

  letterItem: {
    width: 360,
    height: 260,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d0caca",
    marginBottom: 15,
  },
  activeLetterItem: { backgroundColor: "#FFD700", marginLeft: 20 },
  correctItem: { backgroundColor: "green" },
  wrongItem: { backgroundColor: "red" },

  letterMini: { fontSize: 60, fontWeight: "bold" },

  resultContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },

  retryButton: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  disabledButton: { backgroundColor: "#999" },
  retryText: { color: "#fff", fontWeight: "bold" },
});
