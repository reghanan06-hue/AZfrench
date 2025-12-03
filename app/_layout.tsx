import { Stack } from 'expo-router';
import React from 'react';
export default function _layout() {
  return (
<Stack screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="splash" />
    <Stack.Screen name="login"/>
    <Stack.Screen name="account"/>
    <Stack.Screen name="menu" />
    <Stack.Screen name="alphabet" />
   <Stack.Screen name="numbers"/>
    <Stack.Screen name="myscreen"/>
    <Stack.Screen name="screen_ia"/>

    </Stack>    
  )
}
