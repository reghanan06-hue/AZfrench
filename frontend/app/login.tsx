import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { instance } from "../service/instance";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      setLoading(true);

      // Appel API login
      const response = await instance.post("/auth/signin", {
        nameUser: name,
        password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        return Alert.alert("Erreur", "Token ou utilisateur invalide");
      }

      // Stockage dans AsyncStorage
      // Stockage token, role et userId
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("role", user.role);
      await AsyncStorage.setItem("userId", String(user.id)); // <-- conversion number -> string

      // Alert succès et navigation après clic sur OK
      Alert.alert("Succès", "Connexion réussie !", [
        {
          text: "OK",
          onPress: () => {
            if (user.role === "admin") router.replace("/AddCourseScreen");
            else router.replace("/menu");
          },
        },
      ]);

      // Reset champs
      setName("");
      setPassword("");
    } catch (error: unknown) {
      let message = "Une erreur inconnue est survenue";
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        message = axiosError.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      Alert.alert("Erreur", message);
      console.log("Erreur login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/login.png")}
        style={styles.image}
        resizeMode="contain"
      >
        <TextInput
          placeholder="Nom d'utilisateur"
          style={[styles.input, { top: "52%" }]}
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          style={[styles.input, { top: "62%" }]}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </ImageBackground>

      <TouchableOpacity
        style={[styles.button, { bottom: "15%" }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Se connecter</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/account")}>
        <Text style={[styles.linkText, { top: "5%" }]}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff" },
  image: { width: "100%", height: height * 0.7 },
  input: {
    position: "absolute",
    alignSelf: "center",
    width: "66%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  button: {
    width: "80%",
    backgroundColor: "#76C9F0",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "600" },
  linkText: { color: "#3B4CCA", fontStyle: "italic" },
});
