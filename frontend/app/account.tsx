
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { instance } from "../service/instance";
import axios, { AxiosError } from "axios";
export default function AccountScreen() {
  const [gender, setGender] = useState<"fille" | "garçon">("fille");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return;
    }
    setLoading(true);

    try {
      const response = await instance.post("/auth/signup", {
        nameUser: username,
        email,
        password,
        Genre: gender,
        role: "user",
      });

      const data = response.data;

      Alert.alert("Succès", "Connexion réussie !");
      setUsername("");
      setPassword("");
      router.push("./login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response) {
          Alert.alert(
            "Erreur",
            axiosError.response.data?.message || "Erreur serveur"
          );
        } else if (axiosError.request) {
          Alert.alert(
            "Erreur",
            "Impossible de contacter le serveur. Vérifiez votre connexion."
          );
        } else {
          Alert.alert("Erreur", axiosError.message);
        }
      } else if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur", "Une erreur inconnue est survenue");
      }
      console.log("Erreur Axios:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderCard, gender === "fille" && styles.activeCard]}
          onPress={() => setGender("fille")}
        >
          <Image
            source={require("../assets/images/girl.png")}
            style={styles.avatar}
          />
          <Text>Fille</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderCard, gender === "garçon" && styles.activeCard]}
          onPress={() => setGender("garçon")}
        >
          <Image
            source={require("../assets/images/boy.png")}
            style={styles.avatar}
          />
          <Text>Garçon</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Nom d'utilisateur"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Mot de passe"
          style={styles.passwordInput}
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={22}
            color="#4da6ff"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        // disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Création..." : "Créer compte"}
          {/* CREER COMPTE */}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 50,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  genderCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#1a1919",
    borderRadius: 12,
    alignItems: "center",
    padding: 30,
  },
  activeCard: {
    borderColor: "#4da6ff",
    backgroundColor: "#ffffff",
  },
  avatar: {
    width: 100,
    height: 200,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cce4ff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cce4ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#4da6ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
