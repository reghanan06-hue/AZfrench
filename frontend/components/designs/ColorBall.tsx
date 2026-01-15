import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
type MyScreenProps = {
  name?: string | null;
  mycolor?: string;
};
export default function ({ name, mycolor }: MyScreenProps) {
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
              backgroundColor: mycolor,
            },
          ]}
        />
      </View>
      <Text style={styles.textColor}> {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    width: 180,
    height: 180,
    backgroundColor: "#ccc",
    borderRadius: "50%",
    overflow: "hidden",
    position: "absolute",
    bottom: 57,
    alignSelf: "center",
    borderWidth: 1, // ✅ border solid
    borderColor: "#000000",
  },

  fill: {
    flex: 1,
    transformOrigin: "bottom",
  },

  textColor: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
