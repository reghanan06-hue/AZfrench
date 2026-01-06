
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRegister } from "@/service/auth/mutations";

export default function AccountScreen() {
  const [gender, setGender] = useState<"fille" | "garçon">("fille");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutate,isLoading, isError, error, isSuccess } = useRegister();
    // const { data, isLoading, isError, error } = useRegister();
  

  const handleSubmit = () => {
    if (!username || !email || !password) {
      alert("Tous les champs sont obligatoires");
      return;
    }

    mutate(
      { nameUser: username, email, password, Genre: gender },
      {
        onSuccess: () => router.push("/menu"),
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Gender selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderCard, gender === "fille" && styles.activeCard]}
          onPress={() => setGender("fille")}
        >
          <Image source={require("../assets/images/girl.png")} style={styles.avatar} />
          <Text>Fille</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderCard, gender === "garçon" && styles.activeCard]}
          onPress={() => setGender("garçon")}
        >
          <Image source={require("../assets/images/boy.png")} style={styles.avatar} />
          <Text>Garçon</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
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
          <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={22} color="#2b35f2ff" />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? "Création..." : "Créer compte"}</Text>
      </TouchableOpacity>

      {/* Feedback */}
      {isError && <Text style={{ color: "red", marginTop: 10 }}>{error?.message}</Text>}
      {isSuccess && <Text style={{ color: "green", marginTop: 10 }}>Compte créé avec succès 🎉</Text>}
    </View>
  );
}

// Styles
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
    borderColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    padding: 15,
  },
  activeCard: {
    borderColor: "#4da6ff",
    backgroundColor: "#f0f8ff",
  },
  avatar: {
    width: 100,
    height: 100,
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
