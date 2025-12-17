// components/Footer.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDarkMode } from "@/contexts/darkmodeContext";

interface FooterProps {
  screenName: string;
  onAddNote?: () => void; // <-- made optional
}

export default function Footer({ screenName, onAddNote }: FooterProps) {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  return (
    <View
      style={[
        styles.footer,
        { backgroundColor: isDarkMode ? "#1F2937" : "#F9FAFB", borderTopColor: isDarkMode ? "#374151" : "#E5E7EB" },
      ]}
    >
      {/* Left: Add Note button */}
      {onAddNote && (
        <TouchableOpacity onPress={onAddNote}>
          <Ionicons name="add-circle-outline" size={28} color="#2563EB" />
        </TouchableOpacity>
      )}

      {/* Center: Current screen/file name */}
      <Text style={[styles.screenName, { color: isDarkMode ? "#FFF" : "#1F2937" }]}>
        {screenName}
      </Text>

      {/* Right: Settings icon */}
      <TouchableOpacity onPress={() => router.push("/screens/SettingsScreen")}>
        <Ionicons name="settings-outline" size={28} color="#2563EB" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
  },
  screenName: {
    fontSize: 16,
    fontWeight: "500",
  },
});
