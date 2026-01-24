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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../service/instance";

export default function AddCourseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const coursId = id ? Number(id) : null;
  const isEditMode = !!coursId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [dateCours, setDateCours] = useState("");
  const [loading, setLoading] = useState(false);

  //Liste cours charger
  useEffect(() => {
    if (!isEditMode || !coursId) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          return Alert.alert("Erreur", "Utilisateur non authentifié");
        }

        const res = await instance.get(`/cours/${coursId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const course = res.data;

        setTitle(course.title || "");
        setDescription(course.description || "");
        setDateCours(course.date_creation || "");
        setPhotoUrl(course.photo_url || "");
      } catch (error) {
        Alert.alert("Erreur", "Impossible de charger le cours");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [coursId]);

  const handleAddCourse = async () => {
    if (!title || !description || !dateCours) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return Alert.alert("Erreur", "Utilisateur non authentifié");
      }

      const body = {
        title,
        description,
        date_creation: dateCours,
        photo_url: photoUrl,
      };

      await instance.post("/cours", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Succès", "Cours ajouté avec succès", [
        { text: "OK", onPress: () => router.replace("/dashboard") },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Impossible d'ajouter le cours",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    if (!coursId) {
      return Alert.alert("Erreur", "ID du cours invalide");
    }

    if (!title || !description || !dateCours) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return Alert.alert("Erreur", "Utilisateur non authentifié");
      }

      const body = {
        title,
        description,
        date_creation: dateCours,
        photo_url: photoUrl,
      };

      await instance.put(`/cours/${coursId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Succès", "Cours modifié avec succès", [
        { text: "OK", onPress: () => router.replace("/dashboard") },
      ]);
    } catch (error: any) {
      console.log("UPDATE ERROR:", error.response?.data);
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Impossible de modifier le cours",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/admin.png")}
        style={styles.picAdmin}
      />

      <Text style={styles.adminText}>Admin</Text>
      <Text style={styles.title}>
        {isEditMode ? "Modifier cours" : "Ajouter cours"}
      </Text>

      <TextInput
        placeholder="Titre du cours"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TextInput
        placeholder="Date création (YYYY-MM-DD)"
        value={dateCours}
        onChangeText={setDateCours}
        style={styles.input}
      />

      <TextInput
        placeholder="URL image (optionnel)"
        value={photoUrl}
        onChangeText={setPhotoUrl}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isEditMode ? handleUpdateCourse : handleAddCourse}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isEditMode ? "Confirmer modification" : "Ajouter cours"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/dashboard")}
      >
        <Text style={styles.buttonText}>Tableau de bord</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/menu")}
      >
        <Text style={styles.buttonText}>Liste cours</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f6fc",
    padding: 20,
    justifyContent: "center",
  },
  picAdmin: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  adminText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#4cd784",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4cd784",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "#4f94f4",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
