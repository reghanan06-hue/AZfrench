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
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  //code///for//acces//menu//by..login
  const [name,setName]=useState("");
  const [password, setPassword] = useState("");
const handleLogin =async()=>{
  Alert.alert("Erreur","Tous les champs sont obligatoires");
  return;
}
  //code/////design////
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/login.png")}
        style={styles.image}
        resizeMode="contain"
      >
        <TextInput placeholder="Email" style={[styles.input, { top: "52%" }]} />

        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          style={[styles.input, { top: "62%" }]}
        />
      </ImageBackground>

      <TouchableOpacity
        style={[styles.button, { bottom: "15%" }]}
        onPress={() => router.push("/menu")}
      >
        <Text style={styles.buttonText}>se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/account")}>
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
