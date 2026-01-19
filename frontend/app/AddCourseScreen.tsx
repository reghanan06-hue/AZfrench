import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../service/instance";

export default function AddCourseScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo_url, setPhoto_url] = useState("");
  const [dateCours, setDateCours] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async () => {
    if (!title || !description || !dateCours) {
      return Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs obligatoires",
      );
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return Alert.alert("Erreur", "Utilisateur non authentifié");
      }

      const body = {
        title,
        descreption: description,
        date_creation: dateCours,
        photo_url,
      };

      const response = await instance.post("/cours", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Cours créé :", response.data);

      Alert.alert("Succès", "Cours ajouté avec succès", [
        {
          text: "OK",
          onPress: () => router.replace("/dashboard"),
        },
      ]);

      // Reset form
      setTitle("");
      setDescription("");
      setPhoto_url("");
      setDateCours("");
    } catch (error: any) {
      console.log("Erreur ajout cours :", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Impossible d'ajouter le cours";

      Alert.alert("Erreur", message);
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
      <Text style={styles.title}>Ajouter cours</Text>

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
        placeholder="URL icône (optionnel)"
        value={photo_url}
        onChangeText={setPhoto_url}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddCourse}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ajouter cours</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddCourse}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Modifier cours</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddCourse}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ed5b5b" />
        ) : (
          <Text style={styles.buttonText}>Supprimer cours</Text>
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
        <Text style={styles.buttonText}>La liste des cours</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  picAdmin: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  adminText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#7EC8F5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1fd492",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "#6EC6F3",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
