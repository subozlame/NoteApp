import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useHeaderStyles } from "@/hooks/useHeaderStyles";

interface FooterProps {
  screenName: string;
  onAddNote?: () => void;
  onAddFolder?: () => void; // function to trigger folder creation
}

export default function Footer({ screenName, onAddNote, onAddFolder }: FooterProps) {
  const router = useRouter();
  const styles = useHeaderStyles(false); // dark mode logic inside hook

  return (
    <View style={styles.footer}>
      {/* Left: Add Note */}
      {onAddNote ? (
        <TouchableOpacity onPress={onAddNote} style={styles.footerButton}>
          <Ionicons name="add-circle-outline" size={32} color="#2563EB" />
        </TouchableOpacity>
      ) : <View style={styles.footerSpacer} />}

      {/* Center: Add Folder */}
      {onAddFolder && (
        <TouchableOpacity onPress={onAddFolder} style={styles.footerButton}>
          <Ionicons name="folder-outline" size={32} color="#10B981" />
        </TouchableOpacity>
      )}

      {/* Right: Settings */}
      <TouchableOpacity onPress={() => router.push("/screens/SettingsScreen")} style={styles.footerButton}>
        <Ionicons name="settings-outline" size={32} color="#2563EB" />
      </TouchableOpacity>
    </View>
  );
}
