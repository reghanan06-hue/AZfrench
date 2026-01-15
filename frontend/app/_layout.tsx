import { Stack } from "expo-router";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function _layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
        <Stack.Screen name="account" />
        <Stack.Screen name="menu" />
        {/* 
        <Stack.Screen
          name="[id]"
          options={{
            title: "Lesson Details",
            headerShown: false,
          }}
        /> */}
        <Stack.Screen name="numbers" />
      </Stack>
    </QueryClientProvider>
  );
}
