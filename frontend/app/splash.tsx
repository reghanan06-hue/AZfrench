import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();
  const [loading,SetLoading]=useState();
  const [colors,setColors]=useState("blue");
  const { height } = Dimensions.get("window"); // height dyal screen

  const slideAnim = useRef(new Animated.Value(-height / 2)).current; //   began from top 
  const fadeAnim = useRef(new Animated.Value(0)).current; // en depart image cacher
 const slideAnimText = useRef(new Animated.Value(height / 2)).current; //   began from right 
  const fadeAnimText = useRef(new Animated.Value(0)).current; // en depart text
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,       // final = center
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,       // fade in
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // animation name of App
   useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnimText, {
        toValue: 0,       // final = center
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimText, {
        toValue: 1,       // fade in
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [loading]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Image
            source={require("../assets/images/AZicon.jpg")}
            style={styles.imagelogo}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        }}
      >
        <Text style={[styles.NameApp,{color:colors}]}>AZ french </Text>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff3f5ff",
    justifyContent: "center",
    alignItems: "center",
  },
  imagelogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#3930d6ff",
  },
  NameApp:{
    fontSize:28,
    fontWeight:"bold",
  }
});
