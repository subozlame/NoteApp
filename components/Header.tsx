import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDarkMode } from "@/contexts/darkmodeContext";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  return (
    <View style={[styles.header, { backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF" }]}>
      {/* Left: Back button */}
      {showBack && (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={isDarkMode ? "#FFF" : "#1F2937"}
          />
        </TouchableOpacity>
      )}

      {/* Center: Title */}
      <Text style={[styles.title, { color: isDarkMode ? "#FFF" : "#1F2937" }]}>
        {title}
      </Text>

      {/* Right: Placeholder for optional icons */}
      <View style={styles.right} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  right: {
    width: 28, // same as icon size to center title
  },
});
