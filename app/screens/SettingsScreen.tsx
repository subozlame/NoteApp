// app/screens/SettingsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { usePageStyles } from "@/hooks/pageStyles";
import { useDarkMode } from "@/contexts/darkmodeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const styles = usePageStyles();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Load persisted settings
  useEffect(() => {
    const loadSettings = async () => {
      const notif = await AsyncStorage.getItem("notificationsEnabled");
      const autoSave = await AsyncStorage.getItem("autoSaveEnabled");
      if (notif !== null) setNotificationsEnabled(JSON.parse(notif));
      if (autoSave !== null) setAutoSaveEnabled(JSON.parse(autoSave));
    };
    loadSettings();
  }, []);

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(newValue));
  };

  const toggleAutoSave = async () => {
    const newValue = !autoSaveEnabled;
    setAutoSaveEnabled(newValue);
    await AsyncStorage.setItem("autoSaveEnabled", JSON.stringify(newValue));
  };

  const clearAllNotes = async () => {
    await AsyncStorage.removeItem("notes");
    alert("All notes cleared!");
  };

  const handleBackup = () => alert("Backup feature coming soon!");
  const handleRestore = () => alert("Restore feature coming soon!");

  return (
    <SafeAreaView style={styles.page}>
      <Header title="Settings" showBack />
      <ScrollView contentContainerStyle={settingStyles.container}>
        {/* Appearance */}
        <Text style={styles.title}>Appearance</Text>
        <View style={settingStyles.row}>
          <Text style={[settingStyles.label, { color: isDarkMode ? "#FFF" : "#1F2937" }]}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
            thumbColor="#FFF"
          />
        </View>

        {/* Notifications */}
        <Text style={styles.title}>Notifications</Text>
        <View style={settingStyles.row}>
          <Text style={[settingStyles.label, { color: isDarkMode ? "#FFF" : "#1F2937" }]}>
            Enable Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
            thumbColor="#FFF"
          />
        </View>

        {/* Auto-Save */}
        <Text style={styles.title}>Notes</Text>
        <View style={settingStyles.row}>
          <Text style={[settingStyles.label, { color: isDarkMode ? "#FFF" : "#1F2937" }]}>
            Auto-Save Notes
          </Text>
          <Switch
            value={autoSaveEnabled}
            onValueChange={toggleAutoSave}
            trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
            thumbColor="#FFF"
          />
        </View>

        <TouchableOpacity style={settingStyles.button} onPress={clearAllNotes}>
          <Text style={settingStyles.buttonText}>Clear All Notes</Text>
        </TouchableOpacity>

        {/* Backup / Restore */}
        <Text style={styles.title}>Backup</Text>
        <View style={settingStyles.row}>
          <TouchableOpacity style={settingStyles.smallButton} onPress={handleBackup}>
            <Text style={settingStyles.buttonText}>Backup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingStyles.smallButton} onPress={handleRestore}>
            <Text style={settingStyles.buttonText}>Restore</Text>
          </TouchableOpacity>
        </View>

        {/* About / Legal */}
        <Text style={styles.title}>About</Text>
        <Text style={[settingStyles.infoText, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }]}>
          NotesApp v1.0.0
        </Text>
        <Text style={[settingStyles.infoText, { color: isDarkMode ? "#9CA3AF" : "#6B7280" }]}>
          © 2025 LumaTech Inc. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const settingStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  smallButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 12,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    marginVertical: 2,
  },
});
