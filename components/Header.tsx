import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useHeaderStyles } from "@/hooks/useHeaderStyles";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
  const router = useRouter();
  const styles = useHeaderStyles(false);

  return (
    <View style={[styles.header, { borderBottomLeftRadius: 12, borderBottomRightRadius: 12, height: 70 }]}>
      {/* Left: Back button */}
      {showBack && (
        <TouchableOpacity onPress={() => router.back()} style={styles.left}>
          <Ionicons name="arrow-back-outline" size={28} color={styles.title.color} />
        </TouchableOpacity>
      )}

      {/* Center: Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right: Placeholder */}
      <View style={styles.right} />
    </View>
  );
}
