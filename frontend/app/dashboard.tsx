import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetAllCours } from "../service/course/queries";

type Cours = {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  dateCours: string;
};

export default function DashboardCoursScreen() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  // ✅ Récupération du rôle
  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem("role");
      setRole(storedRole || "");
    };
    getRole();
  }, []);

  // ✅ Hook React Query pour récupérer les cours
  const { data: courses, isLoading, isError } = useGetAllCours();

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6EC6F3" />
      </View>
    );
  }

  if (isError || !courses) {
    return (
      <View style={styles.loader}>
        <Text>Erreur lors du chargement des cours</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Cours }) => (
    <View style={styles.card}>
      {item.iconUrl && (
        <Image source={{ uri: item.iconUrl }} style={styles.icon} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{item.dateCours}</Text>
      </View>
      {role === "admin" && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => Alert.alert("Modifier", "Fonction modifier ici")}
        >
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Aucun cours trouvé</Text>}
      />

      {role === "admin" && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/AddCourseScreen")}
        >
          <Text style={styles.addButtonText}>Ajouter un cours</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#51abfa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  icon: { width: 60, height: 60, marginRight: 12, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, color: "#fff" },
  date: { fontSize: 12, color: "#eee" },
  editButton: {
    backgroundColor: "#76C9F0",
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  addButton: {
    backgroundColor: "#6EC6F3",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});
