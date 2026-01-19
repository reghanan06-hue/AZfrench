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
import { useDeleteCours } from "../service/course/mutations";

type Cours = {
  id: string;
  title: string;
  description: string;
  photo_url?: string;
  date_creation?: string;
};

export default function DashboardCoursScreen() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  const { data: courses, isLoading, isError, refetch } = useGetAllCours();
  const deleteMutation = useDeleteCours();

  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem("role");
      setRole(storedRole || "");
    };
    getRole();
  }, []);

  const handleEdit = (courseId: string) => {
    router.push(`/AddCourseScreen?courseId=${courseId}`);
  };

  const handleDelete = (courseId: string, courseTitle: string) => {
    Alert.alert(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer "${courseTitle}" ?`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMutation.mutateAsync(courseId);
              Alert.alert("Succès", "Cours supprimé avec succès");
            } catch (error: any) {
              Alert.alert(
                "Erreur",
                error?.message || "Impossible de supprimer le cours"
              );
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1fd492" />
        <Text style={styles.loaderText}>Chargement des cours...</Text>
      </View>
    );
  }

  if (isError || !courses) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>Erreur lors du chargement des cours</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Cours }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {item.photo_url && (
          <Image source={{ uri: item.photo_url }} style={styles.icon} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          {item.date_creation && (
            <Text style={styles.date}>📅 {item.date_creation}</Text>
          )}
        </View>
      </View>

      {role === "admin" && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.buttonIcon}>✏️</Text>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id, item.title)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonIcon}>🗑️</Text>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>📚 Liste des cours</Text>
        <Text style={styles.subtitle}>
          {courses.length} cours disponible{courses.length > 1 ? "s" : ""}
        </Text>
      </View>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun cours trouvé</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {role === "admin" && (
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/AddCourseScreen")}
          >
            <Text style={styles.addButtonText}>➕ Ajouter un cours</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#6EC6F3",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: "#f0f0f0",
  },
  textContainer: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 10,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6EC6F3",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  buttonIcon: {
    fontSize: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#f5f7fa",
  },
  addButton: {
    backgroundColor: "#1fd492",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#1fd492",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
