import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useGetCoursById } from "../service/course/queries";
import { useCreateCours, useUpdateCours } from "../service/course/mutations";

export default function AddCourseScreen() {
  const router = useRouter();
  const { courseId } = useLocalSearchParams();

  // Determine if we're in edit mode
  const isEditMode = !!courseId;
  const numericCourseId = courseId ? Number(courseId) : null;

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo_url, setPhoto_url] = useState("");
  const [dateCours, setDateCours] = useState("");

  // Queries and mutations
  const { data: courseData, isLoading: isFetching } = useGetCoursById(numericCourseId);
  const createMutation = useCreateCours();
  const updateMutation = useUpdateCours();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditMode && courseData) {
      setTitle(courseData.title || "");
      setDescription(courseData.description || courseData.descreption || "");
      setPhoto_url(courseData.photo_url || "");
      setDateCours(courseData.date_creation || "");
    }
  }, [isEditMode, courseData]);

  const handleSubmit = async () => {
    if (!title || !description || !dateCours) {
      return Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs obligatoires"
      );
    }

    const body = {
      title,
      descreption: description,
      description,
      date_creation: dateCours,
      photo_url,
    };

    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: numericCourseId, data: body });
        Alert.alert("Succès", "Cours modifié avec succès", [
          { text: "OK", onPress: () => router.replace("/dashboard") },
        ]);
      } else {
        await createMutation.mutateAsync(body);
        Alert.alert("Succès", "Cours ajouté avec succès", [
          { text: "OK", onPress: () => router.replace("/dashboard") },
        ]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setPhoto_url("");
      setDateCours("");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Une erreur est survenue";
      Alert.alert("Erreur", message);
    }
  };

  if (isEditMode && isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1fd492" />
        <Text style={styles.loaderText}>Chargement du cours...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/admin.png")}
          style={styles.picAdmin}
        />
        <Text style={styles.adminText}>Admin</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {isEditMode ? "Modifier le cours" : "Ajouter un cours"}
      </Text>

      {/* Form Card */}
      <View style={styles.formCard}>
        <Text style={styles.label}>Titre du cours *</Text>
        <TextInput
          placeholder="Entrez le titre"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          placeholder="Décrivez le contenu du cours"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Date de création *</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          value={dateCours}
          onChangeText={setDateCours}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>URL de l'image (optionnel)</Text>
        <TextInput
          placeholder="https://example.com/image.png"
          value={photo_url}
          onChangeText={setPhoto_url}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>
            {isEditMode ? "✓ Enregistrer les modifications" : "✓ Ajouter le cours"}
          </Text>
        )}
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.replace("/dashboard")}
        >
          <Text style={styles.navButtonText}>📊 Tableau de bord</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.replace("/menu")}
        >
          <Text style={styles.navButtonText}>📚 Liste des cours</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
  },
  loaderContainer: {
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
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  picAdmin: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#1fd492",
  },
  adminText: {
    marginTop: 8,
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e0e6ed",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fafbfc",
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
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
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: "#6EC6F3",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
