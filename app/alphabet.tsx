import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeStore } from '../_store/useThemeStore';

export default function alphabet() {
  const colors = useThemeStore(state => state.colors);
  const colorBttn = useThemeStore(state => state.colorBttn);
  
  const selectedColorIndex = useThemeStore(state => state.selectedColorIndex);
  const selectedBtnColorIndex = useThemeStore(state => state.selectedBtnColorIndex);  
  
  const setSelectedColorIndex = useThemeStore(state => state.setSelectedColorIndex);
  const setSelectedBtnColorIndex = useThemeStore(state => state.setSelectedBtnColorIndex);
  
  
  const router = useRouter();
  const [loading,SetLoading]=useState();
  const { height } = Dimensions.get("window"); // height dyal screen

  const slideAnim = useRef(new Animated.Value(-height / 2)).current; //   began from top 
  const fadeAnim = useRef(new Animated.Value(0)).current; // en depart image cacher

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
  }, [loading]);

  return (
          <View style={[styles.container, { backgroundColor: colors[selectedColorIndex] }]}>
      
      <Text style={styles.nameScree}> Alphabet</Text>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TouchableOpacity >
       <Text style={styles.textAlph}> A</Text>
        </TouchableOpacity>
        <View style={styles.barBtnTools}>

            <TouchableOpacity style={styles.btnSon}>
                         <Image source={require('../assets/images/e-learning.png')}
                          style={styles.iconbutton} />
                     
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSon}>
                         <Image source={require('../assets/images/e-learning.png')}
                          style={styles.iconbutton} />
                     
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSon}>
                         <Image source={require('../assets/images/e-learning.png')}
                          style={styles.iconbutton} />
                     
      </TouchableOpacity>
         </View>

      </Animated.View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: "#f983f9ff",
    justifyContent: "center",
    alignItems: "center",
  },
  nameScree:{

fontSize:20,
fontWeight:"bold"  },
 
  textAlph:{
fontSize:240,
fontWeight:"bold",
color:"black",
    //alignSelf:"center",

  },
   iconbutton: {
    width: 50,
    height: 50,
  },
  barBtnTools:{
    flexDirection:"row",
    alignSelf:"center",
 
  },
  btnSon:{
     margin:19,
    justifyContent:"space-between"
  }
});
