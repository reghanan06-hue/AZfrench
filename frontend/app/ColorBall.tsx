import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

type Props = {
  color: string | null;
  name: string;
};

export default function ColorBall({ color, name }: Props) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!color) return;

    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [color]);

  if (!color) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ball,
          {
            backgroundColor: color,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },

  ball: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
