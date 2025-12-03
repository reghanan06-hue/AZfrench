import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function login() {
  const [showPassword, setShowPassword] = useState(false);
 const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titleLogin} > Log in </Text>
        <TextInput
        style={styles.input}
        placeholder="Username"
      />
       <ImageBackground 
      source={require('../assets/images/login.png')} 
      //../assets/images/0.png"
      style={styles.backgroundImage}
      resizeMode="cover" // Adjust resizeMode as needed (cover, contain, stretch, repeat, center)
    ></ImageBackground>
    
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={22}
          color="#4b41dfff"
        />
              <Text style={styles.titleLogin} > </Text>

      </TouchableOpacity >
      
             <TouchableOpacity  style={styles.bttnLogin}
              onPress={() => router.push("/menu")} >


              <Text style={styles.textBtn}> log in</Text>
             </TouchableOpacity>
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
 
    marginVertical: 100,
    backgroundColor:"white",

  },
    backgroundImage: {
    flex: 1, // Ensures the image background takes up the full available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLogin:{
  fontSize:40,
  fontWeight:"black",
  alignSelf:"center",
  marginVertical:20

  },
  input: {
    
    borderWidth: 4,
    borderColor: "#5c81efff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40, 
    marginBottom:20,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: "65%",
  },
  
  bttnLogin:{
    backgroundColor:"#0a8fd2ff",
    width:"90%",
    height:50,
    alignSelf:"center",
    borderRadius:15,
  },
  textBtn :{
    color:"white",
    fontSize:20,
    fontWeight:"bold",
        alignSelf:"center",
        marginVertical:10

  }

});
// import React from 'react';
// import { ImageBackground, StyleSheet } from 'react-native';

// const MyScreen = () => {
//   return (
//     <ImageBackground 
//      source={require('../assets/images/login.png')} 
//       style={styles.backgroundImage}
//       //="s" // Adjust resizeMode as needed (cover, contain, stretch, repeat, center)
//     >
//       {/* <View style={styles.overlayContent}>
//         <Text style={styles.title}>Welcome to My App</Text>
//         <Text style={styles.subtitle}>This is some content on top of the background image.</Text>
//       </View> */}
//     </ImageBackground>
//   );
// };



// const styles = StyleSheet.create({
//   backgroundImage: {
//    position: "relative",
//     width: "100%",
//     height:500,
//     marginTop:20,
//   },


// });

// export default MyScreen;

// import React from 'react';
// import { ImageBackground, StyleSheet, TextInput, View } from 'react-native';

// const image = { uri: 'https://reactnative.dev/img/tiny_logo.png' }; // Replace with your image source

// const App = () => (
//   <View style={styles.container}>
//     <ImageBackground source={image} resizeMode="cover" style={styles.image}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter text here..."
//         placeholderTextColor="#ccc"
//       />
//     </ImageBackground>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center', // Centers the content vertically
//     alignItems: 'center', // Centers the content horizontally
//   },
//   input: {
//     height: 40,
//     width: '80%', // Adjust width as needed
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for readability
//     color: '#333',
//   },
// });

// export default App;