import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RegisterScreen() {


  
  //ccodesource for design
  const [gender, setGender] = useState("fille");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Gender selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderCard, gender === "fille" && styles.activeCard]}
          onPress={() => setGender("fille")}
        >
          <Image
            source={require("../assets/images/girl.png")}
            style={styles.avatar}
          />
          <View style={styles.radioRow}>
            <View style={styles.radioOuter}>
              {gender === "fille" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Fille</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderCard, gender === "garçon" && styles.activeCard]}
          onPress={() => setGender("garçon")}
        >
          <Image
            source={require("../assets/images/boy.png")}
            style={styles.avatar}
          />
          <View style={styles.radioRow}>
            <View style={styles.radioOuter}>
              {gender === "garçon" && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.genderText}>Garçon</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <TextInput placeholder="nom d'utilisateur" style={styles.input} />

      <TextInput
        placeholder="email"
        keyboardType="email-address"
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="mot de passe"
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={22}
            color="#2b35f2ff"
          />
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Créer compte</Text>
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
    // justifyContent: "center",
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
    backgroundColor: "#ffffffff",
  },

  avatar: {
    width: 170,
    height: 150,
    marginBottom: 10,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4da6ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4da6ff",
  },

  genderText: {
    fontSize: 14,
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
