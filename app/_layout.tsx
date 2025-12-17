// app/_layout.tsx
import React from "react";
import { DarkModeProvider } from "@/contexts/darkmodeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DarkModeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </DarkModeProvider>
  );
}
