import { useRoute } from "@react-navigation/native";
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
} from "react-native";

const { height } = Dimensions.get("window");
import { instance } from "../service/instance";
import axios, { AxiosError } from "axios";
// const API_URL = "http://192.168.11.106:5000";

export default function LoginScreen() {
  const router = useRouter();
  //code///for//acces//menu//by..log
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      const response = await instance.post("/auth/signin", {
        nameUser: name,
        password,
      });

      const data = response.data;
      Alert.alert("Succès", "Connexion réussie !");
      setName("");
      setPassword("");
      router.push("./menu");
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
        // Autres erreurs JS
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur", "Une erreur inconnue est survenue");
      }
      console.log("Erreur Axios:", error);
    }
  };

  //code/////design////
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/login.png")}
        style={styles.image}
        resizeMode="contain"
      >
        <TextInput
          placeholder="Nom d'utilisation"
          style={[styles.input, { top: "52%" }]}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          style={[styles.input, { top: "62%" }]}
          value={password}
          onChangeText={setPassword}
        />
      </ImageBackground>

      <TouchableOpacity
        style={[styles.button, { bottom: "15%" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("./account")}>
        <Text style={[styles.linkText, { top: "5%" }]}>créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: height * 0.7,
  },

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

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },

  linkText: {
    marginTop: 10,
    color: "#3B4CCA",
    fontStyle: "italic",
  },
});
