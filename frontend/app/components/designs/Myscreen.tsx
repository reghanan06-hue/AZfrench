import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";

export default function Loader() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [progress]);

  // Interpolation pour simuler l'expansion du loader
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <Animated.View
          style={[
            styles.fill,
            {
              transform: [{ scaleY: scale }],
            },
          ]}
        />
      </View>
      <Text style={styles.textColor}> Rouge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loader: {
    width: 60,
    aspectRatio: 1,
    backgroundColor: "#ccc",
    overflow: "hidden",
    borderRadius: 60, // Cercle
  },
  fill: {
    flex: 1,
    backgroundColor: "#dc1818",
    transformOrigin: "bottom",
  },
  textColor: {
    color: "red",
    fontSize: 20,
    fontFamily: "bold",
  },
});
