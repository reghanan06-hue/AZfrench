import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { useGetAllCours } from "../service/course/queries";
import { instance } from "../service/instance";

export default function CourseListScreen() {
  const router = useRouter();
  const {
    data: courses,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllCours();

  const handleDelete = async (id: number) => {
    Alert.alert("Confirmer", "Voulez-vous vraiment supprimer ce cours ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");
            if (!token)
              return Alert.alert("Erreur", "Utilisateur non authentifié");

            await instance.delete(`/cours/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert("Succès", "Cours supprimé avec succès");
            refetch(); // recharge la liste
          } catch (error: any) {
            Alert.alert(
              "Erreur",
              error.response?.data?.message ||
                "Impossible de supprimer le cours",
            );
          }
        },
      },
    ]);
  };

  const handleUpdate = (id: number) => {
    router.push(`/AddCourseScreen?id=${id}`);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.descreption}</Text>
        <Text style={styles.date}>Créé le : {item.date_creation}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => handleUpdate(item.id)}
          style={styles.iconButton}
        >
          <FontAwesome name="edit" size={24} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.iconButton}
        >
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1A73E8" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "red" }}>
          {(error as Error)?.message || "Erreur lors du chargement"}
        </Text>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.TitleDashboard}>Tableau de bord</Text>

      <FlatList
        data={courses}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun cours disponible.</Text>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f6fc",
  },
  TitleDashboard: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: 50,
    fontFamily: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#cd73f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#555",
    fontSize: 16,
  },
});
