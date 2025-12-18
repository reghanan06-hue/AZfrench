import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function account() {
  return (
    <View>
     <Text style={styles.titleLogin} > Create an account</Text>
            <TextInput
            style={styles.input}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
          />
          <TouchableOpacity
          ></TouchableOpacity>
          </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
 
    marginVertical: 100,
    backgroundColor:"white",

  },
  titleLogin:{
  fontSize:40,
  fontWeight:"black",
  alignSelf:"center",
  marginVertical:20,

  },
  input: {
    
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40, 
    marginBottom:20,
  },

})
